import React from 'react'
import './Advantages.css'

// Компонент выводит на странице продукта боковую колонку слева
export default function Advantages({data}) {

  return (
    <ul className='advantages'>
      {data.map(({title, icon}) => (
          <li key={title} className='advantages__list_item'>
            {icon}
            <p className='advantages__text'>{title}</p>
          </li>
      ))}
    </ul>
  )
}