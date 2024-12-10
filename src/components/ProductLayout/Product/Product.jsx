// import { Link } from 'react-router-dom';
import { Link } from "react-router"
import PriceTable from '../PriceTable/PriceTable';
import ProductProperties from '../ProductProperties/ProductProperties';
import Favorit from '../../Favorit/Favorit';
import Loader from '../../Loader/Loader';

import './Product.css';

import { advantages } from '../constans';

// Компонент товара
export default function Product({
  product, categoryObj, isFavorite, handleClick, packing, handleChange, handleSubmit,
  currentPackage, count, incrementCount, decrementCount, blocks, block, selectBlock,
}) {
  if (product) {
    return (
      <>
        <ul className="product__bread-crumbs">
          <li><Link to="/">Главная  </Link></li>
          <li>
            <Link to={`/${categoryObj.pathname}`}>
              {categoryObj.title}
              {' '}
            </Link>
          </li>
          <li><span>{product.title}</span></li>
        </ul>
        <h1 className="product__title">{product.title}</h1>
        <div className="product-wrapper">
          <ul className="advantages">
            {advantages.map(({ title, icon }) => (
              <li key={title} className="advantages__list_item">
                {icon}
                <p className="advantages__text">{title}</p>
              </li>
            ))}
          </ul>
          <div className="product">
            {/* Можно было бы реализовать не стал заморачиваться
          <p className='product__statistics'>
            <span>10 отзывов</span>
            <span>купили 15095 раз</span>
          </p> */}
            <div className="advantages__favorit" onClick={handleClick} onKeyDown={handleClick} role="presentation">
              <Favorit item={product} isFavorite={isFavorite} text />
            </div>
            <img src={product.image} alt="" />
          </div>
          <PriceTable
            product={product}
            category={categoryObj}
            packing={packing}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            currentPackage={currentPackage}
            count={count}
            incrementCount={incrementCount}
            decrementCount={decrementCount}
          />
        </div>
        <ProductProperties
          description={product.description}
          block={block}
          blocks={blocks}
          selectBlock={selectBlock}
        />
      </>
    );
  }

  return (
    <Loader />
  );
}
