import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    getUserDetails(state, action) {
      state.currentUser = action.payload.info;
    },
    updateUserAddress(state, action) {
      state.currentUser = action.payload.userAddress;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
