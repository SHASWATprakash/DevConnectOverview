import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import LandingPage from "./pages/LandingPage";
import { ThemeProvider } from "./contexts/ThemeContext"; // Import ThemeProvider

function App() {
  return (
    <ThemeProvider> {/* Wrap with ThemeProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
