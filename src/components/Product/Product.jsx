import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import products from '../../db.json'
import './Product.css'
import Advantages from '../Advantages/Advantages'
import PriceTable from '../PriceTable/PriceTable'
import Characteristics from '../Characteristics/Characteristics'
import Reviews from '../Reviews/Reviews'

export default function Product() {
    const params = useParams()

    const product  = products.products.find( currentValue => currentValue.id === +(params.id) )

    const [paragraph, setParagraph] = useState({
      description: true,
      characteristics: false,
      reviews: false
    })

    const changeParagraf = (e) => {
      console.log(e.target.innerText) 
      if (e.target.innerText === 'Описание') {
        setParagraph({
          description: true,
          characteristics: false,
          reviews: false
        })
      }
      if (e.target.innerText === 'Характеристики') {
        setParagraph({
          description: false,
          characteristics: true,
          reviews: false
        })
      }
      if (e.target.innerText === 'Отзывы') {
        setParagraph({
          description: false,
          characteristics: false,
          reviews: true
        })
      }
    }
    console.log(paragraph)

  return (
    <>
    <h1 className='product__title'>{product.title}</h1>
    <div className='product-wrapper'>
        <Advantages />
        <div className='product'>
            <p className='product__statistics'>
              <span>10 отзывов</span>
              <span>купили 15095 раз</span>
            </p>
            <img src={product.image} alt="" />
            <ul className='product__characteristics' onClick={changeParagraf}>
              <li className={paragraph.description ? 'product__characteristics-ative' : null} >Описание</li>
              <li className={paragraph.characteristics ? 'product__characteristics-ative' : null}>Характеристики</li>
              <li className={paragraph.reviews ? 'product__characteristics-ative' : null}>Отзывы</li>
            </ul>
            <p>{paragraph.description ? product.description : null}</p>
            <p>{paragraph.characteristics ? <Characteristics /> : null}</p>
            <p>{paragraph.reviews ? <Reviews /> : null}</p>
        </div>
        <PriceTable product={product}/>
    </div>
    </>
  )
}
