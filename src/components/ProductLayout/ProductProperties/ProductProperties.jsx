import React from 'react'
import Characteristics from '../Characteristics/Characteristics'
import Reviews from '../Reviews/Reviews'
import './ProductProperties.css'

export default function ProductProperties({ description, blocks, block, selectBlock }) {

  if (blocks) {
    return (
      <div>
        <ul className='productProperties__list' onClick={selectBlock}>
          {blocks.map(item => (
            <li key={item.title} data-columns={item.dataset} className={`productProperties__item ${block[item.dataset] ? 'active' : ''}`} >
              {item.title}
            </li>
          ))}
        </ul>
        {
          block.description ? <div>{description}</div> :
            block.characteristics ? <Characteristics /> :
              block.reviews ? <Reviews /> :
                null
        }
      </div>
    )
  }
}