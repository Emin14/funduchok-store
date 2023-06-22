import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../Redux/slices/cartSlice';
import './PriceTable.css';
import  data from './weightAndkoef.json'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { calcWeightProperties, calcDiscountPrice, calcBasicPrice } from './calcWeightProperties';

// Компонент для выбора фасовки и количества товара для добавления в корзину (желтый прямоугольник на странице с продуктом)
export default function PriceTable({product, category}) {

    // Получаем размер скидки и фасовку, коэффициент надбавки к цене
   const {amountOfDiscount, weightAndkoef} = data

    const dispatch = useDispatch();

    const  [count, setCount ]= useState(1);

    useEffect(() => {
        setPackaging (calcWeightProperties(weightAndkoef[2].weight, product))
    }, [product])

    const  [packaging, setPackaging]= useState({
        basePrice: 0,
        salePrice: 0,
        discountfor1Count: 0,
        discountfor1Count: 0,
        fasovka: '',
    });


    const incrementCount = (e) => {
        e.preventDefault();
        if(count < 2) {
            setCount(1);
            return
        }
        setCount(count-1)
    }
    const decrementCount = (e) => {
        e.preventDefault();
        setCount(count+1)
    }


    const selectedPackaging = (e) => {
        setCount(1)
        setPackaging (calcWeightProperties(e.target.value, product))
    }

    const handleSubmit = (e) => {
        const {discountfor1Count, pointfor1Count} = packaging
        e.preventDefault();
        dispatch(addProduct({...product,
            categoryPath: category.pathname, 
            ...packaging,
            totalDiscount : discountfor1Count * count,
            totalPoints : pointfor1Count * count,
            percentDiscount: amountOfDiscount,
            count: count,
        }))
        const notify = () => toast(`${product.title} ${count} шт по ${packaging.fasovka} добавлено в корзину`, {
            autoClose: 2000,
            });
        notify()
    }


  return (
    <div className='priceTable'>
        <form id='product'   onChange={selectedPackaging} onSubmit={handleSubmit}>
            {weightAndkoef.map(item => (
                <label key={item.id} className='priceTable__label'>
                <input type="radio" name="options[packaging]" value={item.weight} data-koef={item.koef} defaultChecked={item.weight === 0.5 ? true : false}></input>
                <span>{calcDiscountPrice(item, product)} руб.</span> <span className='priceTable__weight'> / {item.weight === 0.025 ? 'пробник' : `${item.weight * 1000} гр`}  </span> 
                <span className='priceTable__undiscounted'>{calcBasicPrice(item, product)} руб.</span>
                </label>
            ))}
        </form>
            <div className='priceTable__discount'>
                <p> <span>Скидка:</span><span className='priceTable__discount_text'>{packaging.discountfor1Count * count} руб. (10%)</span></p>
                <p>До конца акции: </p>
            </div>
            <p  className='priceTable__delivery'>Доставка по Москве в течении 1 дня.
            Бесплатная доставка при заказе от 4000 руб. по Москве в пределах МКАД.</p>
            <div className='priceTable__counter'>
                <button className='priceTable__count-btn-left' onClick={incrementCount}>-</button>
                <span className='priceTable__count-number'>{count}</span>
                <button className='priceTable__count-btn-right' onClick={decrementCount}>+</button>

                <button form="product" type='submit' className='priceTable__basket-btn' >В корзину</button>
            </div>
            <p className='priceTable__discount-info'>Эта покупка принесет вам до <span className='priceTable__bonus-note'>{Math.ceil(packaging.pointfor1Count * count)} руб. на бонусный счёт</span> при заказе от 3000 руб. </p>
        </div>
  )
}