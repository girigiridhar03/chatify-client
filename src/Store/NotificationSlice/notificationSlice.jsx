import { createSlice } from "@reduxjs/toolkit";
import { getAllNotifications } from "./notification.service";
import { signout } from "../Userslice/user.service";

const initialState = {
  loading: false,
  error: null,
  notification: [],
  notificationCount: null,
  notificationLoading: false,
  notificationToggle: false,
};

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    setNotification: (state, { payload }) => {
      state.notification.unshift(payload);
    },
    setNotificationCount: (state, { payload }) => {
      state.notificationCount = payload;
    },
    setNotificationToggle: (state, { payload }) => {
      state.notificationToggle = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotifications.pending, (state) => {
      state.notificationLoading = true;
    });
    builder.addCase(getAllNotifications.fulfilled, (state, { payload }) => {
      state.notificationLoading = false;
      state.notification = payload?.notification;
      state.notificationCount = payload?.unReadCount;
    });
    builder.addCase(getAllNotifications.rejected, (state, { payload }) => {
      state.notificationLoading = false;
      state.error = payload;
    });
    builder.addCase(signout.fulfilled, () => initialState);
  },
});

export const { setNotification, setNotificationToggle, setNotificationCount } =
  notificationSlice.actions;

export default notificationSlice.reducer;
