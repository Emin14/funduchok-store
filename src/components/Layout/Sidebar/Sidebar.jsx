import { NavLink } from 'react-router-dom';
import { categories } from '../../ProductLayout/constans';
import './Sidebar.css';

// Компонент бокового меню
// Является дочерним для <Layout/>
export default function Sidebar({ setNav }) {
  const handleClick = () => {
    if (setNav) {
      setNav(false);
    }
  };
  return (
    <ul>
      {categories.map((item) => (
        <li key={item.id}>
          <NavLink to={item.pathname} onClick={handleClick}>{item.title}</NavLink>
        </li>
      ))}
    </ul>
  );
}
