import { useEffect, useState } from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import './UserOrders.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import getUserOrders from '../../utils.js/getUserOrders';

export default function UserOrders() {
  const [orders, setOrders] = useState('');
  const [show, setShow] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserOrders(user.uid)
          .then((data) => setOrders(data.orders));
      } else {
      // User is signed out
      // ...
      }
    });
  }, []);

  const handleClick = (index) => {
    if (show === index) {
      setShow(null);
    } else {
      setShow(index);
    }
  };

  if (orders.length) {
    return (
      <div>
        <h3>Ваши заказы</h3>
        {orders.map((item, index) => (
          <div className="user-orders__wrapper">
            <div className="user-orders_title">
              {/* <span className='user-orders_text'>Заказ {item.id} </span> */}
              {/* <span className='user-orders_data'>от {item.datе.slice(0, 10)}</span> */}
            </div>
            <div>
              <span>Город доставки: </span>
              <span>{item.city}</span>
            </div>
            <div>
              <span>Статус заказа: </span>
              <span>{item.status}</span>
            </div>
            <div>
              <span>Сумма заказа: </span>
              <span className="user-orders__totalAmount">{item.orderAmount}</span>
            </div>
            <div>
              <span>Начислено баллов: </span>
              <span className="user-orders__totalAmount">{item.orderPoint}</span>
            </div>
            <div className="user-orders__products-wrapper" onClick={() => handleClick(index)} onKeyDown={() => handleClick(index)} role="presentation">
              <span className="user-orders__products">Продукты в заказе</span>
              <MdOutlineArrowDropDownCircle className="user-orders__MdOutlineArrowDropDownCircle" />
            </div>
            <div style={{ display: show === index ? 'block' : 'none' }}>
              {item.products.map((el, ind) => (
                <ul key={`${el.id}-${el.weight}`}>
                  <li>
                    <span>
                      {ind + 1}
                      {' '}
                    </span>
                    {' '}
                    <span>{el.title}</span>
                    <span>
                      {' '}
                      {el.weightTitle}
                      ,
                      {' '}
                    </span>
                    <span>
                      {el.count}
                      {' '}
                      шт *
                      {' '}
                    </span>
                    <span>
                      {el.basePrice}
                      {' '}
                      рублей
                    </span>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <p>У вас еще нету оформленных заказов</p>
    </div>
  );
}
