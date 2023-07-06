import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../../Redux/slices/cartSlice';
import axios from '../../axios';
import './Checkout.css'

// Компонент для оформления заказа на странице корзины
// Является дочерним для <Basketpage/>
export default function Checkout({nameUser, phoneUser}) {

    const dispatch = useDispatch();

    const productsInOrder = useSelector((state) => state.cart.cart);

    // Формируем из productsInOrder массив только с теми свойствами, которые нужны в истории заказов, чтобы не передавать изображение и т.д.
    let newTovar = []
    for(let i = 0; i < productsInOrder.length; i++) {
      const { description, image, amountOfDiscount, basePrice, ...rest} = productsInOrder[i];
      newTovar[i] = rest
    }

    const orderAmount  = useSelector((state) => state.cart.total);

    const currentUser = JSON.parse(localStorage.getItem('user'))
    const pointsInCard   = useSelector((state) => state.cart.points);
    const pointsInOrders = useSelector((state) => state.data.points)
    const city = useSelector((state) => state.data.city)

    const [currentUserOrders, setCurrentUserOrders] = useState('')

    useEffect(() => {
      getUserFromDatabase()
    }, [])

    const getUserFromDatabase = () => {
      if(currentUser) {
        // Получаем из базы данных текущего пользователя
        axios.get(`users/${currentUser.id}`)
        .then(res => setCurrentUserOrders(res.data.orders))
      }
      if(!currentUser) {
        // Получаем последний заказ который без регистрации
        axios.get(`notLoginOrders`)
        .then(res => setCurrentUserOrders(res.data))
      }
    }


    const addOrder = () => {
      // Вытаскиваем ID последнего заказа, если он есть
      // Не знаю насколько верно получать эти данные тут по идее их можно получать в каком то верхнем компоненте и записывать в state
      let lastId = 0
      if(currentUserOrders.length) {
        lastId = +currentUserOrders.at(-1).id
      }
      // При оформлении заказов добавляются только баллы при сумме заказа от 3000 р.
      let orderPoints = 0
      if(currentUser && orderAmount > 3000) {
        orderPoints = pointsInCard
      }
      const pointsTotal = pointsInOrders + orderPoints
    
      // Формируем объект со свойствами заказа
      const newOrder = {
        id: lastId+1,
        datе: new Date(),
        status: "notProcessed",
        orderAmount,
        orderPoints,
        city,
        products: newTovar
      }

      // Передаю в базу данных заказ (по разным ключам в зависимости от того зарегистрирован пользователь или нет)
      if(currentUser) {
        axios.patch(`users/${currentUser.id}`, {
          orders: [...currentUserOrders, newOrder],
          points: pointsTotal,
        })
      }
      if(!currentUser) {
        axios.post(`notLoginOrders`, {
          name: nameUser, 
          phone: phoneUser,
          ...newOrder,
        })
        localStorage.setItem('noLoginUser', JSON.stringify({
          name: nameUser, 
          phone: phoneUser
        }))
      }
      dispatch(clearCart())
    }

if(!currentUser && !(nameUser && phoneUser)) {
  return (
    <div className='checkout__minimum-amount'>
    <p className='checkout__link'>Оформить заказ</p>
    <p className='checkout__link_text'>Введите в правой колонке контактные данные</p>
    </div>
  )
}

if(orderAmount < 1500) {
  return (
    <div className='checkout__minimum-amount'>
    <p className='checkout__link'>Оформить заказ</p>
    <p className='checkout__link_text'>Минимальная сумма заказа — 1500 ₽</p>
    </div>
  )
}

else {
  return (
    <Link to='/completed-order' className='checkout__link checkout-active' onClick={addOrder}>Оформить заказ</Link>
  )
}
}