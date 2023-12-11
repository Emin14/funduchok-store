import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { RiDeleteBin2Line } from 'react-icons/ri'
import { changeCartProducts, incrementProduct, deletion, calcAmount, calcPoints, calcPieces } from '../../Redux/slices/cartSlice';
import './BasketHoverProduct.css'

// Компонент выводит товары добавленные в корзину при наведении на корзину 
export default function BasketHoverProduct({ item }) {

  const [show, setShow] = useState(false)
  const dispatch = useDispatch();

  const decrement = () => {
    dispatch(changeCartProducts({...item, count: -1}));
    dispatch(calcAmount());
    dispatch(calcPoints())
    dispatch(calcPieces())

  }

  const increment = () => {
    dispatch(changeCartProducts({...item, count: 1}));
    dispatch(calcAmount());
    dispatch(calcPoints());
    dispatch(calcPieces())
  }

  const deleteProduct = () => {
    dispatch(deletion(item));
    dispatch(calcAmount());
    dispatch(calcPoints());
    dispatch(calcPieces())
  }

  return (
    <tr className='basketHoverProduct__tr' onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}>
      <td className='basketHoverProduct__image'><img src={item.image} alt="" /></td>
      <td className='basketHoverProduct__title'>
        <span>{item.title}</span>
      </td>
      <td className='basketHoverProduct__fasovka'><span>{item.weightTitle}</span></td>
      <td className='basketHoverProduct__count'>
        <button className='basketHoverProduct__count-btn-right' onClick={decrement}>-</button>
        <span className='basketHoverProduct__counter'>{item.count} шт.</span>
        <button className='basketHoverProduct__count-btn-left' onClick={increment}>+</button>
      </td>
      <td className='basketHoverProduct__total'>
        {item.packingDiscountPrice
          ? <span>{+item.packingDiscountPrice * item.count} ₽</span>
          : <span>{+item.packingPrice * item.count} ₽</span>}
        {show && <span className='basketHoverProduct__RiDeleteBin2Line' onClick={deleteProduct}><RiDeleteBin2Line /></span>}
      </td>
    </tr>
  )
}
