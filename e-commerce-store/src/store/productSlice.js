import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  brands: [],
  category: [],
  selectedProduct: [],
};
const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    showProducts(state, action) {
      state.products = action.payload.products;
    },
    showBrands(state, action) {
      state.brands = action.payload.brands;
    },
    showCategory(state, action) {
      state.category = action.payload.category;
    },
    showSelected(state, action) {
      state.selectedProduct = action.payload.selectedProduct;
    },
    // showFilteredProducts(state, action) {
    //   state.products = action.payload.products;
    // },
  },
});

export const productActions = productSlice.actions;
export default productSlice;
