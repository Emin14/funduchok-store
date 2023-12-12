import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { writingCity } from '../../Redux/slices/citySlice';
import Basket from '../Basket/Basket';
import SearchProduct from '../SearchProduct/SearchProduct';
import DeliveryTime from '../DeliveryTime/DeliveryTime';
import './Header.css';
import { navbar } from '../ProductLayout/constans';

import Authentication from '../Authentication/Authentication';
import getUserOrders from '../../utils.js/getUserOrders';

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
  const [city, setCity] = useState('Баку');

  useEffect(() => {
    dispatch(writingCity(city));
  }, [city, dispatch]);

  return (
    <header className="header header-area">
      <div className="container ">
        <div className="header__top">
          {navbar.map((item) => (
            <NavLink key={item.id} to={item.link}>{item.title}</NavLink>
          ))}
        </div>
        <div className="header__bottom">
          <Link to="/">
            <img src="https://фундучок.рф/assets/template/images/logo.jpg" alt="" />
          </Link>
          <div className="header__location">
            <p>Ваш город</p>
            <select name="" id="" className="yellow-text" value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="Москва">Москва</option>
              <option value="Казань">Казань</option>
            </select>
          </div>
          <div className="header__bottom_center">
            <div className="header__contacts">
              <a href="tel:88005002218" className="header__contacts_tel">8 800 500-22-18</a>
              <a href="mailto:sales@nutsland.ru" className="header__contacts_mail">sales@nutsland.ru</a>
              <div className="header__working-hours">
                <p>Часы работы:</p>
                <p className="header__working-hours_desc">с 10:00 до 19:00 по будням,</p>
                <p className="header__working-hours_desc">суббота с 10:00 до 14:00</p>
              </div>
            </div>
            <SearchProduct />
          </div>
          <div>
            <Authentication />
            <div className="header__bonus">
              <p>Бонусных рублей</p>
              <p>{points}</p>
            </div>
          </div>
          <Basket />
          <div>
            <Link to="favorits" className="header-favorits">
              <span><MdOutlineFavoriteBorder className="header__MdOutlineFavoriteBorder" /></span>
              <span className="header-favorits-text">Избранное</span>
            </Link>
          </div>

        </div>
      </div>
      <DeliveryTime />
    </header>
  );
}
