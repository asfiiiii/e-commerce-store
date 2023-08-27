import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUsers: null,
  errors: null,
  checkedUsers: false,
  // authUsers: [],
};
const userSlice = createSlice({
  name: "loggedUsers",
  initialState: initialState,

  reducers: {
    createNewUser(state, action) {
      state.loggedUsers = action.payload.loggedUser;
    },

    loginUserSuccess(state, action) {
      state.loggedUsers = action.payload.loggedUser;
      state.errors = null;
    },
    loginUserError(state, action) {
      state.errors = action.payload.error;
    },
    checkUser(state, action) {
      state.loggedUsers = action.payload.loggedUser;
      state.checkedUsers = true;
    },

    logoutUser(state) {
      state.loggedUsers = null;
    },
  },
});
export const authActions = userSlice.actions;

export default userSlice;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   loggedUsers: null,
//   errors: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState: initialState,

//   reducers: {
//     createNewUser(state, action) {
//       state.loggedUsers = action.payload.loggedUser;
//     },
//     loginUserSuccess(state, action) {
//       state.loggedUsers = action.payload.loggedUser;
//       state.errors = null;
//     },
//     loginUserError(state, action) {
//       state.errors = action.payload.error;
//     },
//   },
// });

// export const userActions = userSlice.actions;
// export default userSlice.reducer;
