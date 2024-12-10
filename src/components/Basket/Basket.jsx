import { useRef, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import { Link, useLocation } from "react-router"
import { SlBasket } from 'react-icons/sl';
import BasketHoverProduct from '../BasketHoverProduct/BasketHoverProduct';
import Progressbar from '../Progressbar/Progressbar';
import './Basket.css';

// Компонент отображения корзины в шапке сайта (Header)
export default function Basket({
  totalAmount, productsInOrder, totalCount, nav,
}) {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const timeoutRef = useRef(null);  // Реф для хранения таймера

  const handleMouseEnter = () => {
    console.log('Мышь вошла в корзину');
    if (window.screen.width > 767.98 && productsInOrder.length) {
      // Если был таймер, очищаем его
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setShow(true);  // Показываем корзину
    }
  };

  const handleMouseLeave = () => {
    console.log('Мышь покинула корзину');

    // Устанавливаем таймер на 300мс для скрытия окна
    timeoutRef.current = setTimeout(() => {
      setShow(false);  // Скрываем корзину после задержки
    }, 300);  // Задержка перед закрытием
  };

  return (
    <div className={nav ? ['basket__wrapper', 'active'].join(' ') : 'basket__wrapper'}       onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
      <Link to="cart" className="basket">
        <div className="SlBasket__wrapper">
          <SlBasket className="SlBasket" />
          {totalCount > 0 && <span className="basket__count">{totalCount}</span>}
        </div>
        <div className="basket__money">
          { totalAmount > 0
          ? (
          <p className="basket__total">
            {totalAmount } ₽
          </p>
          )
          : <p className="basket__basket-word">Корзина</p>
          }
        </div>
      </Link>
      {show && location.pathname !== '/cart'
        ? (
          <div className="basket__info">
            <table className="basket__info_products">
              <tbody>
                {productsInOrder.map((item) => (
                  <BasketHoverProduct key={`${item.id}-${item.weight}`} item={item} />
                ))}
              </tbody>
            </table>
            {totalAmount < 1500
            && (
            <>
              <div className="basket__minimum-text">
                Еще
                {' '}
                {1500 - totalAmount}
                {' '}
                ₽ до суммы минимального заказа
              </div>
              <Progressbar totalAmount={totalAmount} maxAmount={1500} />
            </>
            )}
            <Link to="cart" className="basket__info_button">Перейти в корзину</Link>
          </div>
        )
        : ''}
    </div>
  );
}
