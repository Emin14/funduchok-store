import React, { useState } from 'react'
import Characteristics from '../Characteristics/Characteristics'
import Reviews from '../Reviews/Reviews'
import './ProductProperties.css'

// Компонент для вывода внизу страницы товара таблицы с описанием, характеристиками, отзывами
// Является дочерним для <Product/>
export default function ProductProperties({product}) {

    const [paragraph, setParagraph] = useState('Описание')
    
    const changeParagraf = (e) => {
      setParagraph(e.target.innerText)
      }

  return (
    <div>
        <ul className='productProperties__list' onClick={changeParagraf}>
          <li className={`productProperties__item ${paragraph === "Описание" ? 'active' : ''}`} >Описание</li>
          <li className={`productProperties__item ${paragraph === "Характеристики" ? 'active' : ''}`}>Характеристики</li>
          <li className={`productProperties__item ${paragraph === "Отзывы" ? 'active' : ''}`}>Отзывы</li>
        </ul>

            {
              paragraph === "Описание" ? <div>{product.description}</div>:
              paragraph === "Характеристики" ? <Characteristics />:
              paragraph === "Отзывы" ? <Reviews />:
              null  
            }

    </div>
  )
}
