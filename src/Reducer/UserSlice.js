import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  userEmail: null,
  userUID: null,
  loading: false,
  darkMode: true,
  authenticated: false,
  cartItems: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserActive: (state) => {
      state.authenticated = true
    },

    setLogoutUser: (state) => {
      state.authenticated = false
      localStorage.clear();
    },

    setLoader: (state, action) => {
      state.loading = action.payload.loading;
    },

    setTheme: (state, action) => {
      state.darkMode = action.payload;
    },

    setCartItem: (state, action) => {
      state.cartItems = action.payload.cartItem;
    },
  },
});

// ✅ Exports
export const { setUserActive, setLogoutUser, setLoader, setTheme, setCartItem } = userSlice.actions;

export const selectUserName = (state) => state.user.userName;
export const selectUserEmail = (state) => state.user.userEmail;
export const loading = (state) => state.user.loading;
export const uid = (state) => state.user.userUID;
export const selectDarkMode = (state) => state.user.darkMode;

export default userSlice.reducer;
