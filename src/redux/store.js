import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/products";
// import { authReducer } from "./slices/auth";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
