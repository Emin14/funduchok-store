import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

  return (
    <div className={nav ? ['basket__wrapper', 'active'].join(' ') : 'basket__wrapper'}>
      <Link to="cart" className="basket" onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}>
        <div className="SlBasket__wrapper">
          <SlBasket className="SlBasket" />
          <span className="basket__count">{totalCount}</span>
        </div>
        <div className="basket__money">
          <p className="basket__basket-word">Корзина</p>
          {
          totalAmount > 0
          && (
          <p className="basket__total">
            {totalAmount}
            {' '}
            ₽
          </p>
          )
          }
        </div>
      </Link>
      {(show && productsInOrder.length && location.pathname !== '/cart')
        ? (
          <div className="basket__info" onMouseOver={() => setShow(true)} onFocus={() => setShow(true)} onMouseOut={() => setShow(false)} onBlur={() => setShow(false)}>
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
                {1500 - totalAmount}
                {' '}
                ₽ до суммы минимального заказа
                {' '}
              </div>
              <Progressbar totalAmount={totalAmount} maxAmount={1500} />
            </>
            )}
            <Link to="cart" className="basket__info_button" onClick={() => setShow(false)}>Перейти в корзину</Link>
          </div>
        )
        : ''}
    </div>
  );
}
