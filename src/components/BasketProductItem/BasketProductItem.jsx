import React from 'react'
import { useDispatch } from 'react-redux';
import { reduceProduct, incrementProduct } from '../../Redux/slices/productSlice';
import {RiDeleteBin2Line} from 'react-icons/ri'
import './BasketProductItem.css'

// Компонент карточки товара в корзине
// Является дочерним для <Basketpage/>
export default function BasketProductItem({item}) {
  
    const dispatch = useDispatch();

  return (
    <tr className='basketProductItem__tr'>
        <td className='basketProductItem__image'><img src={item.image} alt="" /></td>
        <td className='basketProductItem__title'><span>{item.title} </span></td>
        <td ><span>{item.fasovka.slice(2)} </span></td>
        <td className='basketProductItem__count'>
          <span>{item.count} шт.</span>
          <button className='basketProductItem__count-btn-right' onClick={() => dispatch(reduceProduct(item))}>-</button>
          <button className='basketProductItem__count-btn-right' onClick={() => dispatch(incrementProduct(item))}>+</button>
        </td>
        <td><span>{+item.price} ₽</span></td>
        <td className='basketProductItem__total'><span>{+item.price * item.count} ₽</span></td>
        <td className='basketProductItem__RiDeleteBin2Line'><RiDeleteBin2Line /></td>
    </tr>
  )
}
