import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Basket from '../../components/Basket/Basket'
import './Header.css'

// Тут много работы: сделать вход и регистрацию и т.д. еще не супел
export default function Header() {

  return (
    <header className='header header-area'>
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
              <select name="" id="" className='yellow-text'>
                <option value="">Баку</option>
                <option value="">Москва</option>
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
              <div className='header__seach'>
                <input type="text" className='header__input'/>
                <button className='button yellow-text header__seach_btn' >Поиск</button>
              </div>
            </div>
            <div>
              <div className='header__links-account'> 
                <Link>Войти</Link>
                <span>|</span>
                <Link>Регистрация</Link>
              </div>
              <div className='header__bonus'>
                Бонусных рублей
              </div>
            </div>
        <Basket />
        </div>
      </div>

    </header>
  )
}
