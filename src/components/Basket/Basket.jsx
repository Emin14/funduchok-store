import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import BasketHoverProduct from '../BasketHoverProduct/BasketHoverProduct';
import Progressbar from '../Progressbar/Progressbar';
import { BsBasket3 } from 'react-icons/bs';
import styles from './basket.module.css';

export default function Basket({
  totalAmount, productsInOrder, totalCount, nav,
}) {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const timeoutRef = useRef(null);

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
    <div
      className={nav ? `${styles.basketWrapper} active` : styles.basketWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to="cart" className={styles.basket}>
        <BsBasket3 className={styles.basketIcon} />
        {!!totalCount && <span className={styles.basketCount}>{totalCount}</span>}
        <div className={styles.basketMoney}>
          {!!totalAmount ? (
            <p className={styles.basketTotal}>{totalAmount} ₽</p>
          ) : (
            <p className={styles.basketLabel}>Корзина</p>
          )}
        </div>
      </Link>
      {show && location.pathname !== '/cart' && (
        <div className={styles.basketInfo}>
          <table className={styles.basketProducts}>
            <tbody>
              {productsInOrder.map((item) => (
                <BasketHoverProduct key={`${item.id}-${item.weight}`} item={item} />
              ))}
            </tbody>
          </table>
          {totalAmount < 1500 && (
            <>
              <div className={styles.minimumText}>
                Еще {1500 - totalAmount} ₽ до суммы минимального заказа
              </div>
              <Progressbar totalAmount={totalAmount} maxAmount={1500} />
            </>
          )}
          <Link to="cart" className={styles.basketButton}>
            Перейти в корзину
          </Link>
        </div>
      )}
    </div>
  );
}
