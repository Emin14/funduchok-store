import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {SlBasket} from 'react-icons/sl'
import './Basket.css'

// Компонент отображения корзины в шапке сайта (Header) 
export default function Basket() {

  const totalAmount  = useSelector((state) => state.product.total);

  return (
    <Link to='korzina' className='basket'>
    <div className='SlBasket__wrapper'>
      <SlBasket  className='SlBasket'/>
    </div>
    <div className='basket__money'>
      <p className='basket__basket-word'>Корзина</p>
      <p className='basket__total'>
        {totalAmount} ₽
      </p>
      <div></div>
      <div></div>
    </div>
  </Link>
  )
}

