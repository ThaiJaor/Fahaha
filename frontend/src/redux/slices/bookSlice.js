import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./../../setup/axios.js";
import { toast } from "react-toastify";

const initialState = {
  books: [],
  categories: [],
  bookDetails: [],
  promotions: [],
  publishers:[],
  isLoadingBooks: false,
  isLoadingCategories: false,
  isLoadingBookDetails: false,
  isErrorBooks: false,
  isErrorCategories: false,
  isErrorBookDetails: false,
  isLoadingPromotions: false,
  isErrorPromotions:false,
  isLoadingPublishers: false,
  isErrorPublishers:false,
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      let allBooks = [];
      let nextUrl = "books/";
      // Lặp cho đến khi không còn trang tiếp theo
      while (nextUrl) {
        const response = await axios.get(nextUrl);
        allBooks = [...allBooks, ...response.data.results]; // Nối dữ liệu mới vào dữ liệu đã có
        nextUrl = response.data.next; // Cập nhật url của trang tiếp theo
      }
      return allBooks;
    } catch (error) {
      toast.error("Error fetching books");
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "books/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      let allCategories = [];
      let nextUrl = "categories/";
      // Lặp cho đến khi không còn trang tiếp theo
      while (nextUrl) {
        const response = await axios.get(nextUrl);
        allCategories = [...allCategories, ...response.data.results]; // Nối dữ liệu mới vào dữ liệu đã có
        nextUrl = response.data.next; // Cập nhật url của trang tiếp theo
      }
      return allCategories;
    } catch (error) {
      toast.error("Error fetching categories");
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPublishers = createAsyncThunk(
  "books/fetchPublishers",
  async (_, { rejectWithValue }) => {
    try {
      let allPublishers = [];
      let nextUrl = "publishers/";
      // Lặp cho đến khi không còn trang tiếp theo
      while (nextUrl) {
        const response = await axios.get(nextUrl);
        allPublishers = [...allPublishers, ...response.data.results]; // Nối dữ liệu mới vào dữ liệu đã có
        nextUrl = response.data.next; // Cập nhật url của trang tiếp theo
      }
      return allPublishers;
    } catch (error) {
      toast.error("Error fetching publishers");
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchAllBookDetails = createAsyncThunk(
  "books/fetchAllBookDetails",
  async (_, { rejectWithValue }) => {
    try {
      let allBookDetails = [];
      let nextUrl = "books/";
      // Lặp cho đến khi không còn trang tiếp theo
      while (nextUrl) {
        const response = await axios.get(nextUrl);
        const bookDetailsPromises = response.data.results.map((book) =>
          axios.get(`books/${book.id}/`)
        );
        const responses = await Promise.all(bookDetailsPromises);
        const bookDetails = responses.map((response) => response.data);
        allBookDetails = [...allBookDetails, ...bookDetails]; // Nối dữ liệu mới vào dữ liệu đã có
        nextUrl = response.data.next; // Cập nhật url của trang tiếp theo
      }
      return allBookDetails;
    } catch (error) {
      toast.error("Error fetching all book details");
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPromotions = createAsyncThunk(
  "books/fetchPromotions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/promotions/');
      return response.data.results;
    } catch (error) {
      toast.error("Error fetching promotions");
      return rejectWithValue(error.response.data);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoadingBooks = true;
        state.isErrorBooks = false;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoadingBooks = false;
        state.isErrorBooks = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.isLoadingBooks = false;
        state.isErrorBooks = true;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.isLoadingCategories = true;
        state.isErrorCategories = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoadingCategories = false;
        state.isErrorCategories = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoadingCategories = false;
        state.isErrorCategories = true;
      })
      .addCase(fetchAllBookDetails.pending, (state) => {
        state.isLoadingBookDetails = true;
        state.isErrorBookDetails = false;
      })
      .addCase(fetchAllBookDetails.fulfilled, (state, action) => {
        state.isLoadingBookDetails = false;
        state.isErrorBookDetails = false;
        state.bookDetails = action.payload;
      })
      .addCase(fetchAllBookDetails.rejected, (state) => {
        state.isLoadingBookDetails = false;
        state.isErrorBookDetails = true;
      })
      .addCase(fetchPromotions.pending, (state) => {
        state.isLoadingPromotions = true;
        state.isErrorPromotions = false;
      })
      .addCase(fetchPromotions.fulfilled, (state, action) => {
        state.isLoadingPromotions = false;
        state.isErrorPromotions = false;
        state.promotions = action.payload;
      })
      .addCase(fetchPromotions.rejected, (state) => {
        state.isLoadingPromotions = false;
        state.isErrorPromotions = true;
      })
      .addCase(fetchPublishers.pending, (state) => {
        state.isLoadingPublishers = true;
        state.isErrorPublishers = false;
      })
      .addCase(fetchPublishers.fulfilled, (state, action) => {
        state.isLoadingPublishers = false;
        state.isErrorPublishers = false;
        state.publishers = action.payload;
      })
      .addCase(fetchPublishers.rejected, (state) => {
        state.isLoadingPublishers = false;
        state.isErrorPublishers = true;
      })
  },
});

export default booksSlice.reducer;
