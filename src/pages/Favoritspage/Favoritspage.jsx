import React from 'react'
import { useSelector } from 'react-redux'
import './Favoritspage.css'
import Favorit from '../../components/Favorit/Favorit'
import ProductCard from '../../components/ProductCard/ProductCard'

export default function Favorits() {
    const favorits = useSelector(state => state.favorits.favorits)
  return (
    <div>
        <h3>Ваши закладки:</h3>
        <ul className='favorits__list'>
        {favorits.map(item => (
          <li key={item.id}> <ProductCard item={item} /></li>
        ))}
        </ul>
    </div>
  )
}
