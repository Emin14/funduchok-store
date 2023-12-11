import React from 'react'
import { Link } from 'react-router-dom'
import Advantages from '../Advantages/Advantages'
import PriceTable from '../PriceTable/PriceTable'
import ProductProperties from '../ProductProperties/ProductProperties'
import Favorit from '../../Favorit/Favorit'

import './Product.css'

import { advantages } from '../constans'


// Компонент товара
export default function Product({ product, categoryObj, isFavorite, handleClick, packing, handleChange, handleSubmit, currentPackage, count, incrementCount, decrementCount, blocks, block, selectBlock }) {

  if (product) {
    return (
      <>
        <ul className='product__bread-crumbs'>
          <li><Link to='/'>Главная  </Link></li>
          <li><Link to={`/${categoryObj.pathname}`}>{categoryObj.title}  </Link></li>
          <li><span>{product.title}</span></li>
        </ul>
        <h1 className='product__title'>{product.title}</h1>
        <div className='product-wrapper'>
          <div className='product__advantages-wrapper'>
            <Advantages data={advantages} />
            <div className='product__favorit' onClick={handleClick}>
              <Favorit item={product} isFavorite={isFavorite} text />
            </div>

          </div>
          <div className='product'>
            {/* Можно было бы реализовать не стал заморачиваться
          <p className='product__statistics'>
            <span>10 отзывов</span>
            <span>купили 15095 раз</span>
          </p> */}
            <img src={product.image} alt="" />
          </div>
          <PriceTable
            product={product}
            category={categoryObj}
            packing={packing}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            currentPackage={currentPackage}
            count={count}
            incrementCount={incrementCount}
            decrementCount={decrementCount}
          />
        </div>
        <ProductProperties
          description={product.description}
          block={block}
          blocks={blocks}
          selectBlock={selectBlock}
        />
      </>
    )
  }
}