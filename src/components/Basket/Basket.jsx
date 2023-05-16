import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {SlBasket} from 'react-icons/sl'
import './Basket.css'

// Компонент отображения корзины в шапке сайта (Header)
// Скорее всего должна быть другая функция в redux, так как эта не работает корректно когда меняется количество товара в компоненте <Basketpage/> 
// Является дочерним для <Header/>
export default function Basket() {
    
  const tovar = useSelector((state) => state.product);
  const count = useSelector((state) => state.product.value);

  return (
    <Link to='korzina' className='basket'>
    <div className='SlBasket__wrapper'>
      <SlBasket  className='SlBasket'/>
    </div>
    <div className='basket__money'>
      <p className='basket__basket-word'>Корзина</p>
      <p className='basket__total'>
        {tovar.cart.reduce((accum, item) => {
        return accum + (+item.price * count)
      }, 0)} руб.
      </p>
      <div></div>
      <div></div>
    </div>
  </Link>
  )
}

