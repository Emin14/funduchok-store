// import { Link } from 'react-router-dom';
import { Link } from "react-router"
import './Footer.css';
import { navbar } from '../../ProductLayout/constans';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <Link to="/">
          <img src="https://фундучок.рф/assets/template/images/logo_footer.jpg" alt="" />
        </Link>
        <p>Интернет-магазин вкусных и полезных продуктов для вашего здоровья</p>
        <p>© 2014 - 2023</p>
        <p>Все права защищены</p>
      </div>
      <ul className="footer__list">
        {navbar.map((item) => (
          <Link key={item.id} to={item.link}>{item.title}</Link>
        ))}
        <li><Link href="/#">Конфид-ность</Link></li>
        <li><Link href="/#">Корзина</Link></li>
        <li><Link href="/#">Оформление заказа</Link></li>
        <li><Link href="/#">Личный кабинет</Link></li>
        <li><Link href="/#">Пользов-ское соглашение</Link></li>
        <li><Link href="/#">Договор оферты</Link></li>
        <li><Link href="/#">Бонусная программа</Link></li>
        <li><Link href="/#">Гарантия лучшей цены</Link></li>
      </ul>
      <div className="footer__contacts">
        <h3 className="footer__contacts_title">Наши контакты</h3>
        <div>
          <a href="tel:88005002218" className="footer__tel">8 800 500-22-18</a>
        </div>
        <div>
          <a href="tel:84995044397" className="footer__tel">8 499 504-43-97</a>
        </div>
        <p>Время работы отдела продаж:</p>
        <p>Пн – Пт: 10:00-19:00</p>
        <p>Сб: 10:00-14:00</p>
        <p>Москва, п. Сосенское, 22-й км Калужского шоссе, здание 10</p>
      </div>
    </footer>
  );
}
