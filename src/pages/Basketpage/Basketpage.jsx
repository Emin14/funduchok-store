import React from 'react'
import { useSelector} from 'react-redux';
import BasketProductItem from '../../components/BasketProductItem/BasketProductItem';
import './Basketpage.css'

// В Последней td значение (итоговая сумма товаров в корзине) скорее всего должна осуществляться через Redux, так
// как когда в этом компоненте меняю количество товаров в Header у иконки с корзинкой (<Basket />) не меняется сумма
// Пытался написать action подсчета суммы товаров в корзине, но не понял как, так как эта сумма является суммой по сути 
// разных BasketProductItem, а не одного какого то компонента

export default function Basketpage() {

    const tovar = useSelector((state) => state.product);

  return (
    <div>
      <table className='basketpage'>
        <caption>Корзина</caption>
        <tr className='basketpage__tr'>
         <th>Изображение</th>
         <th>Название</th>
         <th>Фасовка</th>
         <th>Количество</th>
         <th>Цена</th>
         <th>Сумма</th>
        </tr>
        {tovar.cart.map(item => (
        <BasketProductItem item={item}/>
        ))}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td className='basketpage__total'>
            {tovar.cart.reduce((accum, item) => {
              return accum + (+item.price * +item.count)
            }, 0)} ₽
          </td>
        </tr>

      </table>
      </div>
  )
}
