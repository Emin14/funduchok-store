// Реализацию многоих вещей тут подсмотрел в интернет магазине одежды, но это не решило большинство моих проблем 
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  value: 1,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = { ...action.payload};
      state.cart.push(product);
    },

    reduceProduct(state, action) {
      console.log(action.payload)
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id 
      );
      if (state.cart[itemIndex].count > 1) {
        state.cart[itemIndex].count -= 1;
      } else if (state.cart[itemIndex].count === 1) {
        const updatedCart = state.cart.filter(
          (p) => p.id !== action.payload.id
        );
        state.cart = updatedCart;
      }
    },
    incrementProduct(state, action) {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id 
      );
      if (state.cart[itemIndex].count >= 1) {
        state.cart[itemIndex].count += 1;
      }
    }, 
  },
});

export const { addProduct, reduceProduct, incrementProduct} = productSlice.actions;
export default productSlice.reducer;