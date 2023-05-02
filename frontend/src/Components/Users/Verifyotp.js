import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from "react-router";
export const Verifyotp = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const { token } = useParams();
    const verifyOTP = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8081/otp/verify/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp }),
    });

    const data = await response.json();
    console.log(data);
    alert(data.msg);
    navigate("/Login")
      console.log("JSON.stringify({ otp })",JSON.stringify({ otp }));
        // try {
        //   const response = await axios.post(`http://localhost:8081/otp/verify/${token}`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ otp }),
        //   });
        //   const data = await response.json();
        //   console.log(data);
        //   alert(data.msg);
        // //   navigate("/Login");
        // } catch (err) {
        //   console.log(err);
        //   alert('OTP verification failed.');
        // }
      };
  return (
    <>
       <form onSubmit={verifyOTP}>
      <label>OTP:</label>
      <input type="text" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button type="submit">Verify OTP</button>
    </form>
    </>
  );
};
