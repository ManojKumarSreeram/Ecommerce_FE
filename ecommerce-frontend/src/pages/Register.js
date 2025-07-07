import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import './form.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'customer', // default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const res = await API.post('/auth/register', formData);
    if (res.status === 201 || res.status === 200) {
      navigate('/login');
    } else {
      setError('Unexpected error occurred.');
    }
  } catch (err) {
    if (err.response) {
      // Server responded with error
      setError(err.response.data.error || 'Registration failed.');
    } else if (err.request) {
      // No response from server
      setError('No response from server.');
    } else {
      // Other errors
      setError('Something went wrong.');
    }
    console.error('Registration error:', err);
  }
};


  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
