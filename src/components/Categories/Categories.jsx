import React from 'react'
import { useSelector } from 'react-redux'
import Category from '../Category/Category'
import './Categories.css'

// Компонент вывода списка категорий на главной
export default function Categories() {

    const category = useSelector((state) => state.data.category)

    return (
        <div className='categories__wrapper'>
            {category.map(item => (
                <Category key={item.id} title={item.title} img={item.img} path={item.pathname} />
            ))}
        </div>
    )
}
