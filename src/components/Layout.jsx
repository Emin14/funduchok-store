import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Footer from './Footer/Footer';

export default function Layout() {
  return (
    <div className="container wrapper">
      <Header />
      <div className="sidebar2">
        <Sidebar />
      </div>
      <main className="main-area">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
