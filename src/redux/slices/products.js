import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "posts/fetchProducts",
  async () => {
    const { data } = await axios.get(
      "https://products-b18c8-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    );
    const products = [];
    for (let key in data) {
      const product = {
        id: key,
        ...data[key],
      };
      products.push(product);
    }

    const filter = localStorage.getItem("filter");

    if (filter == "count") {
      return products.sort((a, b) => {
        if (a.count < b.count) {
          return 1;
        }
        if (a.count > b.count) {
          return -1;
        }
        return 0;
      });
    }

    return products.sort((a, b) => {
      if (a.name.toLowerCase() > a.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  }
);

const initialState = {
  products: {
    items: [],
    status: "loading",
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.products.items = [];
      state.products.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products.items = action.payload;
      state.products.status = "loaded";
    },
    [fetchProducts.rejected]: (state) => {
      state.products.items = [];
      state.products.status = "error";
    },
  },
});

export const productsReducer = productsSlice.reducer;
