import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

import { useDispatch, useSelector } from 'react-redux'
import { searchProduct } from '../../Redux/slices/searchSlice'


// Не знаю насколько правильно дублировать тут логику которую использую в Header 
export default function Sidebar() {

  const dispatch = useDispatch()
  
 const category = useSelector((state) => state.data.category)

  const ada = () => {
    dispatch(searchProduct({
      phrase: '',
      begin: false
    }))
  }

  return (
    <aside>
      <ul className='sidebar sidebar-area'>
        {category.map(item => (
          <li key={item.id}><NavLink to={item.pathname} onClick={ada}>{item.title}</NavLink></li>
        ))}
      </ul>
    </aside>
  )
}

