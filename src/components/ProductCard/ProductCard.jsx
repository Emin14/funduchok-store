import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './ProductCard.css'
import products from '../../db.json'
import Favorit from '../Favorit/Favorit'

// Компонент карточки товара которые выводятся в компоненте <Products />
// Является дочерним для <Products />
export default function ProductCard({ item, pathname }) {

  const classNameFavorit = {
    position: 'absolute',
    top: '6px',
    right: '8px'
  }

  return (
    <div className='productCard'>
        <Favorit item={item} classNameFavorit={classNameFavorit}/>
      <Link to={`/${pathname}/${item.id}`} className='productCard__link' >
        <img src={item.image} alt="" className='productCard__img' />
          <p>{item.title}</p>
          <p>{`${item.basePrice} ₽/кг`}</p>
      </Link>
    </div>
  )
}
