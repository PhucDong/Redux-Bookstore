import { configureStore } from "@reduxjs/toolkit";
import bookListSlice from "./bookList/bookListSlice";
import favoriteListSlice from "./favoriteList/favoriteListSlice";

const store = configureStore({
  reducer: {
    bookList: bookListSlice,
    favoriteList: favoriteListSlice,
  },
});

export default store;
