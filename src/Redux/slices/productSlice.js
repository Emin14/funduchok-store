// К каждой функции добавил
//  код: state.total = state.cart.reduce((accum, product) => accum + (product.count * product.price), 0);
// не знаю насколько это правильно. Но не смог реализовать подсчет итоговой суммы всех товаров отдельным Action, поэтому пришлось привязывать 
// к каждой функции

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  value: 1,
  total: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Добавляет продукт в корзину со страницы с карточкой продукта
    addProduct: (state, action) => {
      const iTemindex = state.cart.findIndex(currentValue => currentValue.id === action.payload.id && currentValue.fasovka === action.payload.fasovka)
      console.log(iTemindex)
        if(iTemindex >= 0) {
          state.cart[iTemindex].count += action.payload.count
        } 
      else {
        const product = { ...action.payload};
        state.cart.push(product);
      }

      state.total = state.cart.reduce((accum, product) => accum + (product.count * product.price), 0);
    },

    // Уменьшает количество продукта на странице корзины
    reduceProduct(state, action) {
      const iTemindex = state.cart.findIndex(currentValue => currentValue.id === action.payload.id && currentValue.fasovka === action.payload.fasovka);
      if (state.cart[iTemindex].count < 2) {
        state.cart[iTemindex].count = 1
      }
      else {
        state.cart[iTemindex].count -= 1

        state.total = state.cart.reduce((accum, product) => accum + (product.count * product.price), 0);
      }
    },
    // Увеличивает количество продукта на странице корзины
    incrementProduct(state, action) {
      console.log(action.payload)
      const iTemindex = state.cart.findIndex(currentValue => currentValue.id === action.payload.id && currentValue.fasovka === action.payload.fasovka);
      state.cart[iTemindex].count += 1;

      state.total = state.cart.reduce((accum, product) => accum + (product.count * product.price), 0);
    },
  },
});

export const { addProduct, reduceProduct, incrementProduct, total} = productSlice.actions;
export default productSlice.reducer;