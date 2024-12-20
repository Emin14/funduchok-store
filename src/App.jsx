import { Routes, Route } from "react-router";
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout/Layout';
import Sale from './pages/Sale';
import Promotion from './pages/Promotion';
import Delivery from './pages/Delivery';
import Replacement from './pages/Replacement';
import Wholesale from './pages/Wholesale';
import Snacks from './pages/Snacks';
import Contacts from './pages/Contacts';
import Reviews from './pages/Reviews';
import Products from './components/Products/Products';
import ProductLayout from './components/ProductLayout/ProductLayout';
import Basketpage from './pages/Basketpage/Basketpage';
import CompletedOrder from './pages/CompletedOrder/CompletedOrder';
import UserOrders from './pages/UserOrders/UserOrders';
import Favoritspage from './pages/Favoritspage/Favoritspage';
import NotFound from './pages/NotFound/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import Searchpage from './pages/Searchpage/Searchpage';
import Categories from './components/Categories/Categories';
import './App.css';

function App() {


  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Categories />} />
          <Route path="skidki" element={<Sale />} />
          <Route path="akcii" element={<Promotion />} />
          <Route path="oplata-i-dostavka" element={<Delivery />} />
          <Route path="vozvrat-i-obmen" element={<Replacement />} />
          <Route path="tovary-optom" element={<Wholesale />} />
          <Route path="sneki-v-ofis" element={<Snacks />} />
          <Route path="kontakty" element={<Contacts />} />
          <Route path="otzyvy-o-nas" element={<Reviews />} />

          <Route path="cart" element={<Basketpage />} />
          <Route path="completed-order" element={<CompletedOrder />} />
          <Route path=":user/orders" element={<UserOrders />} />
          <Route path="favorits" element={<Favoritspage />} />
          <Route path="search" element={<Searchpage />} />

          <Route path="category/:category" element={<Products />} />
          <Route path="category/:category/:idProduct" element={<ProductLayout />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
