import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlices.js'
import cartReducer from "./slices/cartSlice.js"
import bookReducer from  "./slices/bookSlice.js";
export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        books: bookReducer,

    },
})