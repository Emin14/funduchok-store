import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    city: 'Москва',
}

const citySlice = createSlice ({
    name: 'city',
    initialState,
    reducers: {
        writingCity (state, action)  {
          state.city = action.payload
        }
    }
})

export const {writingCity} = citySlice.actions;
export default citySlice.reducer;
