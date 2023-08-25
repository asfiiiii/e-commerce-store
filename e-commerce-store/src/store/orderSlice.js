import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  currentOrder: null,
};
const orderSlice = createSlice({
  name: "orders",
  initialState: initialState,

  reducers: {
    createNewOrder(state, action) {
      state.orders.push(action.payload.order);
      state.currentOrder = action.payload.order;
    },
    getUserOrder(state, action) {
      state.orders = action.payload.order;
    },
  },
});
export const orderActions = orderSlice.actions;

export default orderSlice;
