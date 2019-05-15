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

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      registerFormIsOpened: false,
      role: "owner"
    };
  }

  handleCloseRegisterForm = event => {
    event.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      registerFormIsOpened: false
    }));
  };

  handleOpenRegisterForm = event => {
    event.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      registerFormIsOpened: true
    }));
  };

  handleRole = (event, role) => {
    this.setState({
      role: role
    });
  };

  ToggleButtons = () => (
    <StyledToggleButtonGroup
      exclusive
      value={this.state.role}
      onChange={this.handleRole}
    >
      <StyledToggleButton value="owner" id="owner">
        Owner
      </StyledToggleButton>
      <StyledToggleButton value="service">Car Service</StyledToggleButton>
    </StyledToggleButtonGroup>
  );

  onSubmit = (email, password) => {
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push(ROUTES.HOME);
      });
  };

  render() {
    return (
      <StyledPaper elevation={1}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={() => {}}
          render={props => (
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
                    onChange={props.handleChange}
                    value={props.values.email}
                    readonly
                    onfocus="this.removeAttribute('readonly');"
                  />
                </Grid>
                <Grid item>
                  <Field
                    name="password"
                    component={StyledTextField}
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    onChange={props.handleChange}
                    readonly
                    onfocus="this.removeAttribute('readonly');"
                  />
                </Grid>
                <Grid item>
                  <StyledButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      this.onSubmit(props.values.email, props.values.password)
                    }
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
  withFirebase
)(LoginForm);

export { SignInForm };
