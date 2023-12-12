import { useLocation } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function Searchpage() {
  const { state } = useLocation();

  return (
    <ul className="products">
      {state.map((item) => (
        <li key={item.id}>
          <ProductCard item={item} />
        </li>
      ))}
    </ul>
  );
}
