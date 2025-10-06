import { createSlice } from "@reduxjs/toolkit";
import {
  accessChat,
  createGroup,
  fetchAllMessages,
  fetchChats,
  getSingleChatDetails,
} from "./chat.service";
import { signout } from "../Userslice/user.service";

export const initialState = {
  loading: false,
  searchLoading: false,
  chats: [],
  error: null,
  singleChatDetails: {},
  selectedChat: "",
  allMessages: [],
  sendMessageValue: "",
};

const chatSlice = createSlice({
  name: "chatslice",
  initialState,
  reducers: {
    setSelectedChat: (state, { payload }) => {
      state.selectedChat = payload;
    },
    setSendMessageValue: (state, { payload }) => {
      state.sendMessageValue = payload;
    },
  },
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
    builder.addCase(getSingleChatDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingleChatDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.singleChatDetails = payload;
    });
    builder.addCase(getSingleChatDetails.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(fetchAllMessages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllMessages.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.allMessages = payload;
    });
    builder.addCase(fetchAllMessages.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(signout.fulfilled, () => initialState);
  },
});

export const { setSelectedChat, setSendMessageValue } = chatSlice.actions;

export default chatSlice.reducer;
