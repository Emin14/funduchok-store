import React, { useState } from 'react'
import Characteristics from '../Characteristics/Characteristics'
import Reviews from '../Reviews/Reviews'
import './ProductProperties.css'

// Компонент для вывода на странице товара таблицы с описанием, характеристиками, отзывами
// Является дочерним для <Product/>
export default function ProductProperties({product}) {

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

  return (
    <div>
        <ul className='productProperties__list' onClick={changeParagraf}>
          <li className={`productProperties__item${paragraph.description ? '-active' : ''}`} >Описание</li>
          <li className={`productProperties__item${paragraph.characteristics ? '-active' : ''}`}>Характеристики</li>
          <li className={`productProperties__item${paragraph.reviews ? '-active' : ''}`}>Отзывы</li>
        </ul>
        <p>{paragraph.description ? product.description : null}</p>
        <p>{paragraph.characteristics ? <Characteristics /> : null}</p>
        <p>{paragraph.reviews ? <Reviews /> : null}</p>
    </div>
  )
}
