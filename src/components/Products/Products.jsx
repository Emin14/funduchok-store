import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductCard from '../ProductCard/ProductCard'
import ProductsFound from '../ProductsFound/ProductsFound'
import { getProducts } from '../../utils.js/getProducts';
import { getSearchProducts } from '../../utils.js/getProductsAll'
import './Products.css'

// Компонент показывает определенные продукты в зависмости от того какая категория выбрана
export default function Products() {

  const [productsOfCategory, setProductsOfCategory] = useState(null)
  
  const params = useParams()

console.log(params.category)
  useEffect(() => {
      getProducts(params.category)
      .then(data => setProductsOfCategory(data))
   }, [params])


  if (productsOfCategory) {
  return (
    <div className='products'>
      {productsOfCategory.map(item => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  )
}
}
