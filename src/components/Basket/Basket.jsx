import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SlBasket } from 'react-icons/sl'
import './Basket.css'
import BasketHoverProduct from '../BasketHoverProduct/BasketHoverProduct';
import Progressbar from '../Progressbar/Progressbar';


// Компонент отображения корзины в шапке сайта (Header)
export default function Basket() {

  const totalAmount = useSelector((state) => state.cart.total);
  const [show, setShow] = useState(false);
  const productsInOrder = useSelector((state) => state.cart.cart);
  const totalCount = useSelector((state) => state.cart.totalCount);
  const location = useLocation()

  return (
    <div className='basket__wrapper'>
      <Link to='cart' className='basket' onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}>
        <div className='SlBasket__wrapper'>
          <SlBasket className='SlBasket' />
          <span className='basket__count'>{totalCount}</span>
        </div>
        <div className='basket__money'>
          <p className='basket__basket-word'>Корзина</p>
          <p className='basket__total'>
            {totalAmount} ₽
          </p>
        </div>
      </Link>
      {(show && productsInOrder.length && location.pathname !== '/cart') ?
        <div className='basket__info' onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}>
          <table className='basket__info_products'>
            <tbody>
              {productsInOrder.map(item => (
                <BasketHoverProduct key={`${item.id}-${item.fasovka}`} item={item} />
              ))}
            </tbody>
          </table>
          {totalAmount < 1500 &&
            <>
              <div className='basket__minimum-text'>Еще {1500 - totalAmount} ₽ до суммы минимального заказа </div>
              <Progressbar />
            </>}
          <Link to='cart' className='basket__info_button' onClick={() => setShow(false)}>Перейти в корзину</Link>
        </div>
        : ''}
    </div>
  )
}

