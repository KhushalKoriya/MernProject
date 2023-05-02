import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';


export const Resetpassword = (props) => {
    console.log(props.match);
    const { token } = useParams();
    console.log("token",token);
    const [password, setPassword] = useState('');
  // const [message, setMessage] = useState('');

//   useEffect(() => {
//     // const token = props.match.params.token;
//     console.log("token",token);
//     const checkToken = async () => {
//       const response = await axios.get(`http://localhost:8081/reset-password/${token}`);
//       setMessage(response.data.message);
//     };
//     checkToken();
//   }, [props.match.params.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token = props.match.params.token;
    const response = await fetch(`http://localhost:8081/reset-password/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();
    console.log(data);
    // const response = await axios.post(`http://localhost:8081/reset-password?${token}`, { password });
    // setMessage(response.data.message);
  };

  return (
    <div>
       <form onSubmit={handleSubmit}>
      <label htmlFor="password">New Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Reset Password</button>
    </form>
    <button className="ghost" id="signIn">
          <Link to="/Login">Go back to Home</Link>
          </button>
    </div>
  );
}
