import styles from './checkout.module.css';

// Компонент для оформления заказа на странице корзины
export default function Checkout({ currentUser, orderAmount, placeOrder }) {

  const information = !currentUser ? 'Войдите для оформления заказа' : orderAmount < 1500 ? 'Минимальная сумма заказа — 1500 ₽' : ''

  return (
    <>
    <button type="button" to="/completed-order" className={information ? styles.placeOrder : `${styles.placeOrder} ${styles.active}`} onClick={placeOrder}>Оформить заказ</button>
    <div className={styles.informationWrapper}>
      <p className={styles.information}>{information}</p>
    </div>
    </>
  );
}
