import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../Redux/slices/productSlice';
import './PriceTable.css';

// Компонент для выбора фасовки и количества товара для добавления в корзину (желтый прямоугольник на странице с продуктом)
// При переходе между Input запускается функция valueReset которая обнуляет значение count, не знаю
// насколько это востребовано, на оригинальном сайте значения не обнуляются 
export default function PriceTable({product}) {

    const {price} = product
    const  [discount, setDiscount ]= useState(0)
    const  [points, setPoints ]= useState(0)
    const  [count, setCount ]= useState(0)

    const dispatch = useDispatch();

    const incrementCount = (e) => {
        e.preventDefault();
        if(count < 1) {
            setCount(0);
            return
        }
        setCount(count-1)
    }

    const decrementCount = (e) => {
        e.preventDefault();
        setCount(count+1)
    }

    // Подсчет баллов и скидки
    const amountOfDiscount = (e) => {
        const basePrice = +e.target.nextSibling.nextSibling.nextSibling.nextSibling.childNodes[0].data
        const salePrice = +e.target.nextSibling.childNodes[0].data
        const difference = basePrice - salePrice;
        const calcPoints = salePrice * 0.01
        setDiscount(difference);
        setPoints(calcPoints);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        for(const item of e.target) {
            if (item.checked) {
                dispatch(addProduct({...product, 
                    fasovka: item.nextSibling.nextSibling.nextSibling.childNodes[0].data,
                    count: count,
                    price: item.nextSibling.childNodes[0].data
                }));
            }
        }
    }

    // Вычисление Со скидкой цены в зависимости от фасовки
    const calcDiscountPrice = (val, koef) => {
        return (Math.round(((val*price)*koef) - ((val*price)*koef)*0.1))
    }

    // Вычисление Базовой цены в зависимости от фасовки
    const calcBasicPrice = (val, koef) => {
        return Math.round((val*price)*koef)
    }

    // Сброс выбранного количества товара при смене input-a
    const valueReset = () =>  {
        setCount(0)
    }

  return (
    <form  className='priceTable' onChange={amountOfDiscount} onSubmit={handleSubmit}>
        <label htmlFor="" className='priceTable__label'>
            <input type="radio" name="options[packaging]" value="100" onChange={valueReset}></input>
            <span>{calcDiscountPrice(0.1, 1.7)} руб.</span> <span className='priceTable__weight'>/ 100 гр </span> 
            <span className='priceTable__undiscounted'>{calcBasicPrice(0.1, 1.7)} руб.</span>
        </label>
        <label htmlFor="" className='priceTable__label'>
            <input type="radio" name="options[packaging]" value="250" onChange={valueReset}></input>
            <span>{calcDiscountPrice(0.25, 1.25)} руб.</span> <span className='priceTable__weight'>/ 250 гр </span> 
            <span className='priceTable__undiscounted'>{calcBasicPrice(0.25, 1.25)} руб.</span>
        </label>
        <label htmlFor="" className='priceTable__label'>
            <input type="radio" name="options[packaging]" value="500" onChange={valueReset}></input>
            <span>{calcDiscountPrice(0.5, 1.05)} руб.</span> <span className='priceTable__weight'>/ 0.5 кг </span> 
            <span className='priceTable__undiscounted'>{calcBasicPrice(0.5, 1.05)} руб.</span>
        </label>
        <label htmlFor="" className='priceTable__label'>
            <input type="radio" name="options[packaging]" value="750" onChange={valueReset}></input>
            <span>{calcDiscountPrice(0.75, 1.1)} руб.</span> <span className='priceTable__weight'>/ 750 гр </span> 
            <span className='priceTable__undiscounted'>{calcBasicPrice(0.75, 1.1)} руб.</span>
        </label>
        <label htmlFor="" className='priceTable__label'>
            <input type="radio" name="options[packaging]" value="1000" onChange={valueReset}></input>
            <span>{calcDiscountPrice(1, 1)} руб.</span> <span className='priceTable__weight'>/ 1000 гр </span> 
            <span className='priceTable__undiscounted'>{price} руб.</span>
        </label>
        <label htmlFor="" className='priceTable__label'>
            <input type="radio" name="options[packaging]" value="25" onChange={valueReset}></input>
            <span>{calcDiscountPrice(0.025, 1.85)} руб.</span> <span className='priceTable__weight'>/ пробник </span> 
            <span className='priceTable__undiscounted'>{calcBasicPrice(0.025, 1.85)} руб.</span>
        </label>
        <p>Скидка: {discount} руб. (10%)</p>
        <p>До конца акции: </p>
        <p  className='priceTable__delivery'>Доставка по Москве в течении 1 дня.
        Бесплатная доставка при заказе от 4000 руб. по Москве в пределах МКАД.</p>
        <div className='priceTable__counter'>
            <button className='priceTable__count-btn-left' onClick={incrementCount}>-</button>
            <span className='priceTable__count-number'>{count}</span>
            <button className='priceTable__count-btn-right' onClick={decrementCount}>+</button>

            <button type='submit' className='priceTable__basket-btn' >В корзину</button>
        </div>
        <p className='priceTable__discount-info'>Эта покупка принесет вам до <span className='priceTable__bonus-note'>{Math.ceil(points *count)} руб. на бонусный счёт</span> при заказе от 3000 руб. </p>
    </form>
    
  )
}