import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './SearchProduct.css';

// Компонент поиска товаров
export default function SearchProduct() {
  const navigate = useNavigate();

  const [phrase, setPhrase] = useState('');

  // const {data} = useProductsSearchQuery(phrase);

  const allProducts = useSelector((state) => state.products.products);
  const [find, setFind] = useState(null);

  useEffect(() => {
    const findProducts = allProducts.filter((item) => (
      item.title.toLowerCase().includes(phrase.toLowerCase())
    ));
    setFind(findProducts);
  }, [phrase, allProducts]);

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

  return (
    <div className="searchProduct">
      <input type="text" className="searchProduct__input" value={phrase} onChange={(e) => setPhrase(e.target.value)} />
      <button type="button" className="button yellow-text searchProduct_btn" onClick={handleClick}>Поиск</button>

      {phrase
        && (
        <ul className="searchProduct__list">
          {find.map((item) => (
            <li key={item.id} className="searchProduct__list_item">
              <Link to={`${item.category}/${item.id}`} onClick={() => setPhrase('')}>{item.title}</Link>
            </li>
          ))}
        </ul>
        )}
    </div>
  );
}
