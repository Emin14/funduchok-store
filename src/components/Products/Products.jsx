import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useParams } from "react-router"
import ProductCard from '../ProductCard/ProductCard';
import Loader from '../Loader/Loader';
import getProducts from '../../utils.js/getProducts';
import styles from  './products.module.css';

// Компонент показывает определенные продукты в зависмости от того какая категория выбрана
export default function Products() {
  const [productsOfCategory, setProductsOfCategory] = useState(null);

  const params = useParams();

  useEffect(() => {
    getProducts(params.category)
      .then((data) => setProductsOfCategory(data));
  }, [params]);

  if (productsOfCategory) {
    return (
      <ul className={styles.cards}>
        {productsOfCategory.map((item) => (
          <li className={styles.cardWrapper}>
            <ProductCard key={item.id} item={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Loader />
  );
}
