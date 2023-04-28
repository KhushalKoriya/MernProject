import React, { useState } from 'react';
import axios from 'axios';
// import AuthService from '../../services/authservice';

export const Forgotpassword = () => {
    const [email, setEmail] = useState('');
    // const [message, setMessage] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // AuthService.forgot(email)
      const response = await fetch('http://localhost:8081/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      // const response = await axios.post('http://localhost:8081/forgot-password', { email });
      // setMessage(response.data.message);
      const data = await response.json();
      console.log(data);
    };
  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {/* <p>{message}</p> */}
    </div>
  );
};
