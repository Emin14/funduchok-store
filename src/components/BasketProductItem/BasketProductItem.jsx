import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Link } from "react-router"
import { useDispatch } from 'react-redux';
import { RiDeleteBin2Line } from 'react-icons/ri';
import {
  changeCartProducts, deletion, calcAmount, calcPoints, calcPieces,
} from '../../Redux/slices/cartSlice';
import './BasketProductItem.css';

// Компонент карточки товара в корзине
export default function BasketProductItem({ item }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const decrement = (e) => {
    dispatch(changeCartProducts({ ...item, count: -1 }));
    dispatch(calcAmount());
    dispatch(calcPoints());
    dispatch(calcPieces());

    e.preventDefault();
  };

  const increment = (e) => {
    dispatch(changeCartProducts({ ...item, count: 1 }));
    dispatch(calcAmount());
    dispatch(calcPoints());
    dispatch(calcPieces());

    e.preventDefault();
  };

  const deleteProduct = () => {
    dispatch(deletion(item));
    dispatch(calcAmount());
    dispatch(calcPoints());
    dispatch(calcPieces());
  };

  return (
    <tr
      className="basketProductItem__tr"
      onMouseOver={() => setShow(true)}
      onFocus={() => setShow(true)}
      onMouseOut={() => setShow(false)}
      onBlur={() => setShow(false)}
    >
      <td className="basketProductItem__image"><img src={item.image} alt="" /></td>
      <td className="basketProductItem__title">
        <Link to={`/${item.category}/${item.id}`}>{item.title}</Link>
      </td>
      <td className="basketProductItem__fasovka"><span>{item.weightTitle}</span></td>
      <td className="basketProductItem__count">
        <button type="button" className="basketProductItem__count-btn-right" onMouseUp={decrement} onTouchEnd={decrement}>-</button>
        <span className="basketProductItem__counter">
          {item.count}
          {' '}
          шт
        </span>
        <button type="button" className="basketProductItem__count-btn-left" onMouseUp={increment} onTouchEnd={increment}>+</button>
      </td>
      <td className="basketProductItem__baseprice">
        <span className="basketProductItem__baseprice_count">
          {item.packingPrice}
          {' '}
          ₽
        </span>
        {item.percentDiscount
          && <span className="basketProductItem__baseprice_discountPercentage">{`-${item.percentDiscount * 100} %`}</span>}
      </td>
      <td className="basketProductItem__saleprice">
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
      <td className="basketProductItem__total">
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
        {show
        && (
        <span className="basketProductItem__RiDeleteBin2Line" onClick={deleteProduct} onKeyDown={deleteProduct} role="presentation">
          <RiDeleteBin2Line />
        </span>
        )}
      </td>
      <td className="basketProductItem__RiDeleteBin2Line2">
        <div className="chern3" onClick={deleteProduct} onKeyDown={deleteProduct} role="presentation">
          <RiDeleteBin2Line />
        </div>
      </td>
    </tr>
  );
}
