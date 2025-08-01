import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import projectService from '../services/projectService'; // Import projectService
import endpoints from '../services/endpoints';
// Async thunk for user login
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.auth.login, { email, password });
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      return response.data; // Should include user data
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
    'login/updateUserProfile',
    async ({ userId, profileData }, { rejectWithValue, dispatch }) => {
        try {
            const response = await projectService.updateUserProfile(userId, profileData); // Use service function
            dispatch(setLoginUser(response.data)); // Update user in Redux state
            return response.data;
        } catch (error) {
             if (error.response && error.response.data && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
             } else {
                return rejectWithValue(error.message);
             }
        }
    }
);

// Async thunk to search users
export const searchUsers = createAsyncThunk(
    'login/searchUsers',
    async (searchTerm, { rejectWithValue }) => {
        try {
            const response = await projectService.searchUsers(searchTerm); // Use service function
            return response; // Assuming the response is an array of matching users
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    error: null,
    success: false,
    user: null,
    userSearchResults: [], // New state for user search results
  },
  reducers: {
    setLoginUser: (state, action) => {
      state.user = action.payload;
    },
    clearLoginUser: (state) => {
      state.user = null;
      sessionStorage.removeItem('token');
    },
    clearUserSearchResults: (state) => { // New reducer to clear user search results
        state.userSearchResults = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.user = null;
        sessionStorage.removeItem('token');
      })
      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
      })
      // Search Users
      .addCase(searchUsers.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.userSearchResults = []; // Clear previous results
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.userSearchResults = action.payload; // Set search results
      })
      .addCase(searchUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.userSearchResults = []; // Clear results on error
      });
  },
});

export const { setLoginUser, clearLoginUser, clearUserSearchResults } = loginSlice.actions;
export const selectLoginLoading = (state) => state.login.loading;
export const selectLoginError = (state) => state.login.error;
export const selectLoginSuccess = (state) => state.login.success;
export const selectLoggedInUser = (state) => state.login.user;
export const selectUserSearchResults = (state) => state.login.userSearchResults; // New selector

export default loginSlice.reducer;
