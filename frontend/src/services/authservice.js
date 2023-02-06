import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const register = (user) => {
    const {name, email, password} = {...user};
    return axios.post("http://localhost:8081/Register", {
      name,
      email,
      password,
    });
  };

  const AuthService = {
    register
  }
  
  export default AuthService;


  
