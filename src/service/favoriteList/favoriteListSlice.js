import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../apiService";
import { toast } from "react-toastify";

const initialState = {
  favorites: [],
  error: "",
};

export const addToReadingList = createAsyncThunk(
  "favorites/addBook",
  async (book, { rejectWithValue }) => {
    try {
      const response = await apiService.post("/favorites", book);
      toast.success("The book is added to the list.", {
        autoClose: 1000,
      });
      return response.data;
    } catch (error) {
      toast.error(error.message, { autoClose: 1000 });
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFavoriteBooks = createAsyncThunk(
  "favorites/getBooks",
  async () => {
    const response = await apiService.get("/favorites");
    return response.data;
  }
);

export const removeFavoriteBook = createAsyncThunk(
  "favorites/removeBook",
  async (bookId, { rejectWithValue }) => {
    try {
      await apiService.delete(`/favorites/${bookId}`);
      toast.success("The book has been removed.", {
        autoClose: 1000,
      });
      return bookId;
    } catch (error) {
      toast.error(error.message, { autoClose: 1000 });
      return rejectWithValue(error.response.data);
    }
  }
);

export const favoriteListSlice = createSlice({
  name: "favoriteList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToReadingList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToReadingList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favorites.push(action.payload);
      })
      .addCase(addToReadingList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(getFavoriteBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFavoriteBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favorites = action.payload;
      })
      .addCase(getFavoriteBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(removeFavoriteBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFavoriteBook.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favorites = state.favorites.filter(
          (book) => book.id !== action.payload
        );
      })
      .addCase(removeFavoriteBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default favoriteListSlice.reducer;
