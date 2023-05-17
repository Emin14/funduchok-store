import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import BasketProductItem from '../../components/BasketProductItem/BasketProductItem';
import './Basketpage.css'


// Компонент страницы Корзины
export default function Basketpage() {

    const tovar = useSelector((state) => state.product);
    const totalAmount  = useSelector((state) => state.product.total);

  return (
    <div>
      <table className='basketpage'>
        <caption>Корзина</caption>
        <tr className='basketpage__tr'>
         <th>Изображение</th>
         <th>Название</th>
         <th>Фасовка</th>
         <th>Количество</th>
         <th>Цена</th>
         <th>Сумма</th>
        </tr>
        {tovar.cart.map(item => (
        <BasketProductItem item={item}/>
        ))}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td className='basketpage__total'>
          {true ? totalAmount : ''} ₽
          </td> : ''
        </tr>
      </table>
      </div>
  )
}
