import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { Button, Paper, Typography, withStyles } from "@material-ui/core";

import TextField from "../fields/text-field";
import { Validators } from "../../utils";

const validate = values => {
  let errors = {};
  Validators.username(values.username, errors);
  Validators.password(values.password, errors);
  if (!values.confirmPassword) {
    errors.confirmPassword = "Password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password does not match';
  }

  return errors;
};

const RegisterForm = ({ classes }) => (
  <div className={classes.root}>
    <Paper className={classes.title} elevation={1}>
      <Typography variant="h5" className={classes.titleText}>
        Register
      </Typography>
    </Paper>

    <Paper className={classes.form} elevation={1}>
      <Formik
        initialValues={{
          username: "",
          firstname: "",
          lastname: "",
          password: "",
          confirmPassword: ""
        }}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
        }}
      >
        <Form>
          <TextField name="username" label="User Name" required />
          <TextField name="firstname" label="First Name" />
          <TextField name="lastname" label="Last Name" />
          <TextField
            name="password"
            type="password"
            label="Password"
            required
          />
          <TextField
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            required
          />
          <Button
            type="submit"
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <div className={classes.links}>
            <Link to="/forgot-password" className={classes.link}>
              <Typography variant="body2" className={classes.linkText}>Forgot Password?</Typography>
            </Link>
            <Link to="/login" className={classes.link}>
              <Typography variant="body2" className={classes.linkText}>Login</Typography>
            </Link>
          </div>
        </Form>
      </Formik>
    </Paper>
  </div>
);

const styles = () => ({
  root: {
    width: 400,
    position: "relative"
  },
  title: {
    background: "linear-gradient(60deg, #ec407a, #d81b60);",
    color: "white",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    margin: "0 16px",
    width: 368,
    padding: 16,
    top: -20,
    boxSizing: "border-box"
  },
  titleText: {
    color: "white"
  },
  form: {
    padding: "64px 16px 32px",
    overflow: "auto"
  },
  button: {
    width: "100%",
    marginTop: 20
  },
  link: {
    textDecoration: "none"
  },
  linkText: {
    color: "#FF4081"
  },
  links: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 16,
    padding: 8
  }
});

export default withStyles(styles)(RegisterForm);
