import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  totalCount: 0,
  total: 0,
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
    },

    // Удаляет продукт на странице Basketpage
    deletion(state, action) {
      const index = state.cart.findIndex((item) => (
        item.id === action.payload.id && item.weight === action.payload.weight
      ));
      state.cart.splice(index, 1);
    },
    //  Очистить корзину
    clearCart(state) {
      state.cart = [];
      state.total = 0;
      state.points = 0;
      state.totalCount = 0;
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
    },
    // Подсчет суммы баллов в корзине
    calcPoints(state) {
      state.points = state.cart.reduce((accum, product) => {
        let result = accum;
        result += Math.ceil(product.packingPoint * product.count);
        return result;
      }, 0);
    },

    // Подсчет количества штук товаров в корзине
    calcPieces(state) {
      state.totalCount = state.cart.reduce((accum, product) => {
        let result = accum;
        result += Math.ceil(product.count);
        return result;
      }, 0);
    },
  },
});

export const {
  changeCartProducts, calcAmount, calcPoints, calcPieces, deletion, clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
