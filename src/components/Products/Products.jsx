import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
// import products from '../../db.json'
import ProductCard from '../ProductCard/ProductCard'
import './Products.css'

import { useSelector } from 'react-redux'
import ProductsFound from '../ProductsFound/ProductsFound'

import axios from '../../axios';
import { useEffect } from 'react';

// Компонент показывает определенные продукты в зависмости от того какая категория выбрана
export default function Products() {

  // По сути бесполезная функция, но с ней работает только работает комонент так как продукты из state берутся после того как useEffect сработает
  useEffect(() => {
    axios('/products')
  }, [])
  
  
  const params = useParams()

  const products = useSelector((state) => state.data.products)
  const category = useSelector((state) => state.data.category)

  // По по какому адресному пути прошел пользователь определяю какая категория выбрана
  const activeCategory = category.find(currentValue => currentValue.pathname === params.category)

  const { begin } = useSelector((state) => state.search.search);

  if (begin) {
    return (
      <ProductsFound />
    )
  }
  

  return (
    <div className='products'>
      {products.filter((item) => item.category === activeCategory.id).map(item => <ProductCard key={item.id} item={item} pathname={activeCategory.pathname}/>)}
    </div>
  )
}

  // title={item.title} img={item.image} price={item.price} id={item.id} categoryID={item.category}
