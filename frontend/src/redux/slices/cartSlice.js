import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "./../../setup/axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const fetchCartData = createAsyncThunk(
    'cart/fetchCartData',
    async () => {
        try {
            // Thực hiện gọi API và nhận data trả về
            const response = await axios.get('cart/');
            // Trả về data nhận được để được tự động gán vào state bởi Redux Toolkit

            return response.data;
        } catch (error) {
            // Xử lý lỗi nếu có
            throw error;
        }
    }
);

export const createCart = createAsyncThunk(
    'cart/create',
    async (bookData) => {
        try {
            const response = await axios.post('cart/', { item_id: bookData.item_id, quantity: bookData.quantity });
            return response.data;
        } catch (error) {
            // Xử lý lỗi nếu có
            toast.error(error);
            throw error;
        }
    }
)



export const updateCart = createAsyncThunk(
    'cart/update',
    async (bookData) => {
        console.log("bookData", bookData)
        try {
            const response = await axios.put(`cart/${bookData.item_id}/`, { item_id: bookData.item_id, quantity: +bookData.quantity });
            return response.data;
        } catch (error) {
            toast.error(error);
            throw error;
        }
    }
)
export const deleteCart = createAsyncThunk(
    'cart/delete',
    async (bookData) => {
        console.log("bookData", bookData)
        try {
            const response = await axios.delete(`cart/${bookData.item_id}/`);
            return response.data;
        } catch (error) {
            toast.error(error);
            throw error;
        }
    }
)

const initialState = {
    books: [],
    isLoading: false,
    isError: false,
    size: 0
};
const findBookIndexById = (state, id) => {
    for (let index = 0; index < state.books.length; index++) {
        if (state.books[index].id === id) {
            return index;
        }
    }
    return -1;
}
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartData.fulfilled, (state, action) => {
                // Cập nhật state với data nhận được từ API
                state.books = action.payload.items;
                state.isLoading = false;
                state.isError = false;
                state.size = action.payload.items.length;
            })
            .addCase(fetchCartData.pending, (state, action) => {
                // Đánh dấu là đang loading
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchCartData.rejected, (state, action) => {
                // Đánh dấu là có lỗi xảy ra
                state.isLoading = false;
                state.isError = true;
            });

        builder
            .addCase(createCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(createCart.pending, (state, action) => {
                // Đánh dấu là đang loading
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createCart.rejected, (state, action) => {
                // Đánh dấu là có lỗi xảy ra
                state.isLoading = false;
                state.isError = true;
            });
        builder
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(deleteCart.pending, (state, action) => {
                // Đánh dấu là đang loading
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(deleteCart.rejected, (state, action) => {
                // Đánh dấu là có lỗi xảy ra
                state.isLoading = false;
                state.isError = true;
            });

    },

});
export const { addBookToCart, removeBookFromCart, reduceBookQuantity } = cartSlice.actions;
export default cartSlice.reducer;
