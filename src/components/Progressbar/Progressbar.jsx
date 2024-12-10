import { Line } from 'rc-progress';
import './Progressbar.css';

// Является дочерним для <Basket />
// Компонент показывает прогрессбар до набора клиентом суммы минимального заказа
export default function Progressbar({ totalAmount, maxAmount }) {
  const percentAmount = (totalAmount / maxAmount) * 100;

  return (
    <Line percent={percentAmount} strokeWidth={2} trailWidth={1} strokeColor="#ffd944" trailColor="#eaedf6" className="progress" />
  );
}
