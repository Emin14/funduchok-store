import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorits: JSON.parse(localStorage.getItem('favorits')) || []
};

// !!!!!!!!!!!!!!!!!!!!!!!!!!!Сделать чтобы работало
const favoritsSlice = createSlice({
    name: 'favorits',
    initialState,
    reducers: {
        pushFavorit(state, action) {
            const findFavorit = state.favorits.some(el => el.id === action.payload.id);
            if(findFavorit) {
                state.favorits = state.favorits.filter(el => el.id !== action.payload.id)
            } else {
                state.favorits.push(action.payload)
            }
            localStorage.setItem('favorits', JSON.stringify(state.favorits))
        }
    }
})

export const {pushFavorit} = favoritsSlice.actions;
export default favoritsSlice.reducer