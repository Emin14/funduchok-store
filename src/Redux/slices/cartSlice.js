import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: JSON.parse(localStorage.getItem('products')) || [],
  totalCount: JSON.parse(localStorage.getItem('totalCount')) || 0,
  total: JSON.parse(localStorage.getItem('total')) || 0,
  points: 0,
};

const cartSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Добавляет продукт в корзину со страницы с карточкой продукта
    changeCartProducts: (state, action) => {
      const find = state.cart.find((currentValue) => (
        currentValue.id === action.payload.id && currentValue.weight === action.payload.weight
      ));
      if (find) {
        find.count += action.payload.count;
        if (find.count < 1) {
          find.count = 1;
        }
      }
      if (!find) {
        state.cart.push(action.payload);
      }
      localStorage.setItem('products', JSON.stringify(state.cart));
    },

    // Удаляет продукт на странице Basketpage
    deletion(state, action) {
      const index = state.cart.findIndex((item) => (
        item.id === action.payload.id && item.weight === action.payload.weight
      ));
      state.cart.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(state.cart));
    },
    //  Очистить корзину
    clearCart(state) {
      state.cart = [];
      state.total = 0;
      state.points = 0;
      state.totalCount = 0;

      localStorage.removeItem('products');
      localStorage.removeItem('total');
      localStorage.removeItem('points');
      localStorage.removeItem('totalCount');
    },

    // Подсчет суммы корзины
    calcAmount(state) {
      state.total = state.cart.reduce((accum, product) => {
        if ('packingDiscountPrice' in product) {
          let result = accum;
          result += (product.count * product.packingDiscountPrice);
          return result;
        }
        let result = accum;
        result += (product.count * product.packingPrice);
        return result;
      }, 0);
      localStorage.setItem('total', JSON.stringify(state.total));
    },
    // Подсчет суммы баллов в корзине
    calcPoints(state) {
      state.points = state.cart.reduce((accum, product) => {
        let result = accum;
        result += Math.ceil(product.packingPoint * product.count);
        return result;
      }, 0);
      localStorage.setItem('points', JSON.stringify(state.points));
    },

    // Подсчет количества штук товаров в корзине
    calcPieces(state) {
      state.totalCount = state.cart.reduce((accum, product) => {
        let result = accum;
        result += Math.ceil(product.count);
        return result;
      }, 0);
      localStorage.setItem('totalCount', JSON.stringify(state.totalCount));
    },
  },
});

export const {
  changeCartProducts, calcAmount, calcPoints, calcPieces, deletion, registerInSite, clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
