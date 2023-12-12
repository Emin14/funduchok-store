import checkWord from './checkWord';
import './TotalAmount.css';

// Компонент выводит общую сумму заказа и общую сумму баллов в корзине
export default function TotalAmount({ total, points }) {
  let outTag = null;
  if (total >= 3000) {
    outTag = (
      <p className="total-amount__points">
        <span>
          {' '}
          Этот заказ принесет вам
          {points}
        </span>
        <span>{checkWord(points)}</span>
      </p>
    );
  } else {
    outTag = <p className="total-amount__points2">При заказе от 3000 р. получите бонусные баллы</p>;
  }

  return (
    <div className="total-amount">
      <span className="total-amount_text">Итого:</span>
      <span className="total-amount_count">
        {total}
        {' '}
        ₽
      </span>
      {outTag}
    </div>
  );
}
