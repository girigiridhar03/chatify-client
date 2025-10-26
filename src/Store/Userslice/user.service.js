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
      return response;
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
      const response = await API.post("/auth/signout");
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchUsers = createAsyncThunk(
  "searchUsers",
  async (searchValue, { rejectWithValue }) => {
    try {
      const searchResponse = await API.get(`/auth/users?search=${searchValue}`);

      return searchResponse?.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const groupSearch = createAsyncThunk(
  "groupSearch",
  async ({ searchValue, page }, { rejectWithValue }) => {
    try {
      const searchResponse = await API.get(
        `/auth/groupSearch?search=${searchValue}&page=${page}&limit=${4}`
      );

      return searchResponse?.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSingleUserDetails = createAsyncThunk(
  "singleUserDetails",
  async (userid, { rejectWithValue }) => {
    try {
      const response = await API.get(`/auth/user/${userid}`);

      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProfileDetails = createAsyncThunk(
  "updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.patch("/auth/user", formData, {
        header: { "Content-Type": "multipart/form-data" },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
