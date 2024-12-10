import { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { BiPurchaseTagAlt } from 'react-icons/bi';
import { FaUserLargeSlash } from 'react-icons/fa6';
// import { Link, NavLink } from 'react-router-dom';
import { Link, NavLink } from "react-router"
import { getAuth, signOut } from 'firebase/auth';
import styles from './authenticated.module.css';

export default function Authenticated({
  email, setUser, points, active,
}) {
  const [show, setShow] = useState(false);

  // Функция для выхода из аккаунта.
  const logOutUser = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  return (
    <div className={active ? [styles.wrapper2, styles.active].join(' ') : styles.wrapper2}>
      <div className={styles.wrapper}>
        <div
          className={styles.account}
          onMouseOver={() => setShow(true)}
          onFocus={() => setShow(true)}
          onMouseOut={() => setShow(false)}
          onBlur={() => setShow(false)}
        >
          <p>
            Привет,
            {email}
          </p>
          <div>
            <span className={styles.text}>Мой аккаунт</span>
            <RiArrowDownSLine className={styles.RiArrowDownSLine} />
          </div>
        </div>
        <Link to="/user/orders">
          <BiPurchaseTagAlt
            className={styles.BiPurchaseTagAlt}
          />
        </Link>
        {show
          && (
          <div
            className={styles.info}
            onMouseOver={() => setShow(true)}
            onFocus={() => setShow(true)}
            onMouseOut={() => setShow(false)}
            onBlur={() => setShow(false)}
          >
            <ul>
              <li><NavLink to="/user/orders">Мои заказы</NavLink></li>
            </ul>
          </div>
          )}
        <span className={styles.button} onClick={logOutUser} onKeyDown={logOutUser} role="presentation">Выйти </span>
        <FaUserLargeSlash className={styles.FaUserLargeSlash} onClick={logOutUser} onKeyDown={logOutUser} role="presentation" />
      </div>
      <div className={styles.bonus}>
        <p className={styles.bonusText}>Бонусных рублей</p>
        <p>
          {points}
          {' '}
          <span className={styles.bonusTextMobile}> бонусов</span>
        </p>
      </div>
    </div>
  );
}
