import React from 'react'
import { Redirect, Route, useNavigate } from 'react-router-dom'

const PrivateRoute = ({ element: Element, ...rest }) => {
  // Add your own authentication on the below line.
  const isLoggedIn = AuthService.isLoggedIn()

  return (
    <Route
      {...rest}
      render={props =>{
        return isLoggedIn ? (
          <Element {...props} />
        ) : (
          <useNavigate to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
      }
    />
  )
}

export default PrivateRoute