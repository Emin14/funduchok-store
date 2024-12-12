import React, { useEffect, useState } from 'react';
import currentTime from './date';
import styles from './deliveryTime.module.css';

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
    <>
      <span className={styles.text}>Ближайшая доставка: </span>
      <span className={styles.date}>{deliveryDate}</span>
    </>
  );
}
