// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Retrieve stored credentials from local storage
    const storedId = localStorage.getItem('userId');
    const storedPassword = localStorage.getItem('userPassword');

    // Check if entered credentials match stored ones
    if (id === storedId && password === storedPassword) {
      localStorage.setItem('isLoggedIn', 'true'); // Set logged-in state
      navigate('/'); // Redirect to sticky notes page
    } else {
      setErrorMessage('Invalid ID or Password!');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <label>ID:</label>
        <input 
          type="text" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
          placeholder="Enter your ID" 
        />
      </div>
      <div>
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter your password" 
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
