import { useLocation } from "react-router"
import styles from './completedOrder.module.css';


export default function CompletedOrder() {
  const { state } = useLocation();

  if (state) {
    return (
      <div>
        <h3>Ваш заказ оформлен:</h3>
        <table className={styles.completedOrder}>
          <tbody>
            <tr>
              <th>Название</th>
              <th>Фасовка</th>
              <th>Количество</th>
              <th>Цена</th>
              <th>Сумма</th>
            </tr>
            {state.products.map((item) => (
              <tr key={`${item.id}-${item.weight}`} className={styles.dataRows}>
                <td>{item.title}</td>
                <td>{item.weightTitle}</td>
                <td>
                  {item.count}
                  {' '}
                  шт
                </td>
                <td>
                  {item.packingDiscountPrice
                    ? `${item.packingDiscountPrice} ₽`
                    : `${item.packingPrice} ₽`}
                </td>
                <td>
                  {item.packingDiscountPrice
                    ? `${+item.packingDiscountPrice * item.count} ₽`
                    : `${+item.packingPrice * item.count} ₽`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <span>Статус вашего заказа: </span>
          <span>{state.status}</span>
        </div>
        <div>
          <span>Общая сумма заказа: </span>
          <span>
            {state.orderAmount}
            {' '}
            рублей
          </span>
        </div>
        <div>
          <span>Начислено балллов: </span>
          <span>{state.orderPoint}</span>
        </div>
        <div>
          <span>Город доставки: </span>
          <span>{state.city}</span>
        </div>
      </div>
    );
  }

  return (
    <h3>У вас нету оформленного заказа</h3>
  );
}
