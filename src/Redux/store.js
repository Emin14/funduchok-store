import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { thunk } from 'redux-thunk';

import cartReducer from './slices/cartSlice';
import favoritsReducer from './slices/favoritsSlice';
import cityReducer from './slices/citySlice';
import productsReducer from './slices/products';

const persistConfig = {
  key: 'root',
  storage,
};

const favoritsPersistedReducer = persistReducer(persistConfig, favoritsReducer);
const cartPersistedReducer = persistReducer(persistConfig, cartReducer);
const cityPersistedReducer = persistReducer(persistConfig, cityReducer);

export default configureStore({
  reducer: {
    cart: cartPersistedReducer,
    favorits: favoritsPersistedReducer,
    city: cityPersistedReducer,
    products: productsReducer,
  },
  middleware: [thunk],
});
