import { createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "./chat.service";

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
  },
});

export default chatSlice.reducer;
