import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API.JSX";

export const fetchChats = createAsyncThunk(
  "fetchChats",
  async (searchValue, { rejectWithValue }) => {
    let url = `/chat/fetchchats`;
    if (searchValue) {
      url = url + `?username=${searchValue}`;
    }

    try {
      const response = await API.get(url);
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
