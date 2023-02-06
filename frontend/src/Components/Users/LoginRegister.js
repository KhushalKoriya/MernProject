import React from "react";
import { Outlet } from "react-router";
import { Mainpage } from "../Mainpage";

export const LoginRegister = () => {
    
  return (
    <>
      <Mainpage />
      <Outlet />
    </>
  );
};
