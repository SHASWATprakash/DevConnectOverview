// src/hooks/useLoginFormViewModel.js
import { useState } from 'react';
import api from '../services/api';
import endpoints from '../services/endpoints';

const useLoginFormViewModel = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
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
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useLoginFormViewModel;
