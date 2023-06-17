import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice';
import favoritsReducer from './slices/favoritsSlice'
import searchReducer from './slices/searchSlice'
import dataReducer from './slices/dataSlice'

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    favorits: favoritsReducer,
    search: searchReducer,
    data: dataReducer
  },
});