import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    users: authSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
    admin: adminSlice.reducer,
  },
});

export default store;
