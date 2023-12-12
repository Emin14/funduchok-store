import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import favoritsReducer from './slices/favoritsSlice';
import cityReducer from './slices/citySlice';
import productsReducer from './slices/products';

export default configureStore({
  reducer: {
    cart: cartReducer,
    favorits: favoritsReducer,
    city: cityReducer,
    products: productsReducer,
  },
});
