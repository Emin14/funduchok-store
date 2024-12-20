import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  doc, updateDoc, arrayUnion, increment,
} from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from "react-router"
import TotalAmount from './TotalAmount/TotalAmount';
import BasketProductItem from '../../components/BasketProductItem/BasketProductItem';
import Checkout from './Checkout/Checkout';
import { clearCart } from '../../Redux/slices/cartSlice';
import styles from './basketpage.module.css';
import db from '../../firebase';

// Компонент страницы Корзины
export default function Basketpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { total, cart, points } = useSelector((state) => state.cart);
  const city = useSelector((state) => state.city.city);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        // User is signed out
        // ...
      }
    });
  }, [currentUser]);

  const placeOrder = async () => {
    // При оформлении заказов добавляются только баллы при сумме заказа от 3000 р.
    let orderPoint = 0;
    if (total > 3000) {
      orderPoint = points;
    }
    // Формируем объект со свойствами заказа
    const newOrder = {
      // id: lastId+1,
      date: new Date(),
      status: 'notProcessed',
      orderAmount: total,
      orderPoint,
      city,
      products: cart,
    };
    const washingtonRef = doc(db, 'users', currentUser.uid);
    await updateDoc(washingtonRef, {
      orders: arrayUnion(newOrder),
    });
    await updateDoc(washingtonRef, {
      points: increment(orderPoint),
    });

    navigate('/completed-order', { state: newOrder });
    dispatch(clearCart());
  };

  return (
    total
      ? (
        <div className={styles.basketpage}>
          <div>
            <h3 className={styles.title}>Корзина</h3>
            <div className={styles.cityWrapper}>
              <span>Ваш город для доставки заказа: </span>
              <span className={styles.city}>{city}</span>
            </div>
            <table>
              <tbody>
                {cart.map((item) => (
                  <BasketProductItem key={`${item.id}-${item.weight}`} item={item} />
                ))}
              </tbody>
            </table>
            <TotalAmount total={total} points={points} />
            <Checkout currentUser={currentUser} orderAmount={total} placeOrder={placeOrder} />
            <div className={styles.clear}>
              <span onClick={() => dispatch(clearCart())} onKeyDown={() => dispatch(clearCart())} role="presentation">Очистить корзину</span>
            </div>
          </div>
        </div>
      )
      : <p>Ваша корзина пуста</p>
  );
}
