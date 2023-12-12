import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import getProducts from '../../utils.js/getProducts';
import './Products.css';

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
      <div className="products">
        {productsOfCategory.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    );
  }
}
