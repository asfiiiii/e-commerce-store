import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalItems: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemtoCart(state, action) {
      state.cart.push(action.payload.items);
    },
    showCartItems(state, action) {
      state.cart = action.payload.items;
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
