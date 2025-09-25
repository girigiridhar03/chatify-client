import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Userslice/userslice";

const store = configureStore({
  reducer: {
    authReducer,
  },
});

export default store;
