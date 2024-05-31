import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  userOrders: [],
  orders: [],
  bag: [],
  bagPrice: 0,
  menu: []
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
      state.userOrders = [],
      state.orders = [],
      state.bag = [],
      state.bagPrice = 0
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setMenu: (state, action) => {
      state.menu = action.payload.menu;
    },
    setBag: (state, action) => {
      state.bag = action.payload.bag;
      state.bagPrice = action.payload.bagPrice;
    },
    setUserOrders: (state, action) => {
      state.userOrders = action.payload.userOrders
    },
    setOrders: (state, action) => {
      state.orders = action.payload.orders
    }
  }
})

export const { setLogin, setLogout, setUser, setBag, setMenu, setUserOrders, setOrders } = authSlice.actions;
export default authSlice.reducer;