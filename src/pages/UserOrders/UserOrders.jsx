import { useEffect, useState } from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import getUserOrders from '../../utils.js/getUserOrders';
import './UserOrders.css';

const OrderItem = ({ item, index, show, handleClick }) => 
  
   { 
    const orderDate = item.date ? item.date.toDate().toLocaleDateString() : '';

    
    return (
  <div className="user-orders__wrapper" key={item.id}>
    <div className="user-orders__title">
      <span className="user-orders__text">Заказ #{item.id}</span>
      <span className="user-orders__date">от {orderDate}</span>
    </div>
    <div className="user-orders__info">
      <div><strong>Город доставки:</strong> {item.city}</div>
      <div><strong>Статус заказа:</strong> {item.status}</div>
      <div><strong>Сумма заказа:</strong> {item.orderAmount} руб.</div>
      <div><strong>Начислено баллов:</strong> {item.orderPoint}</div>
    </div>
    
    <div
      className="user-orders__products-header"
      onClick={() => handleClick(index)}
      role="button"
      tabIndex="0"
      onKeyDown={() => handleClick(index)}
    >
      <span>Продукты в заказе</span>
      <MdOutlineArrowDropDownCircle
        className={`user-orders__dropdown-icon ${show === index ? 'open' : ''}`}
      />
    </div>
    
    <div
      className="user-orders__products"
      style={{ maxHeight: show === index ? '500px' : '0', transition: 'max-height 0.3s ease' }}
    >
      {item.products.map((el, ind) => (
        <div key={`${el.id}-${el.weight}`} className="user-orders__product">
          <div className="user-orders__product-details">
            <div className="user-orders__product-name">{el.title}</div>
            <div className="user-orders__product-weight">{el.weightTitle}</div>
            <div className="user-orders__product-count">{el.count} шт</div>
            <div className="user-orders__product-price">{el.basePrice} руб.</div>
          </div>
        </div>
      ))}
    </div>
  </div>
)};

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserOrders(user.uid)
          .then((data) => setOrders(data.orders || []))
          .catch(() => setOrders([]));
      }
    });
  }, []);

  console.log(orders)

  const handleClick = (index) => {
    setShow((prev) => (prev === index ? null : index));
  };

  return (
    <div className="user-orders">
      <h3 className="user-orders__heading">Ваши заказы</h3>
      {orders.length ? (
        orders.map((item, index) => (
          <OrderItem
            key={item.id}
            item={item}
            index={index}
            show={show}
            handleClick={handleClick}
          />
        ))
      ) : (
        <p className="user-orders__empty">У вас еще нет оформленных заказов</p>
      )}
    </div>
  );
}

