import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Basket from '../../components/Basket/Basket'
import './Header.css'
import SearchProduct from '../../components/SearchProduct/SearchProduct'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { writingCity } from '../../Redux/slices/dataSlice';
import {MdOutlineFavoriteBorder} from 'react-icons/md'
import DeliveryTime from '../../components/DeliveryTime/DeliveryTime'
import User from '../../components/User/User'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';


export default function Header() {

  const dispatch = useDispatch()

  const points = useSelector((state) => state.data.points)
  const [city, setCity] = useState('Баку')

  useEffect(() => {
    dispatch(writingCity(city))
  }, [city])

  return (
    <header className='header header-area'>
            <ToastContainer />
      <div className='container '>
        <div className='header__top'>
            <NavLink to='skidki' className='yellow-text'>Товары со скидкой</NavLink>
            <NavLink to='akcii'>Акции</NavLink>
            <NavLink to='oplata-i-dostavka'>Оплата и доставка</NavLink>
            <NavLink to='vozvrat-i-obmen'>Возврат и обмен</NavLink>
            <NavLink to='tovary-optom'>Товары оптом</NavLink>
            <NavLink to='sneki-v-ofis'>Снеки в офис</NavLink>
            <NavLink to='kontakty'>Контакты</NavLink>
            <NavLink to='otzyvy-o-nas' className='yellow-text'>Отзывы о нас</NavLink>
        </div>
        <div className='header__bottom'>
            <div>
              <Link to='/'>
                <img src="https://фундучок.рф/assets/template/images/logo.jpg" alt="" />
              </Link>
            </div>
            <div className='header__location'>
              <p>Ваш город</p>
              <select name="" id="" className='yellow-text' value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="Баку">Баку</option>
                <option value="Москва">Москва</option>
              </select>
            </div>
            <div className='header__bottom_center'>
              <div className='header__contacts'>
                <a href='tel:88005002218' className='header__contacts_tel'>8 800 500-22-18</a>
                <a href='mailto:sales@nutsland.ru' className='header__contacts_mail'>sales@nutsland.ru</a>
                <div className='header__working-hours'>
                  <p>Часы работы:</p>
                  <p className='header__working-hours_desc'>с 10:00 до 19:00 по будням,</p>
                  <p className='header__working-hours_desc'>суббота с 10:00 до 14:00</p>
                </div>
              </div>
              <SearchProduct />
            </div>
            <div>
              <User/>
              <div className='header__bonus'>
                <p>Бонусных рублей</p>
                <p>{points}</p>
              </div>
            </div>
        <Basket />
        <div>
          <Link to='favorits' className='header-favorits'>
          <span><MdOutlineFavoriteBorder className='header__MdOutlineFavoriteBorder'/></span>
          <span className='header-favorits-text'>Избранное</span>
          </Link>
        </div>

        </div>
      </div>
      <DeliveryTime />

    </header>
  )
}
