import { createApi } from '@reduxjs/toolkit/query/react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebase';

// Создаем API slice для получения продуктов
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: () => ({ data: [] }), // для использования Firestore baseQuery не нужен
  endpoints: (builder) => ({
    getProducts: builder.query({
      queryFn: async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'products'));
          const result = querySnapshot.docs.map(doc => doc.data())
          return { data: result }; // возвращаем данные
        } catch (error) {
          return { error: error.message }; // обработка ошибок
        }
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi; // экспортируем хук для использования в компонентах
export const productsReducer = productsApi.reducer;
