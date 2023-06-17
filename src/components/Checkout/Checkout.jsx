import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pushOrders } from '../../Redux/slices/dataSlice'
import { clearCart } from '../../Redux/slices/cartSlice';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import './Checkout.css'

// Проверить нету ли лишних селекторов

// Без регистрации и баллы не должны считаться
export default function Checkout({nameUser, phoneUser}) {

    const dispatch = useDispatch();

    const productsInOrder = useSelector((state) => state.cart.cart);
    const orderAmount  = useSelector((state) => state.cart.total);

    // Мне кажется нужно где то в Апп получать последний заказ, чтобы выводить эту функцию, а также чтобы показывать статус заказа....
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const pointsInCard   = useSelector((state) => state.cart.points);
    const pointsInOrders = useSelector((state) => state.data.points)
    const city = useSelector((state) => state.data.city)
    // const city = useSelector((state) => state.data.city)

    const [currentUserOrders, setCurrentUserOrders] = useState('')

    const getUserFromDatabase = async() => {
      if(currentUser) {
        // Получаем из базы данных текущего пользователя
        const user = await axios.get(`users/${currentUser.id}`)
        .then(res => setCurrentUserOrders(res.data.orders))
        // Записываем в useState чтобы ниже у нас был доступ к нему
        // setCurrentUserInDataBase(user)
      }
      if(!currentUser) {
        // Получаем последний заказ который без регистрации
        const order = await axios.get(`notLoginOrders`)
        .then(res => setCurrentUserOrders(res.data))
        // Записываем в useState чтобы ниже у нас был доступ к нему
        // setCurrentUserInDataBase(user)
      }

      }


      useEffect(() => {
        getUserFromDatabase()
      }, [])


    const addOrder = () => {

      let lastId = 0
      if(currentUser) {
        // Находим заказы текущего пользователя
        // const currentUserOrders = currentUserInDataBase.data.orders
        // Если у текущего юзера нету заказов тогда последний id = 0
        // let lastId = 0
        if(currentUserOrders.length) {
          lastId = +currentUserOrders.at(-1).id
        }
      }
      if(!currentUser) {
        // Находим заказы текущего пользователя
        // const currentUserOrders = currentUserInDataBase.data.orders
        // Если у текущего юзера нету заказов тогда последний id = 0
        // let lastId = 0
        if(currentUserOrders.length) {
          lastId = +currentUserOrders.at(-1).id
        }
      }

    
        // Формируем массив только с теми свойствами, которые нужны в истории заказов, чтобы не передавать изображение и т.д.
        let newTovar = []
          for(let i = 0; i < productsInOrder.length; i++) {
            const { description, image, amountOfDiscount, basePrice, ...rest} = productsInOrder[i];
            newTovar[i] = rest
          }
    
        // При оформлении заказов добавляются только баллы при сумме заказа от 3000 р.
        let orderPoints = pointsInCard
        if(!currentUser || orderAmount < 3000) {
          orderPoints = 0
        }

    
        // Формируем объект для передачи на сервер
        const newOrder = {
          id: lastId+1,
          datе: new Date(),
          status: "notProcessed",
          orderAmount,
          orderPoints,
          city,
          products: newTovar
        }
    
        // dispatch(pushOrders(newOrder))
    

        // записываю общее количество баллов

        if(currentUser) {
          const pointsTotal = pointsInOrders + orderPoints
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
