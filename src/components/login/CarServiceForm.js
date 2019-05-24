import React, { Component } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { withSnackbar } from "../snackbar";
import * as yup from 'yup';
import { StyledErrorMsg } from './LoginForm'
import styled from 'styled-components'
import * as ROLES from '../../constans/roles';

const StyledButton = styled(Button)`
  &&{
      margin-top: 4px;
  }
`

const carServiceRegisterSchema = yup.object().shape({
  name: yup.string()
          .required("Required field"),
  email: yup.string()
          .email("Invalid e-mail")
          .required("Email is required"),
  password: yup.string()
            .required("Required field")
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            , "Minimum 8 chars, letters and numbers"),
  reapetedPassword: yup.string()
                    .oneOf([yup.ref('password'), null], "Passwords are not same")
                    .required('Password confirm is required')
})

class CarServiceForm extends Component {

  render() {

    const role = ROLES.CAR_SERVICE

    return (
      <div>
        <Formik
          initialValues={{
            name: "",
            address1: "",
            zip: "",
            city: "",
            email: "",
            password: "",
            reapetedPassword: ""
          }}
          validationSchema={carServiceRegisterSchema}
          onSubmit={(values) => {
            const data = values
            setTimeout(() => {
              this.props.firebase.doCreateUserWithEmailAndPassword(values.email, values.password)
              .then((authUser) => {
                return this.props.firebase
                  .user(authUser.user.uid)
                  .set({
                    email: authUser.user.email,
                    name: data.name,
                    address: data.address1 + " " + data.zip + " " + data.city,
                    role
                  })
              })
              .then(() => {
                this.props.snackbar.showMessage(
                  'Successful registration!', "success")
                this.props.handleClose()
              })
              .catch(error => {
                this.props.snackbar.showMessage(
                  error.message, "error")
              }) 
            }, 1000);
          }}
          render={props => (
            <Form>
            <Grid container direction="column" spacing={0} justify="center">
              <Grid item>
                <Field
                  name="name"
                  required
                  component={TextField}
                  id="name"
                  label="Service name"
                  margin="normal"
                  onChange={props.handleChange}
                  fullWidth
                />
                <StyledErrorMsg error id="component-error-text">{props.errors.name}</StyledErrorMsg>
              </Grid>
              <Grid item>
                <Field
                  required
                  component={TextField}
                  id="address"
                  name="address"
                  onChange={props.handleChange}
                  label="Address"
                  fullWidth
                />
              </Grid>
              <Grid container spacing={8}>
                <Grid item xs={6}>
                  <TextField required id="city" name="city" label="City" />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    onChange={props.handleChange}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Field
                  name="email"
                  required
                  component={TextField}
                  id="email"
                  type="email"
                  autoComplete="email"
                  label="Email"
                  margin="normal"
                  fullWidth
                  onChange={props.handleChange}
                />
                <StyledErrorMsg error id="component-error-text">{props.errors.email}</StyledErrorMsg>
              </Grid>
              <Grid item>
                <Field
                  name="password"
                  component={TextField}
                  required
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  fullWidth
                  onChange={props.handleChange}
                />
                <StyledErrorMsg error id="component-error-text">{props.errors.password}</StyledErrorMsg>
              </Grid>
              <Grid item>
                <Field
                  name="reapeted-password"
                  component={TextField}
                  required
                  id="reapetedPassword"
                  label="Repeat password"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  onChange={props.handleChange}
                  fullWidth
                />
                <StyledErrorMsg error id="component-error-text">{props.errors.reapetedPassword}</StyledErrorMsg>
              </Grid>
              <Grid item>
                <StyledButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Register
                </StyledButton>
              </Grid>
            </Grid>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default withSnackbar()(CarServiceForm)