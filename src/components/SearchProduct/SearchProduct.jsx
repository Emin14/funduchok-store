import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IoIosSearch } from 'react-icons/io';
// import { Link, useNavigate } from 'react-router-dom';
import { Link, useNavigate } from "react-router"
import './SearchProduct.css';
import { useGetProductsQuery } from '../../Redux/services/productsApi';

// Компонент поиска товаров
export default function SearchProduct({ active, setActive }) {
  const navigate = useNavigate();

  const [phrase, setPhrase] = useState('');

  // const {data} = useProductsSearchQuery(phrase);

  // const allProducts = useSelector((state) => state.products.products);
  const { data: allProducts=[], error, isLoading, isError } = useGetProductsQuery();
  const [find, setFind] = useState(null);

  useEffect(() => {
    const findProducts = allProducts.filter((item) => (
      item.title.toLowerCase().includes(phrase.toLowerCase())
    ));
    setFind(findProducts);
    // }, []);
  }, [phrase]);

  // useEffect(() => {
  //   dispatch(searchProduct({
  //     phrase,
  //     begin: true
  //   }))
  // }, [phrase])

  // dispatch(searchProduct(phrase))

  const handleClick = () => {
    // dispatch(searchButton(true))
    // dispatch(searchProduct(phrase))
    navigate('/search', { state: find });
    setPhrase('');
  };

  const handleClick2 = () => {
    if (phrase) {
      navigate('/search', { state: find });
      setPhrase('');
    }
    setActive((prev) => !prev);
  };

  const handleClick3 = () => {
    setPhrase('');
  };

  return (
    <div className={active ? ['header__search', 'active'].join(' ') : 'header__search'}>
      <input type="text" className="searchProduct__input" value={phrase} onChange={(e) => setPhrase(e.target.value)} />
      <button type="button" className="searchProduct_btn" onClick={handleClick}>Поиск</button>
      <IoIosSearch className="IoIosSearch" onClick={handleClick2} />

      {phrase
        && (
        <ul className="searchProduct__list">
          {find.map((item) => (
            <li key={item.id} className="searchProduct__list_item">
              <Link to={`${item.category}/${item.id}`} onClick={handleClick3}>{item.title}</Link>
            </li>
          ))}
        </ul>
        )}
    </div>
  );
}
