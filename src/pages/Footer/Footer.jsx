import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='container footer-area footer-wrapper' >
        <div>
        <Link to='/'>
          <img src="https://фундучок.рф/assets/template/images/logo.jpg" alt="" className='footer__logo'/>
        </Link>
        <p>Интернет-магазин вкусных и полезных продуктов для вашего здоровья</p>
        <p>© 2014 - 2023</p>
        <p>Все права защищены</p>
        </div>
        <ul  className='footer__list'>
            <li><Link>Акции</Link></li>
            <li><Link>Оплата и доставка</Link></li>
            <li><Link>Возврат и обмен</Link></li>
            <li><Link>Товары оптом</Link></li>
            <li><Link>Снеки в офис</Link></li>
            <li><Link>Контакты</Link></li>
            <li><Link>Отзывы о нас</Link></li>
            <li><Link>Политика конфиденциальности | Правовая информация</Link></li>
            <li><Link>Корзина</Link></li>
            <li><Link>Оформление заказа</Link></li>
            <li><Link>Личный кабинет</Link></li>
            <li><Link>Пользовательское соглашение</Link></li>
            <li><Link>Договор оферты</Link></li>
            <li><Link>Бонусная программа</Link></li>
            <li><Link>Правила использования промокодов</Link></li>
            <li><Link>Гарантия лучшей цены</Link></li>
        </ul>
        <div>
            <h3 className='footer__contacts_title'>Наши контакты</h3>
            <div>
            <a href='tel:88005002218' className='footer__tel'>8 800 500-22-18</a>
            </div>
            <div>
            <a href='tel:84995044397' className='footer__tel'>8 499 504-43-97</a>
            </div>
            <p>Время работы отдела продаж:</p>
            <p>Пн – Пт: 10:00-19:00</p>
            <p>Сб: 10:00-14:00</p>
            <p>Москва, п. Сосенское, 22-й км Калужского шоссе, здание 10</p>
        </div>
    </footer>
  )
}
