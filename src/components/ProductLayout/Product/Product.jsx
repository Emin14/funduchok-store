import { Link } from "react-router";
import PriceTable from '../PriceTable/PriceTable';
import ProductProperties from '../ProductProperties/ProductProperties';
import Favorit from '../../Favorit/Favorit';
import Loader from '../../Loader/Loader';
import { advantages } from '../constans';
import { getCategoryProductRoute } from '../../../routes';
import styles from './Product.module.css';

export default function Product({
  product, categoryObj, isFavorite, handleClick, packing, handleChange, handleSubmit,
  currentPackage, count, incrementCount, decrementCount, blocks, block, selectBlock,
}) {
  if (product) {
    return (
      <>
        <ul className={styles.breadCrumbs}>
          <li><Link to="/">Главная</Link></li>
          <li>
            <Link to={getCategoryProductRoute(categoryObj.pathname)}>
              {categoryObj.title}
            </Link>
          </li>
          <li><span>{product.title}</span></li>
        </ul>


        <h1 className={styles.productTitle}>{product.title}</h1>


        <div className={styles.productWrapper}>

          <ul className={styles.advantages}>
            {advantages.map(({ title, icon }) => (
              <li key={title} className={styles.advantagesItem}>
                {icon}
                <p className={styles.advantagesText}>{title}</p>
              </li>
            ))}
          </ul>


          <div className={styles.product}>
            <div
              className={styles.favoritButton}
              onClick={handleClick}
              onKeyDown={handleClick}
              role="presentation"
            >
              <Favorit item={product} isFavorite={isFavorite} text />
            </div>
            <img src={product.image} alt={product.title} className={styles.productImage} />
          </div>

          {/* Таблица цен */}
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

        {/* Свойства продукта */}
        <ProductProperties
          description={product.description}
          block={block}
          blocks={blocks}
          selectBlock={selectBlock}
        />
      </>
    );
  }

  // Лоадер, если продукт не загружен
  return (
    <Loader />
  );
}
