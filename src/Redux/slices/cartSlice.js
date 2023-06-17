// К каждой функции добавил
//  код: state.total = state.cart.reduce((accum, product) => accum + (product.count * product.discountPrice), 0);
// не знаю насколько это правильно. Но не смог реализовать подсчет итоговой суммы всех товаров отдельным Action, поэтому пришлось привязывать 
// к каждой функции

// Не знаю насколько правильно было писать функцию deleteProduct через splice. Через filter что то никак не получилось 
// Не знаю насколько правильно было писать localStorage.setItem в каждой функции и получать начальные значения с localStorage
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: JSON.parse(localStorage.getItem('products')) || [],
  value: 1,
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
    },
    //  Очистить корзину
     clearCart (state, action) {
      state.cart = [];
      state.total = 0;
      state.points = 0;

      localStorage.removeItem('products')
      localStorage.removeItem('total')
      localStorage.removeItem('points')
     }
  },
});

export const { addProduct, reduceProduct, incrementProduct, deleteProduct, registerInSite, clearCart} = cartSlice.actions;
export default cartSlice.reducer;