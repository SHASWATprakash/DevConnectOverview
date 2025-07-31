import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectLoginLoading, selectLoginError, selectLoginSuccess } from '../redux/loginSlice';
import { useNavigate } from 'react-router-dom';
// Removed unused useAuth import

const useLoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectLoginLoading);
  const error = useSelector(selectLoginError);
  const success = useSelector(selectLoginSuccess);
  // Removed unused user variable

  useEffect(() => {
    if (success) {
      // Navigation handled by AuthContext now
    }
  }, [success, navigate]);

  // Error handling effect remains in the hook to provide error state
  useEffect(() => {
    if (error) {
      // Error will be displayed in the component using the returned error state
    }
  }, [error]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useLoginForm;
