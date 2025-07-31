// src/hooks/useSignupFormViewModel.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, selectSignupLoading, selectSignupError, selectSignupSuccess } from '../redux/signupSlice';
import { useNavigate } from 'react-router-dom';

const useSignupFormViewModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const loading = useSelector(selectSignupLoading);
  const error = useSelector(selectSignupError);
  const success = useSelector(selectSignupSuccess);

  // Effect to navigate on successful signup
  useEffect(() => {
    if (success) {
      navigate('/login');
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(form));
  };

  return {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useSignupFormViewModel;
