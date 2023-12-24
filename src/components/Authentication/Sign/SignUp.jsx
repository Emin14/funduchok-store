/* eslint-disable react/jsx-props-no-spreading */
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import {
  doc, updateDoc, setDoc,
} from 'firebase/firestore';
import styles from './sign.module.css';
import db from '../../../firebase';

export default function SignUp({ setShow }) {
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm({
    mode: 'onBlur',
  });

  const submit = async ({ email, password }) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        setShow('');
        reset();
        return user.uid;
      })
      .then((document) => doc(db, 'users', document))
      .then((data) => {
        setDoc(data, {});
        return data;
      })
      .then((data) => updateDoc(data, {
        orders: [],
        points: 0,
      }))

      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const handleClick = () => {
    setShow('singin');
  };

  return (
    <form
      action=""
      className={styles.form}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(submit)}
      role="presentation"
    >
      <h2 className={styles.title}>Регистрация</h2>
      <p className={styles.description}>
        Чтобы накапливать баллы, получать промокоды и следить за историей покупок
      </p>
      <label htmlFor="singUpEmail" className={styles.label}>
        <input
          type="email"
          placeholder="Email"
          id="singUpEmail"
          autoComplete="email"
          {...register('email', { pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/, required: true })}
        />
        {errors.email && <p className={styles.error}>Это поле обязательно</p>}
      </label>
      <label htmlFor="singUpPassword" className={styles.label}>
        <input
          type="password"
          name="password"
          id="singUpPassword"
          placeholder="Password"
          autoComplete="off"
          {...register('password', { required: true })}
        />
        {errors.password && <p className={styles.error}>Это поле обязательно</p>}
      </label>
      <label htmlFor="repeatPassword" className={styles.label}>
        <input
          type="password"
          name="repeatPassword"
          placeholder="Repeat password"
          id="repeatPassword"
          autoComplete="off"
          {...register('passwordConfirmation', {
            required: 'Пожалуйста, подтвердите пароль!',
            validate: {
              matchesPreviousPassword: (value) => {
                const { password } = getValues();
                return password === value || 'Пароли должны совпадать!';
              },
            },
          })}
        />
        {errors.passwordConfirmation && (
        <p className={styles.error}>
          {errors.passwordConfirmation.message}
        </p>
        )}
      </label>
      <button type="submit" className={styles.button}>Регистрация</button>
      <div className={styles.noAccount}>
        <p>У вас есть аккаунт?</p>
        <button type="button" onClick={handleClick}>Войти</button>
      </div>
    </form>
  );
}
