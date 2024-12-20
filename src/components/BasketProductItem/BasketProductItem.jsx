import { useState } from 'react';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { RiDeleteBin2Line } from 'react-icons/ri';
import {
  changeCartProducts, deletion, calcAmount, calcPoints, calcPieces,
} from '../../Redux/slices/cartSlice';
import { getCategoryProductRoute } from '../../routes';
import styles from './basketProductItem.module.css';

export default function BasketProductItem({ item }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleQuantityChange = (type, e) => {
    const countChange = type === 'increment' ? 1 : -1;
    dispatch(changeCartProducts({ ...item, count: countChange }));
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
      className={styles.productRow}
      onMouseOver={() => setShow(true)}
      onFocus={() => setShow(true)}
      onMouseOut={() => setShow(false)}
      onBlur={() => setShow(false)}
    >
      <td className={styles.productImage}>
        <img src={item.image} alt="" />
      </td>
      <td className={styles.productTitle}>
        <Link to={getCategoryProductRoute(item.category, item.id)}>{item.title}</Link>
      </td>
      <td className={styles.weight}>
        <span>{item.weightTitle}</span>
      </td>
      <td className={styles.productCount}>
        <button
          type="button"
          className={styles.countButton}
          onClick={(e) => handleQuantityChange('decrement', e)}
        >
          -
        </button>
        <span className={styles.counter}>{item.count} шт</span>
        <button
          type="button"
          className={styles.countButton}
          onClick={(e) => handleQuantityChange('increment', e)}
        >
          +
        </button>
      </td>
      <td className={styles.basePrice}>
        <span className={styles.basePriceCount}>{item.packingPrice} ₽</span>
        {item.percentDiscount && (
          <span className={styles.discountTag}>{`-${item.percentDiscount * 100} %`}</span>
        )}
      </td>
      <td className={styles.salePrice}>
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
      <td className={styles.productTotal}>
        {item.packingDiscountPrice
          ? `${+item.packingDiscountPrice * item.count} ₽`
          : `${+item.packingPrice * item.count} ₽`}
        {show && (
          <span
            className={styles.deleteIcon}
            onClick={deleteProduct}
            onKeyDown={deleteProduct}
            role="presentation"
          >
            <RiDeleteBin2Line />
          </span>
        )}
      </td>
      <td className={styles.deleteIconMobile}>
        <div onClick={deleteProduct} onKeyDown={deleteProduct} role="presentation">
          <RiDeleteBin2Line />
        </div>
      </td>
    </tr>
  );
}
