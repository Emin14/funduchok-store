import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { changeCartProducts, calcPoints, calcAmount, calcPieces } from '../../Redux/slices/cartSlice';
import Favorit from '../Favorit/Favorit'
import { calcWeightProperties } from '../ProductLayout/calcWeightProperties';
import './ProductCard.css'
import { togleFavorit } from '../../Redux/slices/favoritsSlice'
import { notify } from '../../utils.js/notify';
import {amountOfDiscount, weightAndkoef} from '../ProductLayout/constans'
import {calcPackaging} from '../../utils.js/calcPackaging'


// Компонент карточки товара
// Является дочерним для <Products /> или для <ProductsFound />
export default function ProductCard({item}) {

  const  [count, setCount ]= useState(1);
  const [currentPackage, setCurrentPackage] = useState(3);

  const [packing, setPacking] = useState(null);


  // useEffect(() => {
  //   setPackaging (calcWeightProperties(weightAndkoef[2].weight, item))
  // }, [item])

  useEffect(() => {
    if (item) {
        const packagingArray = calcPackaging(weightAndkoef, item, amountOfDiscount)
        setPacking(packagingArray)
    }
}, [item])


  const dispatch = useDispatch();

  // const selectedPackaging = (e) => {
  //   console.log(e)
  //   setCount(1)
  //   setPackaging (calcWeightProperties(e, item))
  // }


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
    e.preventDefault();
    const packaging = packing[currentPackage-1]
    const {packingDiscount, packingPoint, title: weightTitle } = packaging
    const { id, title } = item
    dispatch(changeCartProducts(
      {
          ...item,
          ...packaging,
          id,
          title,
          weightTitle,
          totalDiscount: packingDiscount * count,
          percentDiscount: amountOfDiscount,
          count,
      }));
    dispatch(calcAmount())
    dispatch(calcPoints())
    dispatch(calcPieces())
  notify(item.title, packaging.title, count)
  }


  const favorits = useSelector(state => state.favorits.favorits)
  const [isFavorite, setIsFavorite] = useState(false) 

  const addFavorit = () => {
      dispatch(togleFavorit(item))
    }

    useEffect(() => {
      localStorage.setItem('favorits', JSON.stringify(favorits))
      const find = favorits.some(el => el.id === item.id)
      setIsFavorite(find)
    }, [favorits])

    const handleClick = (id) => {
      setCount(1)
      setCurrentPackage(id)
  }

    if(packing) {
  return (
    <div className='productCard'>
        <div className='favorit'  onClick={addFavorit}>
          <Favorit item={item} isFavorite={isFavorite}/>
        </div>
      <Link to={`/${item.category}/${item.id}`} className='productCard__link' >
        <img src={item.image} alt="" className='productCard__img' />
        <p className='productCard__title'>{item.title}</p>
        <p className='productCard__price'>
          {packing[currentPackage-1].packingDiscountPrice && <span>{`${packing[currentPackage-1].packingDiscountPrice} ₽`}</span>}
          <span className='productCard__oldPrice'>{`${packing[currentPackage-1].packingPrice} ₽`}</span>
        </p> 
      </Link>

      <ul className='productCard__list'>
          {packing.map(item => 
              item.weight !== 0.025 && (
              <li key={item.id} data-koef={item.koef} className={`productCard__item ${item.id === currentPackage ? 'activeWeight' : ''}`} onClick={() => handleClick(item.id)}>
                {item.title}
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
}
