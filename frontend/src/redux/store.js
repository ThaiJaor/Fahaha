import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlices.js'
export const store = configureStore({
    reducer: {
        user: userReducer
    },
})