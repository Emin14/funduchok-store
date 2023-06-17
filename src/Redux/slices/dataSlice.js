import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    category: [],
    points: 0,
    city: 'Баку',
    order: ''
}

const dataSlice = createSlice ({
    name: 'data',
    initialState,
    reducers: {
        getProducts(state, action) {
            state.products = action.payload
        },
        getCategory(state, action) {
            state.category = action.payload
        },
        getPoints(state, action) {
            state.points = action.payload
        },
        // pushOrders (state, action) {
        //     state.points += action.payload.orderPoints
        //     state.order = action.payload
        //   },
        writingCity (state, action)  {
          state.city = action.payload
        }
    }
})

export const {getProducts, getCategory, getPoints, pushOrders, writingCity} = dataSlice.actions;
export default dataSlice.reducer;
