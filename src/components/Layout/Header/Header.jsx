import { useState, useEffect } from 'react';
// import { NavLink, Link, useLocation } from 'react-router-dom';
import { NavLink, Link, useLocation } from "react-router"
import { useSelector, useDispatch } from 'react-redux';

import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { writingCity } from '../../../Redux/slices/citySlice';
import Basket from '../../Basket/Basket';
import SearchProduct from '../../SearchProduct/SearchProduct';
import DeliveryTime from '../../DeliveryTime/DeliveryTime';
import './Header.css';
import { navbar } from '../../ProductLayout/constans';
import Sidebar from '../Sidebar/Sidebar';

import Authentication from '../../Authentication/Authentication';
import getUserOrders from '../../../utils.js/getUserOrders';
import LocationSelect from '../../LocationSelect/LocationSelect';

export default function Header() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserOrders(user.uid)
          .then((data) => setPoints(data.points));
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  const dispatch = useDispatch();

  // const points = useSelector((state) => state.data.points)

  const city = useSelector((state) => state.city.city);

  const [nav, setNav] = useState(false);

  const handleClick = () => {
    setNav((prev) => !prev);
  };

  const totalAmount = useSelector((state) => state.cart.total);
  const productsInOrder = useSelector((state) => state.cart.cart);
  const totalCount = useSelector((state) => state.cart.totalCount);
  const favorits = useSelector((state) => state.favorits.favorits);

  const location = useLocation();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
  }, [location.key]);

  return (
    <header className={nav ? ['header-area', 'active'].join(' ') : 'header-area'}>

      <div className={active ? ['header__bottom', 'active2'].join(' ') : 'header__bottom'}>
        <div className="hamburger" onClick={handleClick} onKeyDown={handleClick} role="presentation">
          {!nav ? <AiOutlineMenu size={35} /> : ''}
        </div>
        <Link to="/">
          <img className="header__logo" src="https://фундучок.рф/assets/template/images/logo.jpg" alt="" />
        </Link>
          <LocationSelect/>
          <DeliveryTime />
        <div className="header__bottom_center">
          <SearchProduct active={active} setActive={setActive} />
        </div>
        <div className="header__authentication">
          <Authentication points={points} active={active} />
        </div>
        <Basket
          totalAmount={totalAmount}
          productsInOrder={productsInOrder}
          totalCount={totalCount}
          nav={nav}
        />
        <div>
          <Link to="favorits" className="header-favorits">
            {
              favorits.length > 0
              && <div className="header__favorits-count">{favorits.length}</div>
            }
            <MdOutlineFavoriteBorder className="header__MdOutlineFavoriteBorder" />
            <span className="header-favorits-text">Избранное</span>
          </Link>
        </div>
      </div>
      <div className="header__top">
        <div className="header-mobile">
          <div className="hamburger hamburger2" onClick={handleClick} onKeyDown={handleClick} role="presentation">
            {nav ? <AiOutlineClose size={35} /> : ''}
          </div>
          <Link to="/" onClick={handleClick} onKeyDown={handleClick} role="presentation">
            <img className="header__logo-mobile" src="https://фундучок.рф/assets/template/images/logo.jpg" alt="" />
          </Link>
        </div>
        <div className="header__aside">
          <p className="header__aside-catalog">Каталог:</p>
          <Sidebar setNav={setNav} />
        </div>
        <ul className="header__nav">
          {navbar.map((item) => (
            <li key={item.id}>
              <NavLink className="header__aside_link" to={item.link} onClick={() => setNav(false)}>
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
