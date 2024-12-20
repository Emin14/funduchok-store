import { useEffect, useState } from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import getUserOrders from '../../utils.js/getUserOrders';
import styles from './userOrders.module.css';

const OrderItem = ({ item, index, show, handleClick }) => 
  
   { 
    const orderDate = item.date ? item.date.toDate().toLocaleDateString() : '';

    
    return (
  <div className={styles.wrapper} key={item.id}>
    <div className={styles.title}>
      <span className={styles.text}>Заказ #{item.id}</span>
      <span className={styles.date}>от {orderDate}</span>
    </div>
    <div className={styles.info}>
      <div><strong>Город доставки:</strong> {item.city}</div>
      <div><strong>Статус заказа:</strong> {item.status}</div>
      <div><strong>Сумма заказа:</strong> {item.orderAmount} руб.</div>
      <div><strong>Начислено баллов:</strong> {item.orderPoint}</div>
    </div>
    
    <div
      className={styles.productsWrapper}
      onClick={() => handleClick(index)}
      role="button"
      tabIndex="0"
      onKeyDown={() => handleClick(index)}
    >
      <span>Продукты в заказе</span>
      <MdOutlineArrowDropDownCircle
        className={`icon ${show === index ? 'open' : ''}`}
      />
    </div>
    
    <div
      className={styles.products}
      style={{ maxHeight: show === index ? '500px' : '0', transition: 'max-height 0.3s ease' }}
    >
      {item.products.map((el, ind) => (
        <div key={`${el.id}-${el.weight}`} className={styles.product}>
          <div className={styles.details}>
            <div className={styles.name}>{el.title}</div>
            <div className={styles.weight}>{el.weightTitle}</div>
            <div className={styles.count}>{el.count} шт</div>
            <div className={styles.price}>{el.basePrice} руб.</div>
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
    <div className={styles.orders}>
      <h3 className={styles.heading}>Ваши заказы</h3>
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
        <p className={styles.empty}>У вас еще нет оформленных заказов</p>
      )}
    </div>
  );
}

