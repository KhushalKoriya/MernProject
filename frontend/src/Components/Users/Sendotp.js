import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";

export const Sendotp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
// const [otp, setOTP] = useState('');
const sendOTP = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post('http://localhost:8081/otp', { email });
      alert('OTP sent successfully!');
      // navigate('/verifyotp')
    } catch (err) {
      console.log(err);
      alert('Failed to send OTP.');
    }
  };
  return (
    <>
      <form onSubmit={sendOTP}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send OTP</button>
      </form>
    </>
  );
};
