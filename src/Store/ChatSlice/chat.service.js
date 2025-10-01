import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API.JSX";
import { setToggleModal } from "../Userslice/userslice";

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

export const accessChat = createAsyncThunk(
  "accessChat",
  async (userid, { rejectWithValue }) => {
    try {
      const response = await API.post(`/chat/access/${userid}`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createGroup = createAsyncThunk(
  "createGroup",
  async ({ chatName, users }, { rejectWithValue, dispatch }) => {
    try {
      await API.post("/chat/createGroup", { chatName, users });
      dispatch(fetchChats());
      dispatch(setToggleModal(false));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
