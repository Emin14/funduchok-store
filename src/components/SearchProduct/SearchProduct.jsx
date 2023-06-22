import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { searchProduct } from '../../Redux/slices/searchSlice'
import './SearchProduct.css'

// Компонент поиска товаров
// Является дочерним для <Header/>
export default function SearchProduct() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const [phrase, setPhrase] = useState('');
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
      setPhrase('')
    }
  }

  useEffect(() => {
    setPhrase('');
    dispatch(searchProduct({
      phrase: '',
      begin: false
    }))
  }, [location.pathname])

  return (
    <div className='searchProduct'>
      <input type="text" className='searchProduct__input' value={phrase} onChange={e => setPhrase(e.target.value)} />
      <button className='button yellow-text searchProduct_btn' onClick={search}>Поиск</button>

      {phrase.length > 0 &&
        <ul className='searchProduct__list'>
          {
            // Находим продукты: фильтруем продукты которые соотвествуют введенной фразе (phrase)
            products.filter((item) => (item.title).toUpperCase().indexOf(phrase.toUpperCase()) >= 0)
            .map(item => {
                // Далее находим категорию которая соотвествует найденному выше продукту
                const activeCategory = category.find(el => el.id === item.category)
                return <li key={item.id} className='searchProduct__list_item' onClick={() => setPhrase('')}><Link to={`${activeCategory.pathname}/${item.id}`} >{item.title}</Link></li>
              })}
        </ul>}
    </div>
  )
}
