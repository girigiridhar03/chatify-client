import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API.JSX";

export const getAllNotifications = createAsyncThunk(
  "notifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/notification");

      let data = response?.data?.data;

      return {
        notification: data?.allNotifications,
        unReadCount: data?.notificationCount,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const viewNotification = createAsyncThunk(
  "viewNotification",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.put("/notification/view");

      if (response.status === 200) {
        dispatch(getAllNotifications());
      }
      console.log(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
