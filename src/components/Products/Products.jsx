import React from 'react'
import { useParams } from 'react-router-dom'
import products from '../../db.json'
import ProductItem from '../ProductItem/ProductItem'
import './Products.css'

// Компонент показывает определенные продукты в зависмости от того какая категория выбрана
export default function Products() {
  const params = useParams()

  // По по какому адресному пути прошел пользователь определяю какая категория выбрана
  const category  = products.category.find( currentValue => currentValue.pathname === params.id )

  return (
    <div className='products'>
      {products.products.filter((item) => item.category === category.id).map(item => <ProductItem title={item.title} img={item.image} price={item.price} id={item.id} category={item.category}/>)}
    </div>
  )
}

