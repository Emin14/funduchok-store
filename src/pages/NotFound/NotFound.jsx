import { Link } from 'react-router';
import styles from './notFound.module.css'

export default function NotFound() {


  return (
    <div className={styles.wrapper}>
      <span className={styles.code}>404</span>
      <span>Запрашиваемая вами страница не найдена :(</span>
      <Link to='/' className={styles.link}>Перейти на главную</Link>
    </div>
  );
}
