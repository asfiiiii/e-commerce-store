import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalItems: 0,
  cartLoaded: false,
  isLoading: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    loadingStart: (state) => {
      state.isLoading = true;
    },
    loadingEnd: (state) => {
      state.isLoading = false;
    },
    addItemtoCart(state, action) {
      state.cart.push(action.payload.items);
    },
    showCartItems(state, action) {
      state.cart = action.payload.items;
      state.cartLoaded = true;
    },
    updateCartItem(state, action) {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.items.id
      );
      state.cart[index] = action.payload.items;
    },
    removeItemFromCart(state, action) {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cart.splice(index, 1);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
