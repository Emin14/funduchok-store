import React from 'react'
import { Link } from 'react-router-dom'
import './Category.css'

// Компонент карточки категории
// Является дочерним для компонента <Categories/> 
export default function Category({title, img, path}) {

  return (
    <Link to={`/${path}`} className='category'>
        <img src={img} alt="" />
        <p>{title}</p>
    </Link>
  )
}
