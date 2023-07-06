import React, {useEffect, useState} from 'react'
import axios from '../../axios'
import './CompletedOrder.css'


// Откуда берется orders.totalAmount
// orders.orderspoints проверить
export default function CompletedOrder() {

    const noLoginUser = JSON.parse(localStorage.getItem('noLoginUser'))

    // Получаем текущего юзера из redux
    const [orders, setOrders] = useState({
        datе: '',
        id: '',
        orderPoints: 0,
        products: [],
        orderAmount: 0
    })

    const [status, setStatus] = useState('notProcessed')
    const currentUser = JSON.parse(localStorage.getItem('user'))

    const getOrders = async() => {
        let lastOrders = ''
        if(currentUser) {
            const  currentUserServer  = await axios.get(`users/${currentUser.id}`);
            lastOrders = await currentUserServer.data.orders.at(-1)
        }
        else {
            const  notLoginOrders  = await axios.get(`notLoginOrders`);
            lastOrders = await notLoginOrders.data.filter(item => item.phone === noLoginUser.phone && item.name.toUpperCase() === noLoginUser.name.toUpperCase()).at(-1)
        }

        if (lastOrders) {
            setOrders(lastOrders)
            switch (lastOrders.status) {
                case 'notProcessed':
                    setStatus( 'Заказ еще не обработан' );
                    break;
                case 'orderIsCollected':
                    setStatus( 'Заказ собирают' );
                    break;
                case 'orderOnTheWay':
                    setStatus( 'Заказ в пути' );
                    break;
                case 'orderDelivered':
                    setStatus( 'Заказ доставлен' );
                    break;
              }
        }
      }
  
    useEffect(() => {
        getOrders()
    }, [])


    if(orders.id) {
        return (
            <div>
                <h3>Ваш заказ оформлен:</h3>
                <table className='completedOrder__table'>
                    <tbody>
                        <tr>
                            <th>Название</th>
                            <th>Фасовка</th>
                            <th>Количество</th>
                            <th>Цена</th>
                            <th>Сумма</th>
                        </tr>
                        {orders.products.map(item => (
                            <tr key={`${item.id}-${item.fasovka}`} className='ada'>
                                <td><span>{item.title} </span></td>
                                <td><span>{item.fasovka * 1000} гр.</span></td>
                                <td>
                                  <span>{item.count} шт.</span>
                                </td>
                                <td> 
                                    {item.salePrice
                                    ? <span >{item.salePrice} ₽</span>
                                    : <span >{item.basePrice} ₽</span>}
                                </td>
                                <td> 
                                    {item.salePrice
                                    ? <span>{+item.salePrice * item.count} ₽</span>
                                    :  <span>{+item.basePrice * item.count} ₽</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {currentUser && 
                    <div>
                        <span>Статус вашего заказа: </span><span>{status}</span>
                    </div>
                }
                <div>
                    <span>Общая сумма заказа:</span><span> {orders.orderAmount} рублей</span>
                </div>
                {currentUser && 
                    <div>
                        <span>Начислено балллов:</span><span> {orders.orderPoints}</span>
                    </div>
                }
                <div>
                    <span>Город доставки:</span><span> {orders.city}</span>
                </div>
            </div>
          )
    }

    else {
        return (
        <h3>У вас нету оформленного заказа</h3>
        )
    }

}
