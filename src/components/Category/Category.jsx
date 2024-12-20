import { Link } from "react-router";
import { getCategoryProductRoute } from '../../routes';
import styles from "./category.module.css";

// Компонент карточки категории
export default function Category({ title, img, path }) {
  return (
    <Link to={getCategoryProductRoute(path)} className={styles.categoryCard}>
      <img src={img} alt={title} />
      <p>{title}</p>
    </Link>
  );
}