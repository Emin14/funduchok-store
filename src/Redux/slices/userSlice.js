import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) ||'',
}


const userSlice = createSlice({
name: 'user',
initialState,
reducers: {
    // Регистрация
    registerInSite (state, action) {
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(state.user))
      },
    // Смена данных
    changeData (state, action) {
        state.user = {...state.user, ...action.payload}
        localStorage.setItem('user', JSON.stringify(state.user))
      },
    // Выход пользователя
    logout (state, action) {
        state.user = action.payload
        localStorage.removeItem('user')
      },
}
}
)

export const {registerInSite, writingCity, changeData, logout} = userSlice.actions
export default userSlice.reducer