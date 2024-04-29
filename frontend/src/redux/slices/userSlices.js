import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "./../../setup/axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const initialState = {
    user: {},
    isLoading: false,
    isError: false,
    isAuthenticated: false,
    access_token: "",
    first_access_url: window.location.pathname,
};
export const fetchUser = createAsyncThunk("users/fetchUserStatus", async () => {
    const response = await axios.get("user/info/");
    return response.data;
});

export const register = createAsyncThunk(
    "user/registerStatus",
    async (registerData) => {
        const response = await axios.post("user/register/", registerData, {
            withCredentials: true,
        });
        return response.data;
    }
);
export const logout = createAsyncThunk("users/logoutUserStatus", async () => {
    const response = await axios.post("user/logout/");
    localStorage.removeItem("access");
    return response.data;
});

export const login = createAsyncThunk("user/loginStatus", async (loginData) => {
    const response = await axios.post("user/login/", {
        email: loginData.email,
        password: loginData.password,
    });
    return response.data;
});

export const update = createAsyncThunk(
    "user/updateStatus",
    async (updateData) => {
        const response = await axios.put("user/info/", {
            email: updateData.email,
            username: updateData.username,
            first_name: updateData.first_name,
            last_name: updateData.last_name,
            phone_number: updateData.phone_number,
        });
        if (response.status !== 200) {
            toast.error(response.data.detail);
        } else {
            toast.success(response.data.detail);
        }
        return response.data;
    }
);

export const updatePassword = createAsyncThunk(
    "user/updatePasswordStatus",
    async (passwordData) => {
        const response = await axios.post("user/change-password/", {
            old_password: passwordData.old_password,
            new_password: passwordData.new_password,
            confirm_new_password: passwordData.confirm_new_password,
        });
        response.data.status = response.status;
        return response.data;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.isAuthenticated = false;
                state.isLoading = true;
                state.isError = false;
                state.access_token = "";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
                state.access_token = action.payload.data.access_token;
                window.localStorage.setItem("access", action.payload.data.access_token);
                toast.success(action.payload.detail);
                // Cookies.set('access', action.payload.data.access_token);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isAuthenticated = false;
                state.access_token = "";
            });

        builder
            .addCase(update.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.user = action.payload.data;
                state.isAuthenticated = true;
            })
            .addCase(update.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isAuthenticated = false;
                state.access_token = "";
            });

        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.isAuthenticated = false;
                state.user = {};
                state.access_token = "";
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isError = false;
                state.isLoading = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.access_token = "";
                state.user = {};
                state.isError = true;
                state.isLoading = false;
            });

        builder
            .addCase(updatePassword.pending, (state, action) => {
                state.user = {};
                state.access_token = "";
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.access_token = "";
                state.user = {};
                state.isError = false;
                toast.success(action.payload.detail);
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                toast.error("update password unsuccessfully");
            });
        builder
            .addCase(logout.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isAuthenticated = false;
                state.access_token = "";
                state.user = {};
                state.isError = false;
                state.isLoading = false;
                toast.success(action.payload.detail);

            })
            .addCase(logout.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                toast.error("logout unsuccessfully");
            });
        builder
            .addCase(register.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                // Cập nhật thông tin người dùng và access token từ payload
                state.user = action.payload.data.user;
                state.access_token = action.payload.data.access_token;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
        // dáldafslasdp
    },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer;
