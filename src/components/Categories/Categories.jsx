import Category from '../Category/Category';
import { categories } from '../ProductLayout/constans';
import styles from './categories.module.css';

export default function Categories() {
  return (
    <div className={styles.categories}>
      {categories.map((item) => (
        <Category key={item.id} title={item.title} img={item.img} path={item.pathname} />
      ))}
    </div>
  );
}