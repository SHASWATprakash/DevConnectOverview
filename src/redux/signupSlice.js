import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api'; // Assuming your api service
import endpoints from '../services/endpoints';

// Async thunk for user signup
export const signupUser = createAsyncThunk(
  'signup/signupUser',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.auth.signup, { username, email, password });
      return response.data; // Assuming your API returns some data upon successful signup
    } catch (error) {
      // Handle API errors
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
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
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        // You might want to do something with action.payload here if needed
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
