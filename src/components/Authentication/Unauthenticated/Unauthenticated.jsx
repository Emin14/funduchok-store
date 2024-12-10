import { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import styles from './unauthenticated.module.css';
import SignIn from '../Sign/SignIn';
import SignUp from '../Sign/SignUp';
import { AiOutlineUser } from "react-icons/ai";

export default function Unauthenticated() {
  const [show, setShow] = useState('');

  // const creatingUserDocumentFirestore = async() => {
  //     const washingtonRef = doc(db, "users", current);
  //     const docSnap = await getDoc(washingtonRef);
  //       // docSnap.data() will be undefined in this case
  //       console.log(2)
  //       await setDoc(washingtonRef, {});
  //       await updateDoc(washingtonRef, {
  //         orders: arrayUnion(newOrder),
  //       })
  // }

  return (
    <div className={styles.wrapper}>
      <div className={styles.login} onClick={() => setShow('singin')}>
        <AiOutlineUser className={styles.AiOutlineUser}/>
        <span>Войти</span>
      </div>
      <FaRegUser className={styles.FaRegUser} onClick={() => setShow('singin')} />
      <div
        className={show === 'singin' ? [styles.loginpage, styles.active].join(' ') : styles.loginpage}
        onClick={() => setShow('')}
        onKeyDown={() => setShow('')}
        role="presentation"
      >
        <SignIn setShow={setShow} />
      </div>
      <div
        className={show === 'singup' ? [styles.loginpage, styles.active].join(' ') : styles.loginpage}
        onClick={() => setShow('')}
        onKeyDown={() => setShow('')}
        role="presentation"
      >
        <SignUp setShow={setShow} />
      </div>
    </div>
  );
}
