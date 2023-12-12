import { Link } from 'react-router-dom';
import './Category.css';

// Компонент карточки категории
export default function Category({ title, img, path }) {
  return (
    <Link to={`/${path}`} className="category">
      <img src={img} alt="" />
      <p>{title}</p>
    </Link>
  );
}
