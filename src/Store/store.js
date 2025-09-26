import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Userslice/userslice";
import chatReducer from "./ChatSlice/chatSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    authReducer,
    chatReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
