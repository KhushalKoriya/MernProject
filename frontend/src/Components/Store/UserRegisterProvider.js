import React, { useReducer } from "react";
import UserRegisterContex from "./UserRegisterContex";

const registerdata = [
  {
    id: "1",
    name: "khushal",
    email: "kk@gmail.com",
    password: "12345678",
  },
  {
    id: "2",
    name: "khush",
    email: "kk1@gmail.com",
    password: "12356789",
  },
];

var initialValue = {
  isLogin:false,
  registerdata: registerdata,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        registerdata: state.registerdata.concat(action.payload),
      };
     
    case "LOGIN":
      localStorage.setItem("user",JSON.stringify(action.payload));
      return Object.assign(state,action.payload);
      // console.log(action.loginItem.email);
      // return {

      // };
    case "logoutUser":
        localStorage.removeItem("user");
        return Object.assign(state,action.payload);
  }

  return initialValue;
};

export const UserRegisterProvider = (props) => {
  // const addItemHandler = (itemData) => {
  //   dispatch({ type: "ADD", item: itemData });
  // };
  // const loginHandler = (loginData) => {
  //   // console.log(loginData);
  //   dispatch({ type: "LOGIN", loginItem: loginData });
  // };

  const [state, dispatch] = useReducer(userReducer, initialValue);
  console.log(state);
  // const userregistercontex = {
  //   registerdata: state.registerdata,
  //   addItem: addItemHandler,
  //   login: loginHandler,
  // };
  return (
    <UserRegisterContex.Provider value={[state,dispatch]}>
      {props.children}
    </UserRegisterContex.Provider>
  );
};
