import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TotalAmount from '../../components/TotalAmount/TotalAmount';
import BasketProductItem from '../../components/BasketProductItem/BasketProductItem';
import './Basketpage.css'
import Checkout from '../../components/Checkout/Checkout';
import { clearCart } from '../../Redux/slices/cartSlice';


// !!!Заметил одну вещь. Если хочешь чтобы не выводился в адресе откуда перешел к линку надо дефис прибавить. Исправить возможно переход по товарам
// Компонент страницы Корзины
// Сделать проверку на окончание

// 26.05.2023 хочу при нажатии оформить чтобы у юзера обновлялся в базе данных список заказов
export default function Basketpage() {
 
  const productsInOrder = useSelector((state) => state.cart.cart);
  const total  = useSelector((state) => state.cart.total);
  const city = useSelector((state) => state.data.city)
  const [nameUser, setNameUser] = useState('')
  const [phoneUser, setPhoneUser] = useState('')
  const currentUser = JSON.parse(localStorage.getItem('user'))

  const dispatch = useDispatch();
  const ada = () => {
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
          {/* Не знаю насколько важно для семантики эти заголовки, вприципе можно и раскоментировать и сделать чтобы на странице не было видно, а в DOM было видно */}
          {/* <tr className='basketpage__tr'>
           <th>Изображение</th>
           <th>Название</th>
           <th>Фасовка</th>
           <th>Количество</th>
           <th>Цена</th>
           <th>Цена</th>
           <th>Сумма</th>
          </tr> */}
          {productsInOrder.map(item => (
          <BasketProductItem key={`${item.id}-${item.fasovka}`} item={item}/>
          ))}
        </tbody>
      </table>
          <TotalAmount/>
          <Checkout nameUser={nameUser} phoneUser={phoneUser}/>
          <div className='basketpage__clear'><span onClick={ada}>Очистить корзину</span></div>
      </div>
          {!currentUser &&
          <div className='basketpage__notLogin'>
            <p>Войдите или зарегистрируйтесь и получите преимущества:</p>
            <ul>
              <li>Накопление баллов</li>
              <li>Индивидуальные акции</li>
            </ul>
            <p>Для оформления заказа без регистрации или входа заполните данные ниже</p>
            <label htmlFor="">
                <input type="text" placeholder='Введите ваше имя' value={nameUser} onChange={(e) => setNameUser(e.target.value)}/>
            </label>
            <label htmlFor="">
                <input type="phone" placeholder='Введите номер телефона' value={phoneUser} onChange={(e) => setPhoneUser(e.target.value)}/>
            </label>
          </div>
          }
      </div>
      :
      <p>Ваша корзина пуста</p>
  )
}
