import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';
import axios from '../../axios';
import {MdOutlineArrowDropDownCircle} from 'react-icons/md'
import './UserOrders.css'
import { useNavigate } from 'react-router-dom';

export default function UserOrders() {
const [orders, setOrders] = useState('')
const [show, setShow] = useState(false)
const [count, setCount] = useState('')
const navigate = useNavigate()

// Получаем текущего юзера из redux
const currentUser = JSON.parse(localStorage.getItem('user'))


const gut = async() => {
  let orders  = await axios.get(`users/${currentUser.id}`);
  orders = orders.data.orders;
  setOrders(orders)
}

  useEffect(() => {
    if (!currentUser) {
      navigate('/')
  }
    gut()
  }, [])
  
const ada = (e) => {
  const tut = +e.target.parentNode.parentNode.children[0].children[0].childNodes[1].textContent
  setCount(tut) 
  setShow(!show)
}

// в CompletedOrder повторяется логика
function proceccing(status) {
  switch (status) {
    case 'notProcessed':
        return  'Заказ еще не обработан';
    case 'orderIsCollected':
      return 'Заказ собирают'
    case 'orderOnTheWay':
      return 'Заказ в пути'
    case 'orderDelivered':
        return 'Заказ доставлен'
  }
} 

if(orders.length) {
  return (
      <div>
          <h3>Ваши заказы</h3>
              {orders.map((item, ind) => (
          <div key={item.id} className='user-orders__wrapper'>

          <div className='user-orders_title'>
            <span className='user-orders_text'>Заказ {item.id} </span>
            <span className='user-orders_data'>от {item.datе.slice(0, 10)}</span>
          </div>
          <div><span>Статус заказа: </span><span>{proceccing(item.status)}</span></div>
          <div><span>Сумма заказа: </span><span className='user-orders__totalAmount'>{item.orderAmount}</span></div>
          <div><span>Начислено баллов: </span><span className='user-orders__totalAmount'>{item.orderPoints}</span></div>
          <div className='user-orders__products-wrapper' onClick={ada} >
            <span className='user-orders__products'>Продукты в заказе</span>
            <MdOutlineArrowDropDownCircle className='user-orders__MdOutlineArrowDropDownCircle'/>
          </div>
            {item.products.map((el,index) => (
              <ul key={`${el.id}-${el.fasovka}`} style={{display: show && ind+1 === count ? 'block' : 'none'}}>
                <li><span>{index+1}) </span> <span>{el.title}</span><span> {el.fasovka}, </span><span>{el.count} шт * </span><span>{el.salePrice} рублей</span></li>
              </ul>
            ))}

          </div>
        ))}
      </div>
  )
}


  return (
    <div>
      <p>У вас еще нету оформленных заказов</p>
    </div>
  )
}
