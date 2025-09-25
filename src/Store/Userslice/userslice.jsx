import { createSlice } from "@reduxjs/toolkit";
import {
  getUserDetails,
  searchUsers,
  signin,
  signout,
  signup,
} from "./user.service";

const initialState = {
  loading: false,
  searchLoading: false,
  usersBySearch: [],
  error: null,
  userDetails: {},
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(signup.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signin.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(signin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userDetails = payload;
    });
    builder.addCase(getUserDetails.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(signout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signout.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.userDetails = {};
    });
    builder.addCase(signout.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(searchUsers.pending, (state) => {
      state.searchLoading = true;
    });
    builder.addCase(searchUsers.fulfilled, (state, { payload }) => {
      state.searchLoading = false;
      state.usersBySearch = payload;
    });
    builder.addCase(searchUsers.rejected, (state, { payload }) => {
      state.searchLoading = false;
      state.error = payload;
    });
  },
});

export default userSlice.reducer;
