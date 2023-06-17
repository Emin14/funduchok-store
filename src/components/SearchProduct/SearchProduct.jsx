import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { searchProduct } from '../../Redux/slices/searchSlice'
import './SearchProduct.css'
import { render } from '@testing-library/react';


// Компонент поиска товаров
// Является дочерним для <Header/>
// ? Является ли этот компонент какой то копией компонента <ProductsFound />, который выводит найденные продукты в <Homepage />
export default function SearchProduct() {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phrase, SetPhrase] = useState('');
  const products = useSelector((state) => state.data.products)
  const category = useSelector((state) => state.data.category)


  // Формирует список продуктов при нажатии на поиск
  const search = () => {
    if (phrase.length) {
      dispatch(searchProduct({
        phrase: phrase,
        begin: true
      }))
      navigate('/')
      SetPhrase('')
    }
  }

  // Очищает инпут при нажатии на товар из поиска
  
  const clearinput = () => {
    SetPhrase('')
    render()
  }



  return (
    <div className='searchProduct'>
      <input type="text" className='searchProduct__input' value={phrase} onChange={e => SetPhrase(e.target.value)} />
      <button className='button yellow-text searchProduct_btn' onClick={search}>Поиск</button>
      {/* Если в инпуте введено что то, то выводим список продуктов */}
      {phrase.length > 0 &&
        <ul className='searchProduct__list'>
          {
            // Находим продукты: фильтруем продукты из db.json которые соотвествуют введенной фразе (phrase)
            products.filter((item) => (item.title).toUpperCase().indexOf(phrase.toUpperCase()) >= 0)
              .map(item => {
                // Далее находим категорию которая соотвествует найденному выше продукту
                const activeCategory = category.find(el => el.id === item.category)
                return <li key={item.id} className='searchProduct__list_item' onClick={clearinput}><Link to={`${activeCategory.pathname}/${item.id}`} >{item.title}</Link></li>
              })}
        </ul>}
    </div>
  )
}
