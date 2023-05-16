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
import Category from './components/Category/Category';
import Products from './components/Products/Products';
import Product from './components/Product/Product';
import Basketpage from './pages/Basketpage/Basketpage';

function App() {
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
          <Route path=':id' element={<Products />} />
          <Route path=':id/:id' element={<Product />} />
          <Route path='korzina' element={<Basketpage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
