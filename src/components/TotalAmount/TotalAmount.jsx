import React from 'react'
import { useSelector } from 'react-redux';
import checkWord from './checkWord'
import './TotalAmount.css'

// Компонент выводит общую сумму заказа и общую сумму баллов в корзине 
export default function TotalAmount() {

    const total  = useSelector((state) => state.cart.total);
    const points  = useSelector((state) => state.cart.points);
    const currentUser = JSON.parse(localStorage.getItem('user'))

  return (
    <div className='total-amount'>
        <span className='total-amount_text'>Итого:</span>
        <span className='total-amount_count'>{total} ₽ </span>
        {(total >= 3000 && currentUser)
        ? <p className='total-amount__points'>
            <span>Этот заказ принесет вам {points}</span>
            <span>{checkWord(points)}</span>
          </p>
        :
        (total <= 3000 && currentUser)
        ? <p className='total-amount__points2'>При заказе от 3000 р. получите баллы для следующих покупок</p>
        : ''
        }
    </div>
  )
}
