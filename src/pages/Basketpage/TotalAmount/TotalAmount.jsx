import checkWord from './checkWord';
import styles from './totalAmount.module.css';

// Компонент выводит общую сумму заказа и общую сумму баллов в корзине
export default function TotalAmount({ total, points }) {
  let outTag = null;
  if (total >= 3000) {
    outTag = (
      <p className={styles.points}>
        <span>
          Этот заказ принесет вам
          {' '}
          {points}
        </span>
        <span>{checkWord(points)}</span>
      </p>
    );
  } else {
    outTag = <p className={styles.points2}>При заказе от 3000 р. получите бонусные баллы</p>;
  }

  return (
    <div className={styles.totalAmount}>
      <span className={styles.text}>Итого:</span>
      <span className={styles.count}>
        {total}
        {' '}
        ₽
      </span>
      {outTag}
    </div>
  );
}
