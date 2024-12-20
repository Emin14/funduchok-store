import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from "react-router"
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FiHeart } from "react-icons/fi";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Basket from '../../Basket/Basket';
import SearchProduct from '../../SearchProduct/SearchProduct';
import DeliveryTime from '../../DeliveryTime/DeliveryTime';
import { navbar } from '../../ProductLayout/constans';
import Sidebar from '../Sidebar/Sidebar';
import Authentication from '../../Authentication/Authentication';
import getUserOrders from '../../../utils.js/getUserOrders';
import LocationSelect from '../../LocationSelect/LocationSelect';
import styles from './header.module.css'


export default function Header() {
  const [points, setPoints] = useState(0);
  const [nav, setNav] = useState(false);
  const [active, setActive] = useState(false);
  const totalAmount = useSelector((state) => state.cart.total);
  const productsInOrder = useSelector((state) => state.cart.cart);
  const totalCount = useSelector((state) => state.cart.totalCount);
  const favorits = useSelector((state) => state.favorits.favorits);
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserOrders(user.uid)
          .then((data) => setPoints(data.points));
      } 
    });
  }, []);

  useEffect(() => {
    setActive(false);
  }, [location.key]);


  const handleClick = () => {
    setNav((prev) => !prev);
  };


  return (
    <header className={nav ? [styles.header, styles.active].join(' ') : styles.header}>

      <div className={active ? [styles.top, styles.active2].join(' ') : styles.top}>
        <div className={styles.hamburger} onClick={handleClick} onKeyDown={handleClick} role="presentation">
          {!nav ? <AiOutlineMenu size={35} /> : ''}
        </div>
        <Link to="/" className={styles.logoWrapper}>
          <img className={styles.logo} src="https://фундучок.рф/assets/template/images/logo.jpg" alt="" />
        </Link>
        <div className={styles.LocationSelectWrapper}>
          <LocationSelect/>
          </div>
          <div className={styles.DeliveryTimeWrapper}>
            <DeliveryTime />
          </div>

        <div className={styles.searchContainer}>
          <SearchProduct active={active} setActive={setActive} />
        </div>
        <div className={styles.authentication}>
          <Authentication points={points} active={active} />
        </div>
        <div className={styles.BasketWrapper}>
        <Basket
          totalAmount={totalAmount}
          productsInOrder={productsInOrder}
          totalCount={totalCount}
          nav={nav}
        />
        </div>
        <div className={styles.favoritsWrapper}>
          <Link to="favorits" className={styles.favorits}>
            {
              !!favorits.length
              && <div className={styles.favoritsCount}>{favorits.length}</div>
            }
            {/* <MdOutlineFavoriteBorder className="headerMdOutlineFavoriteBorder" /> */}
            <FiHeart   className={styles.MdOutlineFavoriteBorder} />
            <span className={styles.favoritsText}>Избранное</span>
          </Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.mobile}>
          <div className={styles.hamburger} onClick={handleClick} onKeyDown={handleClick} role="presentation">
            {nav ? <AiOutlineClose size={35} /> : ''}
          </div>
          <Link to="/" onClick={handleClick} onKeyDown={handleClick} role="presentation">
            <img className={styles.logoMobile} src="https://фундучок.рф/assets/template/images/logo.jpg" alt="" />
          </Link>
        </div>
        <div className={styles.aside}>
          <p className={styles.asideCatalog}>Каталог:</p>
          <Sidebar setNav={setNav} />
        </div>
        <ul className={styles.nav}>
          {navbar.map((item) => (
            <li key={item.id}>
              <NavLink className={styles.asideLink} to={item.link} onClick={() => setNav(false)}>
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
