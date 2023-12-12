import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout';
// import Homepage from './pages/Homepage';
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
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import getProductsAll from './utils.js/getProductsAll';
import { writeProducts } from './Redux/slices/products';
import Searchpage from './pages/Searchpage/Searchpage';
import Categories from './components/Categories/Categories';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getProductsAll()
      .then((data) => dispatch((writeProducts(data))));
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Categories />} />
          <Route path="skidki" element={<Sale />} />
          <Route path="akcii" element={<Promotion />} />
          <Route path="oplata-i-dostavka" element={<Delivery />} />
          <Route path="vozvrat-i-obmen" element={<Replacement />} />
          <Route path="tovary-optom" element={<Wholesale />} />
          <Route path="sneki-v-ofis" element={<Snacks />} />
          <Route path="kontakty" element={<Contacts />} />
          <Route path="otzyvy-o-nas" element={<Reviews />} />
          <Route path=":category" element={<Products />} />
          <Route path=":category/:idProduct" element={<ProductLayout />} />
          <Route path="cart" element={<Basketpage />} />
          <Route path="completed-order" element={<CompletedOrder />} />
          <Route path=":user/orders" element={<UserOrders />} />
          {/* <Route path=':user/data' element={<UserData />} /> */}
          <Route path="favorits" element={<Favoritspage />} />
          <Route path="search" element={<Searchpage />} />
          <Route path="*" element={NotFound} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
