import React from 'react'
import { Redirect } from 'react-router-dom'
import auth from '../auth/Auth'

const protectedRoute = (Component) => {

  const WrappedComponent = ({...props}) => {
    if (auth.isAuthenticated()) {
      return <Component {...props}/>
    } else {
      return <Redirect to="/" />
    }
  }

  return WrappedComponent
}

export default protectedRoute
