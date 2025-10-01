import { createSlice } from "@reduxjs/toolkit";
import { accessChat, createGroup, fetchChats } from "./chat.service";

const initialState = {
  loading: false,
  searchLoading: false,
  chats: [],
  error: null,
};

const chatSlice = createSlice({
  name: "chatslice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChats.pending, (state, { payload }) => {
      state.searchLoading = !payload ? false : true;
      state.loading = !payload ? true : false;
    });
    builder.addCase(fetchChats.fulfilled, (state, { payload }) => {
      state.searchLoading = false;
      state.loading = false;
      state.chats = payload;
    });
    builder.addCase(fetchChats.rejected, (state, { payload }) => {
      state.searchLoading = false;
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(accessChat.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(accessChat.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(accessChat.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(createGroup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createGroup.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createGroup.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default chatSlice.reducer;
