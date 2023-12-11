import React from 'react'
import { NavLink } from 'react-router-dom'
import { categories } from '../ProductLayout/constans';
import './Sidebar.css'

// Компонент бокового меню
// Является дочерним для <Layout/>
export default function Sidebar() {


  return (
    <aside>
      <ul className='sidebar sidebar-area'>
        {categories.map(item => (
          <li key={item.id}><NavLink to={item.pathname}>{item.title}</NavLink></li>
        ))}
      </ul>
    </aside>
  )
}

