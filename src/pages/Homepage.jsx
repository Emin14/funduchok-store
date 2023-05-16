import React, { useState } from 'react'
import Categories from '../components/Categories/Categories'
import products from '../db.json'
import ProductItem from '../components/ProductItem/ProductItem'

// Компонент главной страницы в котором находится компонент <Category />

// Тут не должно быть inputa с поиском продуктов, он должен быть в <Header/>, а вот товары должны выводиться скорее всего в Homepage
// У меня это не получилось, попытался хотя бы в Homepage экспериментально реализовать логику поисковика и вывод товаров: 
// Поиск работает криво: не осуществляется повторный поиск
//  И не смог додумать логику условного рендеринга

export default function Homepage() {

  const [phrase, SetPhrase ] = useState('');
  const [prob, SetProb ] = useState(false);

  const search = () => {
    if(phrase.length) {
      console.log(products.products)
        SetProb(true)
    }
  }

  return (
    <>
      <div className='header__seach'>
        <input type="text" className='header__input' value={phrase} onChange={(e) => SetPhrase(e.target.value)}/>
        <button className='button yellow-text header__seach_btn' onClick={search}>Поиск</button>
      </div>

      {prob &&
      <div className='products'>
        {products.products.filter((item) => (item.title).toUpperCase().indexOf(phrase.toUpperCase())  >= 0 ).map(item => <ProductItem title={item.title} img={item.image} price={item.price} id={item.id} category={item.category}/>)}
      </div>}

      <Categories />
    </>
  )
}
