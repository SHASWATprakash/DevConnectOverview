import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import endpoints from "../../services/endpoints";

const SignupForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ For navigation

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post(endpoints.auth.signup, form);
      console.log("✅ Signup successful:", response.data);

      // Optionally: auto-login or store token
      // const { token } = response.data;
      // localStorage.setItem("token", token);

      // ✅ Redirect to login page
      navigate("/login");
    } catch (err) {
      console.error("❌ Signup error:", err);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full p-2 border rounded"
      />
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
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
