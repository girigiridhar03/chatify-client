import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API.JSX";

export const signup = createAsyncThunk(
  "signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/signup", formData, {
        header: { "Content-Type": "multipart/form-data" },
      });
      if (response?.status === 201) {
        window.location.href = "/signin";
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signin = createAsyncThunk(
  "signin",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/signin", formData);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/auth/user");
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signout = createAsyncThunk(
  "signout",
  async (_, { rejectWithValue }) => {
    try {
      await API.post("/auth/signout");
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchUsers = createAsyncThunk(
  "searchUsers",
  async (searchValue, { rejectWithValue }) => {
    try {
      const searchResponse = await API.get(
        `/api/auth/users?search=${searchValue}`
      );

      return searchResponse?.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
