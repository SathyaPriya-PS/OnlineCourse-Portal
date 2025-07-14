import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password,
      });

       if (res.data.message === 'Login successful') {
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    }
  } catch (err) {
    toast.error('Login failed. Check your credentials.');
  }
};


  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
