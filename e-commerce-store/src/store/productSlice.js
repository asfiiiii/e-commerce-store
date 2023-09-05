import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  brands: [],
  category: [],
  selectedProduct: [],
  isLoading: false,
};
const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    loadingStart: (state) => {
      state.isLoading = true;
    },
    loadingEnd: (state) => {
      state.isLoading = false;
    },
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
    addNewProduct(state, action) {
      state.products.push(action.payload.product);
    },
    updateProduct(state, action) {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.product.id
      );
      state.products[index] = action.payload.product;
    },
    deleteProduct(state, action) {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.product.id
      );
      state.products[index] = action.payload.product;
    },
  },
});

export const isLoading = productSlice.isLoading;
export const productActions = productSlice.actions;
export default productSlice;
