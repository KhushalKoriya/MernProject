import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserRegisterContex from "../Store/UserRegisterContex";
export const Header = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserRegisterContex);
  const user = state.registerdata.find(
    (u) => u.email
  );
  const userLogout = () => {
    let userdata = {
      isLogin: false,
    };
    dispatch({
      type: "logoutUser",
      payload: userdata,
    });
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 h3">
        <li className="nav-item">
        <Link to="/Homepage" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
        <Link to="/Features" className="nav-link">Features</Link>
        </li>
        <li className="nav-item">
        <Link to="/Aboutus" className="nav-link">About-Us</Link>
        </li>
      </ul>
   
      <div className="d-flex">
      <ul className="navbar-nav mr-auto mb-0 h3 ">
      {
       <>
       <Dropdown>
       <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
       WelCome,{user.name}
      </Dropdown.Toggle>
      <Dropdown.Menu variant="dark">
        <Dropdown.Item onClick={userLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>

       </Dropdown>

        </>}
      </ul>
      </div>
    </div>
  </div>
</nav>

  );
};
