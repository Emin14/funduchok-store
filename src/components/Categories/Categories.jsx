import React from 'react'
import Category from '../Category/Category'
import products from '../../db.json'
import './Categories.css'

// Компонент вывода категорий из базы данных (db.json) на странице <Homepage/> 
export default function Categories() {
    return (
        <div className='categories__wrapper'>
            {products.category.map(item => (
                <Category title={item.title} img={item.img} id={item.id} path={item.pathname}/>
            ))}
        </div>
    )
}
