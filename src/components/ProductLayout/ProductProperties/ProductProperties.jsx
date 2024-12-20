// import Characteristics from '../Characteristics/Characteristics';
import Reviews from '../Reviews/Reviews';
import styles from './productProperties.module.css';

export default function ProductProperties({
  description, blocks, block, selectBlock,
}) {
  let outTag = null;
  if (block.description) {
    outTag = description;
  } else if (block.characteristics) {
    outTag = 'Здесь отображаются характеристики из базы данных'
  } else if (block.reviews) {
    outTag = <Reviews />;
  } else {
    outTag = null;
  }

  if (blocks) {
    return (
      <div>
        <ul className={styles.list} onClick={selectBlock} onKeyDown={selectBlock} role="presentation">
          {blocks.map((item) => (
            <li key={item.title} data-columns={item.dataset} className={`${styles.item} ${block[item.dataset] ? styles.active : ''}`}>
              {item.title}
            </li>
          ))}
        </ul>
        <div className={styles.description}>
          {outTag}
        </div>
      </div>
    );
  }
}
