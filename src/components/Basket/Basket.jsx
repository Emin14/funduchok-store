import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {SlBasket} from 'react-icons/sl'
import './Basket.css'
import BasketHoverProduct from '../BasketHoverProduct/BasketHoverProduct';
import Progress from '../Progressbar/Progressbar';



// Компонент отображения корзины в шапке сайта (Header)
// Реализовать цифру с количеством товара 
export default function Basket() {

  const totalAmount  = useSelector((state) => state.cart.total);
  const [showUserinfo, setShowUserinfo] = useState(false);
  const productsInOrder = useSelector((state) => state.cart.cart);
  const location = useLocation()

  // Функция для обработкт события MouseOver
  const handleMouseOver = () => {
    setShowUserinfo(true)
  }

 // Функция для обработкт события MouseOut
  const handleMouseOut = () => {
    setShowUserinfo(false)
  }

  return (
    <div className='basket__wrapper'>
      <Link to='cart' className='basket' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className='SlBasket__wrapper'>
          <SlBasket  className='SlBasket'/>
        </div>
        <div className='basket__money'>
          <p className='basket__basket-word'>Корзина</p>
          <p className='basket__total'>
            {totalAmount} ₽
          </p>
        </div>
      </Link>
      {(showUserinfo && productsInOrder.length && location.pathname !== '/cart') ?
        <div className='basket__info' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <table className='basket__info_products'>
            <tbody>
              {productsInOrder.map(item => (
              <BasketHoverProduct key={`${item.id}-${item.fasovka}`} item={item}/>
              ))}
            </tbody>
          </table>
          {totalAmount < 1500 &&
          <>
          <div className='basket__minimum-text'>Еще {1500-totalAmount} ₽ до суммы минимального заказа </div>
          <Progress/>
          </>}
          <Link to='cart' className='basket__info_button' onClick={() => setShowUserinfo(false)}>Перейти в корзину</Link>
        </div>
        : ''}
    </div>
  )
}

