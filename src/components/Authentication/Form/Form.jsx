/* eslint-disable react/jsx-props-no-spreading */
import { getAuth } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import {
  doc, updateDoc, setDoc,
} from 'firebase/firestore';
import styles from './form.module.css';
import db from '../../../firebase';

export default function Form({
  title, show, setShow, passwordСheck, authentication,
}) {
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

  const ada = async ({ email, password }) => {
    const auth = getAuth();
    authentication(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        setShow(false);
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

  // const washingtonRef = doc(db, "users", user.uid);
  // const docSnap = await getDoc(washingtonRef);

  return (
    <div
      className={show ? [styles.loginpage, styles.active].join(' ') : styles.loginpage}
      onClick={() => setShow(false)}
      onKeyDown={() => setShow(false)}
      role="presentation"
    >
      <form
        action=""
        className={styles.form}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(ada)}
        role="presentation"
      >
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>
          Чтобы накапливать баллы, получать промокоды и следить за историей покупок
        </p>
        <label>
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register('email', { pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/, required: true })}
          />
          {errors.email && <p>This is required2</p>}
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            {...register('password', { required: true })}
          />
        </label>
        {errors.password && <p>This is required</p>}
        { passwordСheck
            && (
            <label htmlFor="repeatPassword">
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
            </label>
            ) }
        {errors.passwordConfirmation && (
        <p style={{ color: 'black' }}>
          {errors.passwordConfirmation.message}
        </p>
        )}
        <button type="submit" className={styles.button}>{title}</button>
      </form>
    </div>
  );
}
