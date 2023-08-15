import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    users: userSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
