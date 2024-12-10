import React, { useEffect, useState } from 'react';
import currentTime from './date';
import './DeliveryTime.css';

export default function DeliveryTime() {
  const [date, setDate] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    setDate(currentTime());
  }, []);

  useEffect(() => {
    if(!date) {
      return
    }

    if (date.dayofWeek === 0) {
      setDeliveryDate('В понедельник')
    } 
    else if (date.hours > 15) {
      setDeliveryDate(`${date.day + 1} ${date.monthString} в 10.00 - 11.00`)
  
    } 
    else {
      setDeliveryDate(`${date.day} ${date.monthString} в ${date.deliveryHours}.00 - ${date.deliveryHours + 1}.00`)
    }

  }, [date]);


  return (
    <div className="deliveryTime">
      <span>Ближайшая доставка: </span>
      <span>{deliveryDate}</span>
    </div>
  );
}
