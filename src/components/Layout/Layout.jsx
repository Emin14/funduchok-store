// import { Outlet } from 'react-router-dom';
import { Outlet } from "react-router"
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Footer from './Footer/Footer';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.wrapper}>
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
