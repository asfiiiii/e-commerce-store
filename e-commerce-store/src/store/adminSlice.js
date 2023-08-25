import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  currentOrder: null,
};
const adminSlice = createSlice({
  name: "orders",
  initialState: initialState,

  reducers: {
    fetchAllOrders(state, action) {
      state.orders = action.payload.order;
    },
    updateOrder(state, action) {
      const index = state.orders.findIndex(
        (order) => order.id === action.payload.order.id
      );
      state.orders[index] = action.payload.order;
    },
    showSortedOrders(state, action) {
      state.orders = action.payload.order;
    },
  },
});
export const adminActions = adminSlice.actions;

export default adminSlice;
