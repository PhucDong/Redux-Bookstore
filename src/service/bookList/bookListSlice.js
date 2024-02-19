import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../apiService";

const initialState = {
  books: [],
  error: "",
};

export const fetchBookData = createAsyncThunk(
  "books/fetchBooks",
  async (url) => {
    const response = await apiService.get(url);
    return response.data;
  }
);

export const bookListSlice = createSlice({
  name: "bookList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBookData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default bookListSlice.reducer;
