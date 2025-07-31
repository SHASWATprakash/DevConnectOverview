import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import React from "react"; // Import React

function App() {
  console.log('🅰️ App component rendered'); // Added log
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
