import React from 'react'
import { Link } from 'react-router-dom'
import './ProductItem.css'

// Компонент карточки товара которые выводятся в компоненте <Products />
// Является дочерним для <Products />
export default function ProductItem({title, img, price, id}) {
  return (
    <div className='productItem'>
      <Link to={`${id}`} className='productItem__link'>
        <img src={img} alt="" className='productItem__img'/>
        <div>
          <p>{title}</p>
          <p>{`${price} рублей`}</p>
        </div>
    </Link>
    </div>
  )
}
