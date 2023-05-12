import React, { useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import './login.css'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const history = useHistory();
   

    try {
      const response = await axios.post('http://localhost:5000/login', `email=${email}&password=${password}`,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log(response)
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      
      window.location.href = '/search';
        // history.push('/login');
      
    } catch (err) {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <p>Not a user?<a href='/signup'>Signup</a></p>
      </div>
      
    </div>
    
  );
};

export default LoginForm;
