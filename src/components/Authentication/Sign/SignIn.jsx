/* eslint-disable react/jsx-props-no-spreading */
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import styles from './sign.module.css';

export default function SignIn({ setShow }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm({
    mode: 'onBlur',
  });

  const submit = async ({ email, password }) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setShow('');
        reset();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const handleClick = () => {
    setShow('singup');
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
      <h2 className={styles.title}>Войти</h2>
      <p className={styles.description}>
        Чтобы накапливать баллы, получать промокоды и следить за историей покупок
      </p>
      <label htmlFor="singInEmail" className={styles.label}>
        <input
          type="email"
          placeholder="Email"
          id="singInEmail"
          autoComplete="email"
          {...register('email', { pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/, required: true })}
        />
        {errors.email && <p className={styles.error}>Это поле обязательно</p>}
      </label>
      <label htmlFor="singInPassword" className={styles.label}>
        <input
          type="password"
          name="password"
          id="singInPassword"
          placeholder="Password"
          autoComplete="off"
          {...register('password', { required: true })}
        />
        {errors.password && <p className={styles.error}>Это поле обязательно</p>}
      </label>
      <button type="submit" className={styles.button}>Войти</button>
      <div className={styles.noAccount}>
        <p>У вас еще нету аккаунта?</p>
        <button type="button" onClick={handleClick}>Зарегистрироваться</button>
      </div>
    </form>
  );
}
