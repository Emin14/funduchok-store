import React, { useState } from 'react'
import styles from './unauthenticated.module.css'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import Form from '../Form/Form.jsx'

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
            <button className={styles.button} onClick={() => setShowLoginpage(true)}>Войти</button>
            <span>|</span>
            <button className={styles.button} onClick={() => setShowRegisterpage(true)}>Регистрация</button>
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
    )
}
