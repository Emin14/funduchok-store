import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TotalAmount from '../../components/TotalAmount/TotalAmount';
import BasketProductItem from '../../components/BasketProductItem/BasketProductItem';
import Checkout from '../../components/Checkout/Checkout';
import { clearCart } from '../../Redux/slices/cartSlice';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import './Basketpage.css'


// Компонент страницы Корзины
export default function Basketpage() {
 
  const productsInOrder = useSelector((state) => state.cart.cart);
  const total  = useSelector((state) => state.cart.total);
  const city = useSelector((state) => state.data.city)
  const [nameUser, setNameUser] = useState('')
  const [phoneUser, setPhoneUser] = useState()
  const currentUser = JSON.parse(localStorage.getItem('user'))

  const dispatch = useDispatch();

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
          <div className='basketpage__clear'><span onClick={() => dispatch(clearCart())}>Очистить корзину</span></div>
      </div>
          {!currentUser &&
          <div className='basketpage__notLogin'>
            <p>Войдите или зарегистрируйтесь и получите преимущества:</p>
            <ul>
              <li>Накопление баллов</li>
              <li>Индивидуальные акции</li>
            </ul>
            <p>Для оформления заказа без регистрации или входа заполните данные ниже</p>
            <label htmlFor="" className='basketpage__label'>
                <input className='basketpage__input' type="text" placeholder='Введите ваше имя'  value={nameUser} onChange={(e) => setNameUser(e.target.value)}/>
            </label>
            <label htmlFor="" >
            <PhoneInput placeholder="Введите номер телефона" international displayInitialValueAsLocalNumber defaultCountry="RU" value={phoneUser} onChange={setPhoneUser} />
            </label>
          </div>
          }
      </div>
      :
      <p>Ваша корзина пуста</p>
  )
}
