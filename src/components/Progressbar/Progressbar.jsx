import { Line } from 'rc-progress';
import styles from './progressbar.module.css';

export default function Progressbar({ totalAmount, maxAmount }) {
  const percentAmount = (totalAmount / maxAmount) * 100;

  return (
    <Line percent={percentAmount} strokeWidth={2} trailWidth={1} strokeColor="#ffd944" trailColor="#eaedf6" className={styles.progress} />
  );
}
