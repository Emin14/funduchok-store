import { Link } from "react-router";
import styles from "./footer.module.css";
import { navbar } from "../../ProductLayout/constans";

const footerLinks = [
  { id: 1, title: "Конфид-ность", link: "/#" },
  { id: 2, title: "Корзина", link: "/#" },
  { id: 3, title: "Оформление заказа", link: "/#" },
  { id: 4, title: "Личный кабинет", link: "/#" },
  { id: 5, title: "Пользов-ское соглашение", link: "/#" },
  { id: 6, title: "Договор оферты", link: "/#" },
  { id: 7, title: "Бонусная программа", link: "/#" },
  { id: 8, title: "Гарантия лучшей цены", link: "/#" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoSection}>
        <Link to="/">
          <img
            src="https://фундучок.рф/assets/template/images/logo_footer.jpg"
            alt="Логотип"
          />
        </Link>
        <p>Интернет-магазин вкусных и полезных продуктов для вашего здоровья</p>
        <p>© 2014 - 2023</p>
        <p>Все права защищены</p>
      </div>
      <ul className={styles.list}>
        {/* Рендеринг навигационных ссылок */}
        {navbar.map((item) => (
          <li key={item.id}>
            <Link to={item.link}>{item.title}</Link>
          </li>
        ))}
        {/* Рендеринг дополнительных ссылок */}
        {footerLinks.map((item) => (
          <li key={item.id}>
            <Link to={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <div className={styles.contacts}>
        <h3 className={styles.contactsTitle}>Наши контакты</h3>
        <div>
          <a href="tel:88005002218" className={styles.tel}>
            8 800 500-22-18
          </a>
        </div>
        <div>
          <a href="tel:84995044397" className={styles.tel}>
            8 499 504-43-97
          </a>
        </div>
        <p>Время работы отдела продаж:</p>
        <p>Пн – Пт: 10:00-19:00</p>
        <p>Сб: 10:00-14:00</p>
        <p>Москва, п. Сосенское, 22-й км Калужского шоссе, здание 10</p>
      </div>
    </footer>
  );
}
