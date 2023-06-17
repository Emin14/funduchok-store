import React, { useEffect, useState } from 'react'
import Categories from '../components/Categories/Categories'

import { useSelector } from 'react-redux'
import ProductsFound from '../components/ProductsFound/ProductsFound'

// Компонент главной страницы в котором находится компонент <Category />

// Тут не должно быть inputa с поиском продуктов, он должен быть в <Header/>, а вот товары должны выводиться скорее всего в Homepage
// У меня это не получилось, попытался хотя бы в Homepage экспериментально реализовать логику поисковика и вывод товаров: 
// Поиск работает криво: не осуществляется повторный поиск
//  И не смог додумать логику условного рендеринга

export default function Homepage() {

  const {begin} = useSelector((state) => state.search.search);

  if (begin) {
    return (
      <ProductsFound />
    )
  }

  return (
      <Categories />
  )
}
