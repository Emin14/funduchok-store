// Не знаю насколько правильно было писать localStorage.setItem в каждой функции и получать начальные значения с localStorage
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: JSON.parse(localStorage.getItem('products')) || [],
  totalCount: JSON.parse(localStorage.getItem('totalCount')) || 0,
  total: JSON.parse(localStorage.getItem('total')) || 0,
  points: JSON.parse(localStorage.getItem('points')) || 0,
};

const cartSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Добавляет продукт в корзину со страницы с карточкой продукта
    addProduct: (state, action) => {
      const iTemindex = state.cart.findIndex(currentValue => currentValue.id === action.payload.id && currentValue.fasovka === action.payload.fasovka)
      if(iTemindex >= 0) {
        state.cart[iTemindex].count += action.payload.count
      } 
      else {
        const product = { ...action.payload};
        state.cart.push(product);
      }
      localStorage.setItem('products', JSON.stringify(state.cart))
      
      state.total = state.cart.reduce((accum, product) => {
        if('salePrice' in product)
          return accum += (product.count * product.salePrice)
        else {
          return accum += (product.count * product.basePrice)
        }
      }, 0);

      localStorage.setItem('total', JSON.stringify(state.total))
      
      state.points = state.cart.reduce((accum, product) => accum += Math.ceil(product.totalPoints), 0);
      localStorage.setItem('points', JSON.stringify(state.points))

      state.totalCount += action.payload.count
      localStorage.setItem('totalCount', JSON.stringify(state.totalCount))
    },

    // Уменьшает количество продукта на странице корзины
    reduceProduct(state, action) {
      const iTemindex = state.cart.findIndex(currentValue => currentValue.id === action.payload.id && currentValue.fasovka === action.payload.fasovka);
      if (state.cart[iTemindex].count < 2) {
        state.cart[iTemindex].count = 1
      }
      else {
        state.cart[iTemindex].count -= 1
        state.cart[iTemindex].totalPoints -= state.cart[iTemindex].pointfor1Count
        localStorage.setItem('products', JSON.stringify(state.cart))

        state.total = state.cart.reduce((accum, product) => {
          if('salePrice' in product)
            return accum += (product.count * product.salePrice)
          else {
            return accum += (product.count * product.basePrice)
          }
        }, 0);
        localStorage.setItem('total', JSON.stringify(state.total))

        state.points = state.cart.reduce((accum, product) => accum += Math.ceil(product.totalPoints), 0);
        localStorage.setItem('points', JSON.stringify(state.points))

        state.totalCount = state.totalCount - 1
        localStorage.setItem('totalCount', JSON.stringify(state.totalCount))
      }
    },
    // Увеличивает количество продукта на странице корзины
    incrementProduct(state, action) {
      const iTemindex = state.cart.findIndex(currentValue => currentValue.id === action.payload.id && currentValue.fasovka === action.payload.fasovka);
      state.cart[iTemindex].count += 1;
      state.cart[iTemindex].totalPoints += state.cart[iTemindex].pointfor1Count
      localStorage.setItem('products', JSON.stringify(state.cart))

      state.total = state.cart.reduce((accum, product) => {
        if('salePrice' in product)
          return accum += (product.count * product.salePrice)
        else {
          return accum += (product.count * product.basePrice)
        }
      }, 0);
      localStorage.setItem('total', JSON.stringify(state.total))


      state.points = state.cart.reduce((accum, product) => accum += Math.ceil(product.totalPoints), 0);
      localStorage.setItem('points', JSON.stringify(state.points))

      state.totalCount = state.totalCount + 1
      localStorage.setItem('totalCount', JSON.stringify(state.totalCount))
    },
    // Удаляет продукт на странице Basketpage 
    deleteProduct (state, action) {
      const ada = state.cart.findIndex(item => item.id === action.payload.id && item.fasovka === action.payload.fasovka)
      state.cart.splice(ada, 1)
      localStorage.setItem('products', JSON.stringify(state.cart))

      state.total = state.cart.reduce((accum, product) => {
        if('salePrice' in product)
          return accum += (product.count * product.salePrice)
        else {
          return accum += (product.count * product.basePrice)
        }
      }, 0);
      localStorage.setItem('total', JSON.stringify(state.total))

      state.points = state.cart.reduce((accum, product) => accum += Math.ceil(product.totalPoints), 0);
      localStorage.setItem('points', JSON.stringify(state.points))

      state.totalCount = state.cart.reduce((accum, item) => accum + item.count, 0);
      localStorage.setItem('totalCount', JSON.stringify(state.totalCount))
    },
    //  Очистить корзину
     clearCart (state, action) {
      state.cart = [];
      state.total = 0;
      state.points = 0;
      state.totalCount = 0

      localStorage.removeItem('products')
      localStorage.removeItem('total')
      localStorage.removeItem('points')
      localStorage.removeItem('totalCount')
     }
  },
});

export const { addProduct, reduceProduct, incrementProduct, deleteProduct, registerInSite, clearCart} = cartSlice.actions;
export default cartSlice.reducer;


