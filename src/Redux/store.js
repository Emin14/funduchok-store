import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
// import { thunk } from 'redux-thunk';

import cartReducer from './slices/cartSlice';
import favoritsReducer from './slices/favoritsSlice';
import cityReducer from './slices/citySlice';
// import productsReducer from './slices/products';
import { productsApi } from './services/productsApi';  // Путь к файлу, где мы создали API slice


const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['register'], // Указываем, какие редьюсеры игнорировать
  // или используйте transforms для фильтрации данных
};

const favoritsPersistedReducer = persistReducer(persistConfig, favoritsReducer);
const cartPersistedReducer = persistReducer(persistConfig, cartReducer);
const cityPersistedReducer = persistReducer(persistConfig, cityReducer);

export default configureStore({
  reducer: {
    cart: cartPersistedReducer,
    favorits: favoritsPersistedReducer,
    city: cityPersistedReducer,
    // products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,  // Добавляем API slice в store

  },
  // middleware: [thunk],
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(productsApi.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорировать проблемы с сериализацией для actions типа 'PERSIST'
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(productsApi.middleware),
});


