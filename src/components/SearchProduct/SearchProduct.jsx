import { useState, useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Link, useNavigate } from "react-router"
import { useGetProductsQuery } from '../../Redux/services/productsApi';
import { getCategoryProductRoute} from '../../routes';
import styles from './searchProduct.module.css';

// Компонент поиска товаров
export default function SearchProduct({ active, setActive }) {
  const navigate = useNavigate();

  const [phrase, setPhrase] = useState('');
  const [find, setFind] = useState(null);

  const { data: allProducts=[] } = useGetProductsQuery();


  useEffect(() => {
    const findProducts = allProducts.filter((item) => (
      item.title.toLowerCase().includes(phrase.toLowerCase())
    ))

    setFind(findProducts);
  }, [phrase]);


  const navigateToSearchResults  = () => {
    const width = window.screen.width
    if (phrase) {
      navigate('/search', { state: find });
      setPhrase('');
    }
    if(width < 767.98) {
      setActive((prev) => !prev);
    }
  };

  const clearSearchPhrase  = () => {
    setPhrase('');
  };

  
  return (
<div
  className={
    active
      ? `${styles.searchContainer} ${styles.active}`
      : styles.searchContainer
  }
>
  <input
    type="text"
    className={styles.searchInput}
    value={phrase}
    onChange={(e) => setPhrase(e.target.value)}
  />
  <button
    type="button"
    className={styles.searchButton}
    onClick={navigateToSearchResults}
  >
    Поиск
  </button>
  <IoIosSearch
    className={styles.searchIcon}
    onClick={navigateToSearchResults}
  />

  {phrase && (
    <ul className={styles.resultsList}>
      {find.map((item) => (
        <li key={item.id} className={styles.resultsListItem}>
          <Link to={getCategoryProductRoute(item.category, item.id)} onClick={clearSearchPhrase}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  )}
</div>
  );
}
