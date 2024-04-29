import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "./../../setup/axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import bookJsonPath from "./data.json";
const initialState = {
    books: [...bookJsonPath],
    isLoading: false,
    isError: false,
    size: bookJsonPath.length
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
        addBookToCart: (state, action) => {

            const { id, quantity } = action.payload;
            if (id && quantity) {
                let data = { id: id, quantity: quantity };
                let index = findBookIndexById(state, id);
                if (index >= 0) {
                    let newQuantity = state.books[index].quantity + quantity;
                    state.books[index] = { ...state.books[index], quantity: newQuantity };
                    // state.books[index].quantity += quantity;
                }
                else {
                    let newBook = { id: id, quantity: quantity };
                    state.books.push(newBook);
                    state.size += 1;

                }
                // toast.success("add book successfully")

            }
            else {
                toast.error("fail to add book")
            }
        },
        removeBookFromCart: (state, action) => {
            const { id } = action.payload
            let index = findBookIndexById(state, id);
            if (index >= 0) {
                let currentBooks = [...state.books];
                currentBooks.splice(index, 1);
                state.books = currentBooks;
                state.size -= 1;
            } else {
                toast.error("fail to remove book from cart")
            }
        },
        reduceBookQuantity: (state, action) => {
            const { id, quantity } = action.payload
            let index = findBookIndexById(state, id);
            if (index >= 0) {
                let bookItem = state.books[index];
                if (bookItem.quantity > quantity && bookItem.quantity > 1) {
                    bookItem.quantity -= quantity;
                    state.books[index] = { ...bookItem };
                }
            } else {
                toast.error("book not found")
            }
        },
        updateBookQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            let index = findBookIndexById(state, id);

            if (index >= 0) {
                if (quantity > 1) {
                    state.books[index] = { ...state.books[index], quantity };
                }
                else {
                    toast.warning('the minimum number of this book is 1')
                }

            } else {
                toast.error('The Book is not in the Cart');
            }
        }

    },
    extraReducers: (builder) => {

    },
});
export const { addBookToCart, removeBookFromCart, reduceBookQuantity, updateBookQuantity } = cartSlice.actions;
export default cartSlice.reducer;
