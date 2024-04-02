import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';
import axios from 'axios'
const initialState = {
    user: [],
    isLoading: false,
    isError: false,
    isLoginLoading: false,
    isLoginError: false,
    isAuthenticated: false,
    access_token: ""

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
        const response = await axios.post("http://127.0.0.1:8000/api/user/login/", { "email": loginData.email, "password": loginData.password }, {
            withCredentials: true
        });
        return response.data
    },
)

export const update = createAsyncThunk(
    'user/updateStatus',
    async (updateData) => {
        console.log(updateData);
        const response = await axios.post("http://127.0.0.1:8000/api/user/info/", {
            "email": updateData.email,
            "username": updateData.username,
            "first_name": updateData.first_name,
            "last_name": updateData.last_name,
            "phone_number": updateData.phone_number
        }, {
            withCredentials: true
        });
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
        builder
            .addCase(login.pending, (state, action) => {
                state.isLoginLoading = true;
                state.isLoginError = false;
                state.isAuthenticated = false;
                state.access_token = "";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoginLoading = false;
                state.isLoginError = false;
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
                state.access_token = action.payload.data.access_token;
                // Cookies.set('access', action.payload.data.access_token);

            })
            .addCase(login.rejected, (state, action) => {
                state.isLoginLoading = false;
                state.isLoginError = true;
                state.isAuthenticated = false
                state.access_token = "";
            })


        builder
            .addCase(update.pending, (state, action) => {
                state.isLoginLoading = true;
                state.isLoginError = false;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.isLoginLoading = false;
                state.isLoginError = false;
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
                state.access_token = action.payload.data.access_token;
            })
            .addCase(update.rejected, (state, action) => {
                state.isLoginLoading = false;
                state.isLoginError = true;
                state.isAuthenticated = false;
                state.access_token = "";
            })
    },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer