import Category from '../Category/Category';
import './Categories.css';
import { categories } from '../ProductLayout/constans';

// Компонент вывода списка категорий на главной
export default function Categories() {
  return (
    <div className="categories__wrapper">
      {categories.map((item) => (
        <Category key={item.id} title={item.title} img={item.img} path={item.pathname} />
      ))}
    </div>
  );
}
