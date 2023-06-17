import React from 'react'
import products from '../../db.json'
import { useSelector } from 'react-redux'
import ProductCard from '../ProductCard/ProductCard'

export default function ProductsFound() {

  const { phrase } = useSelector((state) => state.search.search);
  const products = useSelector((state) => state.data.products)

  return (
    <div className='products'>
      {products.filter((item) => (item.title).toUpperCase().indexOf(phrase.toUpperCase()) >= 0).map(item => <ProductCard key={item.id} item={item} />)}
    </div>
  )
}
