import React, { Component } from "react";
import {
  Paper,
  TextField,
  Grid,
  Button,
  Typography,
  Divider
} from "@material-ui/core";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import RegisterForm from "../login/RegisterForm";
import { compose } from "recompose";
import { withFirebase } from "../../config/firebase/context";
import { withRouter } from "react-router-dom";
import * as ROUTES from "./../../constans/routes";
import * as yup from 'yup';
import FormHelperText from '@material-ui/core/FormHelperText';
import withSnackbar from './../snackbar/withSnackbar'


const StyledPaper = styled(Paper)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
`;

const StyledTextField = styled(TextField)`
  width: 300px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 10px;
`;

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  width: 100%;
  text-align: center;
  display: inline-block;
`;

const StyledToggleButton = styled(ToggleButton)`
  width: 50%;
`;

export const StyledErrorMsg = styled(FormHelperText)`
 &&{
   margin-left: 3px;
   margin-top: -3px;
 }
`

const signInSchema = yup.object().shape({
  email: yup.string()
          .email("Invalid email")
          .required("Email is required"),
  password: yup.string()
          .required("Password is required")
          .min(8, "Password is too short")
})

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      registerFormIsOpened: false,
      role: "owner",
      areDisabledButtons: false,
      isOpenedSnack: false,
      variantOpenedSnackbar: "success"
    };
  }

  handleCloseRegisterForm = event => {
    this.setState(prevState => ({
      ...prevState,
      registerFormIsOpened: false
    }));
  };

  handleOpenRegisterForm = event => {
    this.setState(prevState => ({
      ...prevState,
      registerFormIsOpened: true
    }));
  };

  handleRole = (event, role) => {
    if(role!==null){
      this.setState({
        role: role
      });
    }
  };

  changeButtonsState = btnState => {
    this.setState(prevState => ({
      ...prevState,
      areDisabledButtons: btnState
    }))  
  }

  ToggleButtons = () => (
    <StyledToggleButtonGroup
      exclusive
      value={this.state.role}
      onChange={this.handleRole}
    >
      <StyledToggleButton value="owner" id="owner">
        Owner
      </StyledToggleButton>
      <StyledToggleButton value="service" id="service">
        Car Service
      </StyledToggleButton>
    </StyledToggleButtonGroup>
  );

  render() {
    return (
      <StyledPaper elevation={1}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={signInSchema}
          onSubmit={(values, { setSubmitting, setValues, setStatus } , errors) => {
            this.changeButtonsState(true)
            setTimeout(() => {
              this.props.firebase
                .doSignInWithEmailAndPassword(values.email, values.password)
                .then(() => {
                  this.props.snackbar.showMessage(
                    "Successful sign in", "success")
                  this.props.history.push(ROUTES.HOME);
                  setSubmitting(true)
                })
                .catch(error => {
                  this.props.snackbar.showMessage(
                    error.message, "error")
                  // const payload = { ...values, password: ""}
                  // console.log(payload, errorsPayload)
                  // setValues(payload)
                  // setSubmitting(false) 
                }) 
            }, 1000);
              this.changeButtonsState(false)
            }}
          render={({values, errors, handleChange}) => (
            <Form>
              <Field component={this.ToggleButtons} name="roles" />
              <Grid container direction="column" spacing={2} justify="center">
                <Grid item>
                  <Field
                    name="email"
                    component={StyledTextField}
                    id="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.email}
                    readOnly
                  />
                  <StyledErrorMsg error id="component-error-text">{errors.email}</StyledErrorMsg>
                  <Field
                    name="password"
                    component={StyledTextField}
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange}
                    readOnly
                  />
                  <StyledErrorMsg error id="component-error-text">{errors.password}</StyledErrorMsg>
                </Grid>
                <Grid item>
                  <StyledButton
                    disabled={this.state.areDisabledButtons}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Log In
                  </StyledButton>
                </Grid>
                <Grid item>
                  <Divider variant="middle" />
                </Grid>
                <Grid>
                  <Typography align="center">
                    You don't have an account?
                  </Typography>
                </Grid>
                <Grid item>
                  <StyledButton
                    disabled={this.state.areDisabledButtons}
                    variant="contained"
                    color="primary"
                    onClick={this.handleOpenRegisterForm}
                  >
                    Register account
                  </StyledButton>
                </Grid>
              </Grid>
            </Form>
          )}
        />
        {this.state.registerFormIsOpened && (
          <RegisterForm
            firebase={this.props.firebase}
            isOpened={this.state.registerFormIsOpened}
            handleOnClose={this.handleCloseRegisterForm}
          />
        )}
      </StyledPaper>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(LoginForm);

const snackSignInForm = withSnackbar()(SignInForm)

export { snackSignInForm };
