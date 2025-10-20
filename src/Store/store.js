import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Userslice/userslice";
import chatReducer from "./ChatSlice/chatSlice";
import notificationReducer from "./NotificationSlice/notificationSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    authReducer,
    chatReducer,
    notificationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
