import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  currentOrder: null,
  userInfo: null,
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
    getUserDetails(state, action) {
      state.userInfo = action.payload.info;
    },
    updateUserAddress(state, action) {
      state.userInfo = action.payload.userAddress;
    },
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
export const orderActions = orderSlice.actions;

export default orderSlice;
