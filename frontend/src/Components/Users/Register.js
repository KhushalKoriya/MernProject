import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./Register.css";
import AuthService from "../../services/authservice";
import Usercontex from "../Store/Usercontex";


export const Register = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(Usercontex);
  const [enteredValue, setEnteredValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const redirect =()=>{
    navigate('/')
  }
  const validationRegisterHandler = () => {
    if (!enteredValue.name || !enteredValue.email || !enteredValue.password) {
      setSuccessful(false);
      setMessage("All fields Are required!");
      return false;
    }
    if (
      enteredValue.name.length < 2 ||
      enteredValue.name.length > 20
    ) {
      setSuccessful(false);
      setMessage("The name must be between 2 and 20 characters.");
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(enteredValue.email)) {
      setSuccessful(false);
      setMessage("Please enter valid email.");
      return false;
    }
    if (enteredValue.password.length < 8 || enteredValue.password.length > 40) {
      setSuccessful(false);
      setMessage("The password must be between 6 and 40 characters.");
      return false;
    }
    return true;
  };
  const submitHandler = (e) => {
    e.preventDefault();
    var formIsValidate = validationRegisterHandler();
    if (formIsValidate) {
      AuthService.register(enteredValue).then((response) => {
        console.log(response);
        setMessage(response.data.message);
        setSuccessful(true);
        setEnteredValue({
          name: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/sendotp");
        }, 5000);
        //  setUserData({
        //         token: response.sessUser.token,
        //     });
            // localStorage.setItem("auth-token", response.sessUser.token);
      });
    }
  };
  const valueChangeHandler = (e) => {
    setEnteredValue({
      ...enteredValue,
      id: Math.random().toString(),
      [e.target.name]: e.target.value,
    });
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
    //                 Create an account
    //               </h2>
    //               <form onSubmit={submitHandler}>
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
    //                     type="text"
    //                     className="form-control form-control-lg"
    //                     name="name"
    //                     value={enteredValue.name}
    //                     onChange={valueChangeHandler}
    //                   />
    //                   <label className="form-label">Your Name</label>
    //                 </div>
    //                 <div className="form-outline mb-4">
    //                   <input
    //                     type="email"
    //                     className="form-control form-control-lg"
    //                     name="email"
    //                     value={enteredValue.email}
    //                     onChange={valueChangeHandler}
    //                   />
    //                   <label className="form-label">Your Email</label>
    //                 </div>
    //                 <div className="form-outline mb-4">
    //                   <input
    //                     type="password"
    //                     className="form-control form-control-lg"
    //                     name="password"
    //                     value={enteredValue.password}
    //                     onChange={valueChangeHandler}
    //                   />
    //                   <label className="form-label">Password</label>
    //                 </div>
    //                 <div className="d-flex justify-content-center">
    //                   <button
    //                     type="submit"
    //                     className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
    //                   >
    //                     Register
    //                   </button>
    //                 </div>
    //                 <p className="text-center text-muted mt-5 mb-0">
    //                   Have already an account?{" "}
    //                   <a className="fw-bold text-body">
    //                     <u>
    //                       <Link to="/Login">Login here</Link>
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
//     <section className="vh-100 gradient-custom">
//   <div className="container py-5 h-100">
//     <div className="row justify-content-center align-items-center h-100">
//       <div className="col-12 col-lg-9 col-xl-7">
//         <div
//           className="card shadow-2-strong card-registration"
//           style={{ borderRadius: 15 }}
//         >
//           <div className="card-body p-4 p-md-5">
//             <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
//             <form>
//               <div className="row">
//                 <div className="col-md-6 mb-4">
//                   <div className="form-outline">
//                     <input
//                       type="text"
//                       id="firstName"
//                       className="form-control form-control-lg"
//                     />
//                     <label className="form-label" htmlFor="firstName">
//                       First Name
//                     </label>
//                   </div>
//                 </div>
//                 <div className="col-md-6 mb-4">
//                   <div className="form-outline">
//                     <input
//                       type="text"
//                       id="lastName"
//                       className="form-control form-control-lg"
//                     />
//                     <label className="form-label" htmlFor="lastName">
//                       Last Name
//                     </label>
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-6 mb-4 d-flex align-items-center">
//                   <div className="form-outline datepicker w-100">
//                     <input
//                       type="text"
//                       className="form-control form-control-lg"
//                       id="birthdayDate"
//                     />
//                     <label htmlFor="birthdayDate" className="form-label">
//                       Birthday
//                     </label>
//                   </div>
//                 </div>
//                 <div className="col-md-6 mb-4">
//                   <h6 className="mb-2 pb-1">Gender: </h6>
//                   <div className="form-check form-check-inline">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="inlineRadioOptions"
//                       id="femaleGender"
//                       defaultValue="option1"
//                       defaultChecked=""
//                     />
//                     <label className="form-check-label" htmlFor="femaleGender">
//                       Female
//                     </label>
//                   </div>
//                   <div className="form-check form-check-inline">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="inlineRadioOptions"
//                       id="maleGender"
//                       defaultValue="option2"
//                     />
//                     <label className="form-check-label" htmlFor="maleGender">
//                       Male
//                     </label>
//                   </div>
//                   <div className="form-check form-check-inline">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="inlineRadioOptions"
//                       id="otherGender"
//                       defaultValue="option3"
//                     />
//                     <label className="form-check-label" htmlFor="otherGender">
//                       Other
//                     </label>
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-6 mb-4 pb-2">
//                   <div className="form-outline">
//                     <input
//                       type="email"
//                       id="emailAddress"
//                       className="form-control form-control-lg"
//                     />
//                     <label className="form-label" htmlFor="emailAddress">
//                       Email
//                     </label>
//                   </div>
//                 </div>
//                 <div className="col-md-6 mb-4 pb-2">
//                   <div className="form-outline">
//                     <input
//                       type="tel"
//                       id="phoneNumber"
//                       className="form-control form-control-lg"
//                     />
//                     <label className="form-label" htmlFor="phoneNumber">
//                       Phone Number
//                     </label>
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-12">
//                   <select className="select form-control-lg">
//                     <option value={1} disabled="">
//                       Choose option
//                     </option>
//                     <option value={2}>Subject 1</option>
//                     <option value={3}>Subject 2</option>
//                     <option value={4}>Subject 3</option>
//                   </select>
//                   <label className="form-label select-label">
//                     Choose option
//                   </label>
//                 </div>
//               </div>
//               <div className="mt-4 pt-2">
//                 <input
//                   className="btn btn-primary btn-lg"
//                   type="submit"
//                   defaultValue="Submit"
//                 />
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>
<>
  {/* Hello world */}
  <div className="container" id="container">
    <div className="form-container sign-up-container">
      <form onSubmit={submitHandler}>
        <h1>Create Account</h1>
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
        </div> */}
        {/* <span>or use your email for registration</span> */}
        <input type="text" placeholder="Name" onChange={valueChangeHandler} value={enteredValue.name} name="name"/>
        <input type="email" placeholder="Email" onChange={valueChangeHandler} name="email" value={enteredValue.email}/>
        <input type="password" placeholder="Password" onChange={valueChangeHandler} name="password" value={enteredValue.password}/>
        <button  type="submit">Sign Up</button>
      </form>
    </div>
    {/* <div className="form-container sign-in-container">
      <form action="#">
        <h1>Sign in</h1>
        <div className="social-container">
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
        <span>or use your account</span>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div> */}
    <div className="overlay-container">
      <div className="overlayy">
        <div className="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button className="ghost" id="signIn">
          <Link to="/Login">Sign In</Link>
          </button>
        </div>
        {/* <div className="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button className="ghost" id="signUp" >
            Sign Up
          </button>
        </div> */}
      </div>
    </div>
  </div>
  {/* <footer>
    <p>
      Created with <i className="fa fa-heart" /> by
      <a target="_blank" href="https://florin-pop.com">
        Florin Pop
      </a>
      - Read how I created this and how you can join the challenge
      <a
        target="_blank"
        href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/"
      >
        here
      </a>
      .
    </p>
  </footer> */}
</>


  );
};
