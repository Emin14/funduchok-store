import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
}

const productsSlice = createSlice ({
    name: 'products',
    initialState,
    reducers: {
        writeProducts(state, action) {
            state.products = action.payload
        }
    }
})

export const {writeProducts} = productsSlice.actions;
export default productsSlice.reducer;
