import React from 'react'
import Category from '../Category/Category'
import { useSelector } from 'react-redux'
import './Categories.css'

// Компонент вывода категорий из базы данных (db.json) на странице <Homepage/> 
export default function Categories() {

    const category = useSelector((state) => state.data.category)

    return (
        <div className='categories__wrapper'>
            {category.map(item => (
                <Category key={item.id} title={item.title} img={item.img} id={item.id} path={item.pathname} />
            ))}
        </div>
    )
}
