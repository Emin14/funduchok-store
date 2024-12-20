// import { useLocation } from 'react-router-dom';
import { useLocation } from "react-router"
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Searchpage.module.css'

export default function Searchpage() {
  const { state } = useLocation();

  return (
    <ul className={styles.cards}>
      {state.map((item) => (
        <li key={item.id} className={styles.cardWrapper}>
          <ProductCard item={item} />
        </li>
      ))}
    </ul>
  );
}
