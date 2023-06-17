import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { reduceProduct, incrementProduct, deleteProduct } from '../../Redux/slices/cartSlice';
import { RiDeleteBin2Line } from 'react-icons/ri'
import './BasketProductItem.css'
import { Link } from 'react-router-dom';
import products from '../../db.json'

// Компонент карточки товара в корзине
// Является дочерним для <Basketpage/>
export default function BasketProductItem({ item }) {

  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(true)
  }

  const handleNoShow = () => {
    setShow(false)
  }


  //Не слишком ли часто повторяется эта функция  
  const category = products.category.find((el => el.id === item.category))

  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(deleteProduct(item))
  }


  return (
    <tr className='basketProductItem__tr' onMouseOver={handleShow} onMouseOut={handleNoShow}>
      <td className='basketProductItem__image'><img src={item.image} alt="" /></td>
      <td className='basketProductItem__title'>
        <Link to={`/${category.pathname}/${item.id}`}>{item.title}</Link>
      </td>
      <td className='basketProductItem__fasovka'><span>{item.fasovka === 0.025 ? 'пробник' : `${item.fasovka * 1000} гр`}</span></td>
      <td className='basketProductItem__count'>
        <button className='basketProductItem__count-btn-right' onClick={() => dispatch(reduceProduct(item))}>-</button>
        <span className='basketProductItem__counter'>{item.count} шт.</span>
        <button className='basketProductItem__count-btn-left' onClick={() => dispatch(incrementProduct(item))}>+</button>
      </td>
      <td className='basketProductItem__baseprice'>
        <span className='basketProductItem__baseprice_count'>{item.basePrice} ₽</span>
        {item.percentDiscount &&
        <span className='basketProductItem__baseprice_discountPercentage'>{`-${item.percentDiscount* 100} %`}</span>}
      </td>
      <td> 
      {item.salePrice
        ? <span>{item.salePrice} ₽</span>
        : <span>{item.basePrice} ₽</span>}
        </td>
      <td className='basketProductItem__total'>
      {item.salePrice
       ? <span>{+item.salePrice * item.count} ₽</span>
       :  <span>{+item.basePrice * item.count} ₽</span>}
        {show && <span className='basketProductItem__RiDeleteBin2Line' onClick={deleteItem}><RiDeleteBin2Line /></span> }
      </td>
    </tr>
  )
}
