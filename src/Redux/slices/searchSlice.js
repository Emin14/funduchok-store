import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search : {
        phrase: '',
        begin: false
    }
}

const searchSlice = createSlice( {
    name: 'search',
    initialState,
    reducers: {
        // Поисковик
        searchProduct (state, action) {
            state.search = action.payload
        },
    }
})

export const { searchProduct} = searchSlice.actions;
export default searchSlice.reducer;