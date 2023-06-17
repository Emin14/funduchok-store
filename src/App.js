import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Sale from './pages/Sale';
import Promotion from './pages/Promotion';
import Delivery from './pages/Delivery';
import Replacement from './pages/Replacement';
import Wholesale from './pages/Wholesale';
import Snacks from './pages/Snacks';
import Contacts from './pages/Contacts';
import Reviews from './pages/Reviews';
import Products from './components/Products/Products';
import Product from './components/Product/Product';
import Basketpage from './pages/Basketpage/Basketpage';
import CompletedOrder from './pages/CompletedOrder/CompletedOrder';
import UserOrders from './pages/UserOrders/UserOrders';
import Favoritspage from './pages/Favoritspage/Favoritspage';

import axios from './axios';
import { getProducts, getCategory, getPoints } from './Redux/slices/dataSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from './pages/NotFound/NotFound';
import UserData from './pages/UserOrders/UserData/UserData';



function App() {

  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('user'))

useEffect(() => {
  axios('products')
  .then(res => dispatch(getProducts(res.data)))

  axios('category')
  .then(res => dispatch(getCategory(res.data)))

  if(currentUser) {
    axios(`users/${currentUser.id}`)
    .then(res => dispatch(getPoints(res.data.points)))  
  }
}, [])


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='skidki' element={<Sale />} />
          <Route path='akcii' element={<Promotion />} />
          <Route path='oplata-i-dostavka' element={<Delivery />} />
          <Route path='vozvrat-i-obmen' element={<Replacement />} />
          <Route path='tovary-optom' element={<Wholesale />} />
          <Route path='sneki-v-ofis' element={<Snacks />} />
          <Route path='kontakty' element={<Contacts />} />
          <Route path='otzyvy-o-nas' element={<Reviews />} />
          <Route path=':category' element={<Products />} />
          <Route path=':category/:idProduct' element={<Product />} />
          <Route path='cart' element={<Basketpage />} />
          <Route path='completed-order' element={<CompletedOrder />} />
          <Route path=':user/orders' element={<UserOrders />} />
          <Route path=':user/data' element={<UserData />} />
          <Route path='favorits' element={<Favoritspage/>}/>
          <Route path='*' element={NotFound}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
