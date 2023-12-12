import { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import styles from './authenticated.module.css';

export default function Authenticated({ email, setUser }) {
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
    </div>
  );
}
