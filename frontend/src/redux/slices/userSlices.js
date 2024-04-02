import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    user: [],
    isLoading: false,
    isError: false,
    isLoginLoading: false,
    isLoginError: false

}
export const fetchUser = createAsyncThunk(
    'users/fetchUserStatus',
    async () => {
        const response = await axios.get("http://127.0.0.1:8000/api/user/info");
        return response.data
    },
)

export const login = createAsyncThunk(
    'user/loginStatus',
    async (loginData) => {
        console.log(loginData);
        const response = await axios.post("http://127.0.0.1:8000/api/user/login/", { "email": loginData.email, "password": loginData.password });
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
        // builder
        //     .addCase(fetchUser.pending, (state, action) => {
        //         // Add user to the state array
        //         state.isLoading = true;
        //         state.isError = false;
        //     })
        //     .addCase(fetchUser.fulfilled, (state, action) => {
        //         // Add user to the state array
        //         state.user = action.payload;
        //         state.isLoading = false;
        //         state.isError = false;
        //     })
        //     .addCase(fetchUser.rejected, (state, action) => {
        //         // Add user to the state array
        //         state.isLoading = false;
        //         state.isError = true;
        //     })

        builder
            .addCase(login.pending, (state, action) => {
                state.isLoginLoading = true;
                state.isLoginError = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoginLoading = false;
                state.isLoginError = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoginLoading = false;
                state.isLoginError = true;
            })
    },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer