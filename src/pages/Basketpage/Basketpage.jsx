import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TotalAmount from './TotalAmount/TotalAmount';
import BasketProductItem from '../../components/BasketProductItem/BasketProductItem';
import Checkout from './Checkout/Checkout';
import { clearCart } from '../../Redux/slices/cartSlice';
import './Basketpage.css'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, arrayUnion, increment  } from "firebase/firestore";
import { db } from '../../firebase';


// Компонент страницы Корзины
export default function Basketpage() {
 
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {total, cart, points} = useSelector((state) => state.cart);
  const city = useSelector((state) => state.city.city)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        
      } else {
        // User is signed out
        // ...
      }
    });
  }, [currentUser])

  const placeOrder = async() => {
    // При оформлении заказов добавляются только баллы при сумме заказа от 3000 р.
    let orderPoint = 0
    if(total > 3000) {
      orderPoint = points
    }
    // Формируем объект со свойствами заказа
    const newOrder = {
      // id: lastId+1,
      datе: new Date(),
      status: "notProcessed",
      orderAmount: total,
      orderPoint,
      city,
      products: cart
    }
    const washingtonRef = doc(db, "users", currentUser.uid);
      await updateDoc(washingtonRef, {
        orders: arrayUnion(newOrder),
      }) 
      await updateDoc(washingtonRef, {
        points: increment(orderPoint)
    });

    navigate("/completed-order", {state: newOrder})
    dispatch(clearCart())
  }


  return (
    total
    ?
    <div className='basketpage'>
      <div>
        <h3 className='basketpage__title'>Корзина</h3>
        <span>Ваш город для доставки заказа: </span><span className='basketpage__city'>{city}</span>
        <table >
          <tbody>
            {cart.map(item => (
            <BasketProductItem key={`${item.id}-${item.weight}`} item={item}/>
            ))}
          </tbody>
        </table>
            <TotalAmount total={total} points={points}/>
            <Checkout currentUser={currentUser} orderAmount={total} placeOrder={placeOrder}/>
            <div className='basketpage__clear'><span onClick={() => dispatch(clearCart())}>Очистить корзину</span></div>
      </div>
          {!currentUser &&
          <div className='basketpage__notLogin'>
            <p>Войдите или зарегистрируйтесь и получите преимущества:</p>
            <ul>
              <li>Накопление баллов</li>
              <li>Индивидуальные акции</li>
            </ul>
          </div>
          }
      </div>
      :
      <p>Ваша корзина пуста</p>
  )
}
