import React from 'react'
import { withStyles } from '@material-ui/core'

import RegisterForm from '../components/forms/register'

const RegisterPage = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.overlay} />
    <RegisterForm />
  </div>
)

const styles = () => ({
  root: {
    height: '100vh',
    backgroundImage: 'url("/assets/images/landscape-1.jpg")',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.64)',
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  form: {
    width: 400
  }
})

export default withStyles(styles)(RegisterPage)