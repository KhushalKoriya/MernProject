import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/authservice";
import Usercontex from "../Store/Usercontex";
import "./Login.css";


export const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(Usercontex);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  console.log("user",user);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const validationLoginHandler = () => {
    if (!user.email || !user.password) {
      setSuccessful(false);
      setMessage("All fields are required!");
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
      setSuccessful(false);
      setMessage("Please enter valid email.");
      return false;
    }
    if (user.password.length < 6 || user.password.length > 40) {
      setSuccessful(false);
      setMessage("The password must be between 6 and 40 characters.");
      return false;
    }
    return true;
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    var formIsValid = validationLoginHandler();
    if (formIsValid) {
      AuthService.login(user).then((response) => {   
        console.log(response.sessUser.token);
        setUserData({
          isLoggedIn:true,
          token:response.sessUser.token,
      });
      // localStorage.setItem("auth-token", response.sessUser.token);
          navigate("/Homepage"); 
      });
    }
  };

  return (
    // <section
    //   className="vh-100 bg-image"
    //   style={{
    //     backgroundImage:
    //       'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")',
    //   }}
    // >
    //   <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    //     <div className="container h-100">
    //       <div className="row d-flex justify-content-center align-items-center h-100">
    //         <div className="col-12 col-md-9 col-lg-7 col-xl-6">
    //           <div className="card" style={{ borderRadius: "15px" }}>
    //             <div className="card-body p-5">
    //               <h2 className="text-uppercase text-center mb-5">
    //                 Login Account
    //               </h2>
    //               <form onSubmit={loginSubmitHandler}>
    //                 {message && (
    //                   <div className="form-group">
    //                     <div
    //                       className={
    //                         successful
    //                           ? "alert alert-success"
    //                           : "alert alert-danger"
    //                       }
    //                       role="alert"
    //                     >
    //                       {message}
    //                     </div>
    //                   </div>
    //                 )}
    //                 <div className="form-outline mb-4">
    //                   <input
    //                     type="email"
    //                     className="form-control form-control-lg"
    //                     name="email"
    //                     onChange={onChangeHandler}
    //                     value={user.email}
    //                   />
    //                   <label className="form-label">Your Email</label>
    //                 </div>

    //                 <div className="form-outline mb-4">
    //                   <input
    //                     type="password"
    //                     className="form-control form-control-lg"
    //                     name="password"
    //                     onChange={onChangeHandler}
    //                     value={user.password}
    //                   />
    //                   <label className="form-label">Password</label>
    //                 </div>

    //                 <div className="d-flex justify-content-center">
    //                   <button
    //                     type="submit"
    //                     className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
    //                   >
    //                     Login
    //                   </button>
    //                 </div>
    //                 <p className="text-center text-muted mt-5 mb-0">
    //                   For Create New Account{" "}
    //                   <a className="fw-bold text-body">
    //                     <u>
    //                       <Link to="/Register">Register Here</Link>
    //                     </u>
    //                   </a>
    //                 </p>
    //               </form>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <div className="container" id="container">
       <div className="form-container sign-in-container">
      <form  onSubmit={loginSubmitHandler}>
         <h1>Sign in</h1>
        {/* <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your account</span> */}
          {message && (
                      <div className="form-group">
                        <div
                          className={
                            successful
                              ? "alert alert-success"
                              : "alert alert-danger"
                          }
                          role="alert"
                        >
                          {message}
                        </div>
                      </div>
                    )}
        <input type="email" placeholder="Email"   value={user.email}  onChange={onChangeHandler} name="email"/>
        <input type="password" placeholder="Password" value={user.password}  onChange={onChangeHandler}  name="password" />
        <Link to='/forgot-password'>Forgot your password?</Link>
        <button>Sign In</button>
      </form>
    </div>
    <div className="overlay-container">
      <div className="overlay">
      <div className="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button className="ghost" id="signUp">
          <Link to="/Register">Sign Up</Link>
          </button>
        </div>
        </div></div>
      </div>
  );
};

