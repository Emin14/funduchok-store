import './PriceTable.css';

// Компонент для выбора фасовки и количества товара для добавления в
// корзину (желтый прямоугольник на странице с продуктом)
export default function PriceTable({
  packing, handleChange, handleSubmit, currentPackage, count, incrementCount, decrementCount,
}) {
  if (packing) {
    return (
      <div className="priceTable">
        <form id="product" onChange={handleChange} onSubmit={handleSubmit}>
          {packing.map((item, index) => (
            <label key={item.id} htmlFor={index} className="priceTable__label">
              <input
                type="radio"
                id={index}
                className="priceTable__input"
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
              <span className="priceTable__weight">
                /
                {' '}
                {item.title}
              </span>
              <span className="priceTable__undiscounted">
                {item.packingPrice}
                {' '}
                руб.
              </span>
            </label>
          ))}
        </form>
        <div className="ada">
        <div className="priceTable__discount">
          <p>
            <span>Скидка:</span>
            <span className="priceTable__discount_text">
              {packing[currentPackage].packingDiscount * count}
              {' '}
              руб. (10%)
            </span>
          </p>
        </div>
        <p className="priceTable__delivery">
          Доставка по Москве в течении 1 дня.
          Бесплатная доставка при заказе от 4000 руб. по Москве в пределах МКАД.
        </p>
        <div className="priceTable__counter_wrapper">
          <div className="priceTable__counter">
            <button type="button" className="priceTable__count-btn-left" onClick={incrementCount}>-</button>
            <span className="priceTable__count-number">{count}</span>
            <button type="button" className="priceTable__count-btn-right" onClick={decrementCount}>+</button>
          </div>
          <button form="product" type="submit" className="priceTable__basket-btn">В корзину</button>
        </div>
        <p className="priceTable__discount-info">
          Эта покупка принесет вам до
          {' '}
          {' '}
          <span className="priceTable__bonus-note">
            {Math.ceil(packing[currentPackage].packingPoint * count)}
            {' '}
            руб. на бонусный счёт
          </span>
          {' '}
          {' '}
          при заказе от 3000 руб.
        </p>
        </div>
      </div>
    );
  }
}
