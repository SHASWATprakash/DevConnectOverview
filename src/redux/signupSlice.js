// src/redux/signupSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import endpoints from '../services/endpoints';

// Async thunk for signup
export const signupUser = createAsyncThunk(
  'signup/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.auth.signup, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    // You can add other synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const selectSignupLoading = (state) => state.signup.loading;
export const selectSignupError = (state) => state.signup.error;
export const selectSignupSuccess = (state) => state.signup.success;

export default signupSlice.reducer;
