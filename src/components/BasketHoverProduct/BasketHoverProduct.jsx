import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RiDeleteBin2Line } from 'react-icons/ri';
import {
  changeCartProducts, deletion, calcAmount, calcPoints, calcPieces,
} from '../../Redux/slices/cartSlice';
import styles from './basketHoverProduct.module.css';

export default function BasketHoverProduct({ item }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const decrement = () => {
    dispatch(changeCartProducts({ ...item, count: -1 }));
    dispatch(calcAmount());
    dispatch(calcPoints());
    dispatch(calcPieces());
  };

  const increment = () => {
    dispatch(changeCartProducts({ ...item, count: 1 }));
    dispatch(calcAmount());
    dispatch(calcPoints());
    dispatch(calcPieces());
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
        <span>{item.title}</span>
      </td>
      <td className={styles.weight}>
        <span>{item.weightTitle}</span>
      </td>
      <td className={styles.productCount}>
        <button
          type="button"
          className={styles.counterButton}
          onClick={decrement}
        >
          -
        </button>
        <span className={styles.counter}>
          {item.count} шт
        </span>
        <button
          type="button"
          className={styles.counterButton}
          onClick={increment}
        >
          +
        </button>
      </td>
      <td className={styles.productTotal}>
        {item.packingDiscountPrice ? (
          <span>
            {+item.packingDiscountPrice * item.count} ₽
          </span>
        ) : (
          <span>
            {+item.packingPrice * item.count} ₽
          </span>
        )}
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
    </tr>
  );
}
