import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../Redux/slices/cartSlice';
import Favorit from '../Favorit/Favorit'
import  data from '../PriceTable/weightAndkoef.json'
import { calcWeightProperties } from '../PriceTable/calcWeightProperties';
import './ProductCard.css'


// Компонент карточки товара
// Является дочерним для <Products /> или для <ProductsFound />
export default function ProductCard({ item, pathname }) {

  const {amountOfDiscount, weightAndkoef} = data

  const  [count, setCount ]= useState(1);

  const  [packaging, setPackaging]= useState({
    basePrice: 0,
    salePrice: 0,
    discountfor1Count: 0,
    discountfor1Count: 0,
    fasovka: '',
});

  useEffect(() => {
    setPackaging (calcWeightProperties(weightAndkoef[2].weight, item))
  }, [item])

  const dispatch = useDispatch();

  const selectedPackaging = (e) => {
    console.log(e)
    setCount(1)
    setPackaging (calcWeightProperties(e, item))
  }


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

  const handleSubmit = (e) => {
    const {discountfor1Count, pointfor1Count} = packaging
    e.preventDefault();
    dispatch(addProduct({...item,
        categoryPath: pathname, 
        ...packaging,
        totalDiscount : discountfor1Count * count,
        totalPoints : pointfor1Count * count,
        percentDiscount: amountOfDiscount,
        count: count,
    }))
  const notify = () => toast(`${item.title} ${count} шт по ${packaging.fasovka} добавлено в корзину`, {
      autoClose: 7000,
      });
  notify()
  }

  const classNameFavorit = {
    position: 'absolute',
    top: '6px',
    right: '8px'
  }

  return (
    <div className='productCard'>
        <Favorit item={item} classNameFavorit={classNameFavorit}/>
      <Link to={`/${pathname}/${item.id}`} className='productCard__link' >
        <img src={item.image} alt="" className='productCard__img' />
        <p className='productCard__title'>{item.title}</p>
      </Link>

      { packaging.salePrice ?
      <p className='productCard__price'>
        <span>{`${packaging.salePrice} ₽`}</span>
        <span className='productCard__oldPrice'>{`${packaging.basePrice} ₽`}</span>
      </p> :
      <p className='productCard__price'>
      <span>{`${packaging.basePrice} ₽`}</span>
      </p> }

      <ul className='productCard__list'>

            {weightAndkoef.map(item => 
              item.weight !== 0.025 && (
                  <li key={item.id} data-koef={item.koef} className={`productCard__item ${item.weight === packaging.fasovka ? 'activeWeight' : ''}`} onClick={() => selectedPackaging(item.weight)}>
                    {item.weight === 0.025 ? 'пробник' : item.weight === 1 ? '1 кг' : `${item.weight * 1000} гр`}
                  </li>)
            )}
      </ul>
      <div className='priceTable__count'>
        <button className='priceTable__count-btn-left' onClick={incrementCount}>-</button>
            <span className='priceTable__count-number'>{count}</span>
        <button className='priceTable__count-btn-right' onClick={decrementCount}>+</button>
        <button form="product" type='button' className='priceTable__basket-btn' onClick={handleSubmit}>В корзину</button>
      </div>

    </div>
  )
}
