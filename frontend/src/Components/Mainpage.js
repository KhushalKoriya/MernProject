
import { Link } from 'react-router-dom';
import './Mainpage.css';
import React from 'react'
import {Custom} from '../Custom';

export const Mainpage = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav mr-auto mb-0 h3">  
      <li><Link to={'/Register'} className="nav-link">Register</Link></li>
      <li><Link to={'/Login'} className="nav-link">Login</Link></li>
      {/* <li><Link onClick={Custom} className="nav-link">Demo</Link></li> */}
      </ul>
      </nav>
  )
}

