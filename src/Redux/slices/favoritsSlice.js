import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorits: [],
};

const favoritsSlice = createSlice({
  name: 'favorits',
  initialState,
  reducers: {
    togleFavorit(state, action) {
      const findFavorit = state.favorits.some((el) => el.id === action.payload.id);
      if (findFavorit) {
        state.favorits = state.favorits.filter((el) => el.id !== action.payload.id);
      } else {
        state.favorits.push(action.payload);
      }
    },
  },
});

export const { togleFavorit } = favoritsSlice.actions;
export default favoritsSlice.reducer;
