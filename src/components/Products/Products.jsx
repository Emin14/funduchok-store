import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductCard from '../ProductCard/ProductCard'
import ProductsFound from '../ProductsFound/ProductsFound'
import './Products.css'


// Компонент показывает определенные продукты в зависмости от того какая категория выбрана
export default function Products() {
  
  const params = useParams()

  const products = useSelector((state) => state.data.products)
  const category = useSelector((state) => state.data.category)
  const { begin } = useSelector((state) => state.search.search);

  // По по какому адресному пути прошел пользователь определяю какая категория выбрана
  const activeCategory = category.find(currentValue => currentValue.pathname === params.category)

  if (begin) {
    return (
      <ProductsFound />
    )
  }
  
  if (activeCategory) {
  return (
    <div className='products'>
      {products.filter((item) => item.category === activeCategory.id).map(item => <ProductCard key={item.id} item={item} pathname={activeCategory.pathname}/>)}
    </div>
  )
}
}

