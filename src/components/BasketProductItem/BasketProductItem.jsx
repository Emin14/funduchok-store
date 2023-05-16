import React from 'react'
import { useDispatch } from 'react-redux';
import { reduceProduct, incrementProduct } from '../../Redux/slices/productSlice';
import './BasketProductItem.css'

// Компонент карточки товара в корзине
// Является дочерним для <Basketpage/>

// Не смог реализовать логику, чтобы при добавлении в корзину одного и того же товара с одинаковой фасовкой товар в корзине не дублировался
// Сейчас можно добавить:
// Арахис очищенный (жареный, соленый)	1000 гр * 5 шт 
// Арахис очищенный (жареный, соленый)	500 гр * 2 шт 
// Арахис очищенный (жареный, соленый)	1000 гр * 3 шт 
// Видел реализацию на сайте одежды, там просто проверялось есть ли товар с таким же id, но у меня у товаров с разной фасовкой id одинаковое
// пытался добавить проверку по id и по фасовке, но в базе данных товары без фасовки
// Все попытки не увенчались успехом

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
        <td  className='basketProductItem__total'><span>{+item.price * item.count} ₽</span></td>
    </tr>
  )
}
