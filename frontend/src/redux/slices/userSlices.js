import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    users: [],
    isLoading: false,
    isError: false,

}
export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsersStatus',
    async () => {
        const response = await axios.get("http://localhost:8080/users/all");
        return response.data
    },
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchAllUsers.pending, (state, action) => {
                // Add user to the state array
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                // Add user to the state array
                state.users = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                // Add user to the state array
                state.isLoading = false;
                state.isError = true;
            })
    },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer