// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './signupSlice';
import loginReducer from './loginSlice'; // Import the login reducer
import projectsReducer from './projectsSlice'; // Import the projects reducer

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer, // Add the login reducer
    projects: projectsReducer, // Add the projects reducer
  },
});
