import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import { useSelector } from 'react-redux'

// Компонент бокового меню
// Является дочерним для <Layout/>
export default function Sidebar() {
  
 const category = useSelector((state) => state.data.category)

  return (
    <aside>
      <ul className='sidebar sidebar-area'>
        {category.map(item => (
          <li key={item.id}><NavLink to={item.pathname} >{item.title}</NavLink></li>
        ))}
      </ul>
    </aside>
  )
}

