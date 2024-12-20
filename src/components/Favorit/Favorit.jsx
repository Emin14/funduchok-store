import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import styles from './favorit.module.css';

export default function Favorit({ isFavorite, text }) {
  return (
    <>
      {isFavorite ? (
        <MdFavorite className={`${styles.icon} ${styles.iconFavorite}`} />
      ) : (
        <MdOutlineFavoriteBorder className={`${styles.icon} ${styles.iconOutline}`} />
      )}
      {text && <span className={styles.text}>{text}</span>}
    </>
  );
}
