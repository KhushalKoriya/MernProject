import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import UserRegisterContex from "../Store/UserRegisterContex";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

export const Login = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserRegisterContex);

  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage:
          'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")',
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Login Account
                  </h2>

                  <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={Yup.object({
                      email: Yup.string()
                        .required("Email field is required !")
                        .email("Invalid email format"),
                      password: Yup.string()
                        .required("Password field is required !")
                        .min(8, "Password must be at least 8 characters"),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                      try {
                        const user = state.registerdata.find(
                          (u) => u.email === values.email
                        );
                        console.log(user);
                        if (user !== undefined) {
                          if (user.password === values.password) {
                            navigate("/Homepage");
                          } else {
                            Swal.fire("Wrong Password");
                          }
                        } else {
                          Swal.fire("Invalid Credentials");
                        }
                        let userdata = {
                          isLogin: true,
                          user,
                        };
                        dispatch({
                          type: "LOGIN",
                          payload: userdata,
                        });
                      } catch (e) {
                        if (e.response.state.registerdata !== undefined) {
                          Swal.fire(
                            e.response.state.registerdata.message,
                            "",
                            "error"
                          );
                        }
                      }
                    }}
                  >
                    {({ values, handleChange }) => (
                      <Form>
                        <div className="form-outline mb-4">
                          <Field
                            type="email"
                            className="form-control form-control-lg"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                          />
                          <label className="form-label">Your Email</label>
                        </div>
                        <span>
                          <ErrorMessage name="email" />
                        </span>
                        <div className="form-outline mb-4">
                          <Field
                            type="password"
                            className="form-control form-control-lg"
                            name="password"
                            onChange={handleChange}
                            value={values.password}
                          />
                          <label className="form-label">Password</label>
                        </div>
                        <span>
                          <ErrorMessage name="password" />
                        </span>
                        <div className="d-flex justify-content-center">
                          <button
                            type="submit"
                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                          >
                            Login
                          </button>
                        </div>
                        <p className="text-center text-muted mt-5 mb-0">
                          For Create New Account{" "}
                          <a className="fw-bold text-body">
                            <u>
                              <Link to="/Register">Register Here</Link>
                            </u>
                          </a>
                        </p>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
