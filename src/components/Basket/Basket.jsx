import { useRef, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import { Link, useLocation } from "react-router"
import { SlBasket } from 'react-icons/sl';
import BasketHoverProduct from '../BasketHoverProduct/BasketHoverProduct';
import Progressbar from '../Progressbar/Progressbar';
import './Basket.css';
import { BsBasket3 } from "react-icons/bs";


// Компонент отображения корзины в шапке сайта (Header)
export default function Basket({
  totalAmount, productsInOrder, totalCount, nav,
}) {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const timeoutRef = useRef(null);  // Реф для хранения таймера

  const handleMouseEnter = () => {
    if (window.screen.width > 767.98 && productsInOrder.length) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setShow(true);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShow(false);
    }, 300);  
  };

  return (
    <div className={nav ? ['basket__wrapper', 'active'].join(' ') : 'basket__wrapper'}       onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
      <Link to="cart" className="basket">
        {/* <div className="SlBasket__wrapper"> */}
          {/* <SlBasket className="SlBasket" /> */}
          <BsBasket3  className="SlBasket" />
          {totalCount > 0 && <span className="basket__count">{totalCount}</span>}
        {/* </div> */}
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
