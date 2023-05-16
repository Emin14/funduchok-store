import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import products from '../../db.json'


export default function Sidebar() {
  return (
    <ul className='sidebar sidebar-area'>
        {products.category.map(item => (
                <li><NavLink to={item.pathname}>{item.title}</NavLink></li>
            ))}
    </ul>
  )
}

