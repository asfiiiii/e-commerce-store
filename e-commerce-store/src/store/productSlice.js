import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};
const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    showProducts(state, action) {
      state.products = action.payload.products;
    },
    // showFilteredProducts(state, action) {
    //   state.products = action.payload.products;
    // },
  },
});

export const productActions = productSlice.actions;
export default productSlice;
