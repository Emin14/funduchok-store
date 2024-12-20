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
    if (!date) return;

    const { dayofWeek, hours, day, monthString, deliveryHours } = date;

    let calculatedDeliveryDate;

    if (dayofWeek === 0) {
      calculatedDeliveryDate = 'В понедельник';
    } else if (hours > 15) {
      calculatedDeliveryDate = `${day + 1} ${monthString} в 10.00 - 11.00`;
    } else {
      calculatedDeliveryDate = `${day} ${monthString} в ${deliveryHours}.00 - ${deliveryHours + 1}.00`;
    }

    setDeliveryDate(calculatedDeliveryDate);
  }, [date]);

  return (
    <>
      <span className={styles.deliveryText}>Ближайшая доставка: </span>
      <span className={styles.deliveryDate}>{deliveryDate}</span>
    </>
  );
}