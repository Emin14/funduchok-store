import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RiDeleteBin2Line } from 'react-icons/ri'
import { changeCartProducts, incrementProduct, deletion, calcAmount, calcPoints, calcPieces } from '../../Redux/slices/cartSlice';
import './BasketProductItem.css'
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from '../../firebase';


// Компонент карточки товара в корзине
export default function BasketProductItem({ item }) {

  const [show, setShow] = useState(false)
  const dispatch = useDispatch();

  const decrement = () => {
    dispatch(changeCartProducts({...item, count: -1}))
    dispatch(calcAmount())
    dispatch(calcPoints())
    dispatch(calcPieces())
  }

  const increment = () => {
    dispatch(changeCartProducts({...item, count: 1}))
    dispatch(calcAmount())
    dispatch(calcPoints())
    dispatch(calcPieces())
  }

  const deleteProduct = () => {
    dispatch(deletion(item))
    dispatch(calcAmount())
    dispatch(calcPoints())
    dispatch(calcPieces())
  }


  return (
    <tr className='basketProductItem__tr' onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}>
      <td className='basketProductItem__image'><img src={item.image} alt="" /></td>
      <td className='basketProductItem__title'>
        <Link to={`/${item.category}/${item.id}`}>{item.title}</Link>
      </td>
      <td className='basketProductItem__fasovka'><span>{item.weightTitle}</span></td>
      <td className='basketProductItem__count'>
        <button className='basketProductItem__count-btn-right' onClick={decrement}>-</button>
        <span className='basketProductItem__counter'>{item.count} шт.</span>
        <button className='basketProductItem__count-btn-left' onClick={increment}>+</button>
      </td>
      <td className='basketProductItem__baseprice'>
        <span className='basketProductItem__baseprice_count'>{item.packingPrice} ₽</span>
        {item.percentDiscount &&
          <span className='basketProductItem__baseprice_discountPercentage'>{`-${item.percentDiscount * 100} %`}</span>}
      </td>
      <td>
        {item.packingDiscountPrice
          ? <span>{item.packingDiscountPrice} ₽</span>
          : <span>{item.packingPrice} ₽</span>}
      </td>
      <td className='basketProductItem__total'>
        {item.packingDiscountPrice
          ? <span>{+item.packingDiscountPrice * item.count} ₽</span>
          : <span>{+item.packingPrice * item.count} ₽</span>}
        {show && <span className='basketProductItem__RiDeleteBin2Line' onClick={deleteProduct}><RiDeleteBin2Line /></span>}
      </td>
    </tr>
  )
}
