import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './favoritspage.module.css';

// Компонент страницы закладок
export default function Favorits() {
  const favorits = useSelector((state) => state.favorits.favorits);
  return (
    <div>
      <h3 className={styles.favorits}>Ваши закладки:</h3>
      <ul className={styles.list}>
        {favorits.map((item) => (
          <li key={item.id} className={styles.item}>
            <ProductCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
