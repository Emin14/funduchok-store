import './CompletedOrder.css';
import { useLocation } from 'react-router-dom';

export default function CompletedOrder() {
  const { state } = useLocation();

  if (state) {
    return (
      <div>
        <h3>Ваш заказ оформлен:</h3>
        <table className="completedOrder__table">
          <tbody>
            <tr>
              <th>Название</th>
              <th>Фасовка</th>
              <th>Количество</th>
              <th>Цена</th>
              <th>Сумма</th>
            </tr>
            {state.products.map((item) => (
              <tr key={`${item.id}-${item.weight}`} className="ada">
                <td>
                  <span>
                    {item.title}
                    {' '}
                  </span>
                </td>
                <td><span>{item.weightTitle}</span></td>
                <td>
                  <span>
                    {item.count}
                    {' '}
                    шт.
                  </span>
                </td>
                <td>
                  {item.packingDiscountPrice
                    ? (
                      <span>
                        {item.packingDiscountPrice}
                        {' '}
                        ₽
                      </span>
                    )
                    : (
                      <span>
                        {item.packingPrice}
                        {' '}
                        ₽
                      </span>
                    )}
                </td>
                <td>
                  {item.packingDiscountPrice
                    ? (
                      <span>
                        {+item.packingDiscountPrice * item.count}
                        {' '}
                        ₽
                      </span>
                    )
                    : (
                      <span>
                        {+item.packingPrice * item.count}
                        {' '}
                        ₽
                      </span>
                    )}
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
          <span>Общая сумма заказа:</span>
          <span>
            {' '}
            {state.orderAmount}
            {' '}
            рублей
          </span>
        </div>
        <div>
          <span>Начислено балллов:</span>
          <span>
            {' '}
            {state.orderPoint}
          </span>
        </div>
        <div>
          <span>Город доставки:</span>
          <span>
            {' '}
            {state.city}
          </span>
        </div>
      </div>
    );
  }

  return (
    <h3>У вас нету оформленного заказа</h3>
  );
}
