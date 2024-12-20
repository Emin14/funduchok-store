import styles from './priceTable.module.css';

export default function PriceTable({
  packing, handleChange, handleSubmit, currentPackage, count, incrementCount, decrementCount,
}) {
  if (packing) {
    return (
      <div className={styles.priceTable}>
        <form id="product" onChange={handleChange} onSubmit={handleSubmit}>
          {packing.map((item, index) => (
            <label key={item.id} htmlFor={index} className={styles.priceLabel}>
              <input
                type="radio"
                id={index}
                className={styles.priceInput}
                name="options[packaging]"
                value={item.weight}
                data-koef={item.koef}
                defaultChecked={item.weight === 0.5}
              />
              <span>
                {item.packingDiscountPrice}
                {' '}
                руб.
              </span>
              <span className={styles.productWeight}>
                /
                {' '}
                {item.title}
              </span>
              <span className={styles.undiscountedPrice}>
                {item.packingPrice}
                {' '}
                руб.
              </span>
            </label>
          ))}
        </form>
        <div className={styles.information}>
          <div className={styles.discountText}>
            <p>
              <span>Скидка:</span>
              <span className={styles.discountTextGreen}>
                {packing[currentPackage].packingDiscount * count}
                {' '}
                руб. (10%)
              </span>
            </p>
          </div>
          <p className={styles.deliveryInfo}>
            Доставка по Москве в течении 1 дня.
            Бесплатная доставка при заказе от 4000 руб. по Москве в пределах МКАД.
          </p>
          <div className={styles.counterWrapper}>
            <div className={styles.counter}>
              <button type="button" className={styles.countButtonLeft} onClick={incrementCount}>-</button>
              <span className={styles.countNumber}>{count}</span>
              <button type="button" className={styles.countButtonRight} onClick={decrementCount}>+</button>
            </div>
            <button form="product" type="submit" className={styles.addToBasketButton}>В корзину</button>
          </div>
          <p className={styles.discountInfo}>
            Эта покупка принесет вам до
            {' '}
            <span className={styles.bonusNote}>
              {Math.ceil(packing[currentPackage].packingPoint * count)}
              {' '}
              руб. на бонусный счёт
            </span>
            {' '}
            при заказе от 3000 руб.
          </p>
        </div>
      </div>
    );
  }
}
