import { createSlice } from "@reduxjs/toolkit";
import {
  getSingleUserDetails,
  getUserDetails,
  groupSearch,
  searchUsers,
  signin,
  signout,
  signup,
  updateProfileDetails,
} from "./user.service";

const initialState = {
  loading: false,
  searchLoading: false,
  usersBySearch: [],
  error: null,
  userDetails: JSON.parse(localStorage.getItem("user")) || {},
  searchValue: "",
  groupSearchValue: "",
  groupSearchUsers: [],
  toggleModalVal: false,
  singleUserDetails: {},
  profileModalToggle: false,
  profileId: "",
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSearchValue: (state, { payload }) => {
      state.searchValue = payload;
    },
    setGroupSearchValue: (state, { payload }) => {
      state.groupSearchValue = payload;
    },
    setToggleModal: (state, { payload }) => {
      state.toggleModalVal = payload;
    },
    resetStates: (state) => {
      state.groupSearchUsers = [];
    },
    setProfileToggleModal: (state, { payload }) => {
      state.profileModalToggle = payload;
    },
    setProfileId: (state, { payload }) => {
      state.profileId = payload;
    },
  },
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
    builder.addCase(getSingleUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingleUserDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.singleUserDetails = payload;
    });
    builder.addCase(getSingleUserDetails.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(signout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signout.fulfilled, () => {
      return initialState;
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
    builder.addCase(groupSearch.pending, (state) => {
      state.searchLoading = true;
    });
    builder.addCase(groupSearch.fulfilled, (state, { payload }) => {
      state.searchLoading = false;
      state.groupSearchUsers = payload;
    });
    builder.addCase(groupSearch.rejected, (state, { payload }) => {
      state.searchLoading = false;
      state.error = payload;
    });
    builder.addCase(updateProfileDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfileDetails.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateProfileDetails.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
export const {
  setSearchValue,
  setGroupSearchValue,
  setToggleModal,
  resetStates,
  setProfileId,
  setProfileToggleModal,
} = userSlice.actions;
export default userSlice.reducer;
