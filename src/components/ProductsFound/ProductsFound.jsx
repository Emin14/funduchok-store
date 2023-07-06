import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../ProductCard/ProductCard'

// Компонент выводит товары при нажатии на поиск
export default function ProductsFound() {

  const { phrase } = useSelector((state) => state.search.search);
  const products = useSelector((state) => state.data.products)

  return (
    <div className='products'>
      {products.filter((item) => (item.title).toUpperCase().indexOf(phrase.toUpperCase()) >= 0).map(item => <ProductCard key={item.id} item={item} />)}
    </div>
  )
}
