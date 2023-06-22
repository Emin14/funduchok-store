import React, { useEffect, useState } from 'react'
import currentTime from './date'
import  './DeliveryTime.css'

// Компонент вывода даты и времени ближайшей доставки
// Является дочерним для Header
export default function DeliveryTime() {

    const [date, setDate] = useState({
        month: '',
        day: '',
        dayofWeek: '',
        hours: '',
        monthString: '',
        dayofWeekString: '',
        deliveryHours: 0
    });

    useEffect(() => {
        setDate(currentTime())
      }, [])
      
    

  return (
    <div className='deliveryTime'>
        <span>Ближайшая доставка: </span>
        {date.dayofWeek  === 0
        ? <span >В понедельник</span>
        : date.hours > 15 
          ? <><span>{date.day + 1}</span> <span>{date.monthString}</span> <span> в 10.00 - 11.00</span></>
          : <span>{`${date.day} ${date.monthString} в ${date.deliveryHours}.00 - ${date.deliveryHours+1}.00`}</span>
        }
    </div>
  )
}
