import { useState } from "react";
import { Link } from "react-router-dom"; // 👈 import Link
import api from "../../services/api.js";
import endpoints from "../../services/endpoints.js";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("🔧 Submitting login form with data:", form);

    try {
      const url = endpoints.auth.login;
      console.log("📡 Sending POST request to:", url);
      const response = await api.post(url, form);

      console.log("✅ Login successful:", response.data);

      const { token } = response.data;
      localStorage.setItem("token", token);
      // Optionally navigate or show success
    } catch (err) {
      console.error("❌ Login error:", err);
      console.log("🔍 Error response:", err.response);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* 👉 Signup link */}
      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
