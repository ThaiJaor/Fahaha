import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlices.js'
import cartReducer from "./slices/cartSlice.js"
export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
    },
})