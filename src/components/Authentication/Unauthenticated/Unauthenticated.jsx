import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { FaRegUser } from 'react-icons/fa';
import styles from './unauthenticated.module.css';
import Form from '../Form/Form';

export default function Unauthenticated() {
  const [showLoginpage, setShowLoginpage] = useState(false);
  const [showRegisterpage, setShowRegisterpage] = useState(false);

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
      <div className={styles.buttons}>
        <button type="button" className={styles.button} onClick={() => setShowLoginpage(true)}>
          Войти
        </button>
        <span> | </span>
        <button type="button" className={styles.button} onClick={() => setShowRegisterpage(true)}>
          Регистрация
        </button>
      </div>
      <FaRegUser className={styles.FaRegUser} onClick={() => setShowLoginpage(true)} />
      <Form
        title="Войти"
        show={showLoginpage}
        setShow={setShowLoginpage}
        authentication={signInWithEmailAndPassword}
      />
      <Form
        title="Регистрация"
        show={showRegisterpage}
        setShow={setShowRegisterpage}
        passwordСheck
        authentication={createUserWithEmailAndPassword}
      />
    </div>
  );
}
