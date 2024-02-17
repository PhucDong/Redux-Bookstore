import { configureStore } from "@reduxjs/toolkit";
import { bookListSlice } from "./bookList/bookListSlice";

const store = configureStore({
  reducer: {
    bookList: bookListSlice,
  },
});

export default store;
