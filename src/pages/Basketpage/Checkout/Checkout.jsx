import './Checkout.css';

// Компонент для оформления заказа на странице корзины
export default function Checkout({ currentUser, orderAmount, placeOrder }) {
  if (!currentUser) {
    return (
      <div className="checkout__minimum-amount">
        <p className="checkout__link">Оформить заказ</p>
        <p className="checkout__link_text">Войдите для оформления заказа</p>
      </div>
    );
  }

  if (orderAmount < 1500) {
    return (
      <div className="checkout__minimum-amount">
        <p className="checkout__link">Оформить заказ</p>
        <p className="checkout__link_text">Минимальная сумма заказа — 1500 ₽</p>
      </div>
    );
  }

  return (
    <button type="button" to="/completed-order" className="checkout__button checkout-active" onClick={placeOrder}>Оформить заказ</button>
  );
}
