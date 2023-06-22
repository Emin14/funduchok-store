import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { reduceProduct, incrementProduct, deleteProduct } from '../../Redux/slices/cartSlice';
import { RiDeleteBin2Line } from 'react-icons/ri'
import './BasketHoverProduct.css'

// Является дочерним для <Basket/>
// Компонент выводит товары добавленные в корзину при наведении на корзину 
export default function BasketHoverProduct({ item }) {

  const [show, setShow] = useState(false)
  const dispatch = useDispatch();

  return (
    <tr className='basketHoverProduct__tr' onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}>
      <td className='basketHoverProduct__image'><img src={item.image} alt="" /></td>
      <td className='basketHoverProduct__title'>
        <span>{item.title}</span>
      </td>
      <td className='basketHoverProduct__fasovka'><span>{item.fasovka === 0.025 ? 'пробник' : `${item.fasovka * 1000} гр`}</span></td>
      <td className='basketHoverProduct__count'>
        <button className='basketHoverProduct__count-btn-right' onClick={() => dispatch(reduceProduct(item))}>-</button>
        <span className='basketHoverProduct__counter'>{item.count} шт.</span>
        <button className='basketHoverProduct__count-btn-left' onClick={() => dispatch(incrementProduct(item))}>+</button>
      </td>
      <td className='basketHoverProduct__total'>
      {item.salePrice
       ? <span>{+item.salePrice * item.count} ₽</span>
       :  <span>{+item.basePrice * item.count} ₽</span>}
        {show && <span className='basketHoverProduct__RiDeleteBin2Line' onClick={() => dispatch(deleteProduct(item))}><RiDeleteBin2Line /></span> }
      </td>
    </tr>
  )
}
