import React, { Component } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import * as yup from 'yup';
import { StyledErrorMsg } from './LoginForm'
import styled from 'styled-components'
import withSnackbar from "../snackbar/withSnackbar";
import * as ROLES from '../../constans/roles';


const ownerRegisterSchema = yup.object().shape({
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

const StyledButton = styled(Button)`
  &&{
      margin-top: 4px;
  }
`

class OwnerForm extends Component {

  render() {
    const { name, email, password} = this.state;
    const role = ROLES.OWNER;

    return (
      <div>
        <Formik
          initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
            reapetedPassword: ""
          }}
          validationSchema={ownerRegisterSchema}
          onSubmit={(values, { setSubmitting, setValues, setStatus } , errors) => {
            const data = values
            setTimeout(() => {
              this.props.firebase.doCreateUserWithEmailAndPassword(values.email, values.password)
              .then((authUser) => {
                return this.props.firebase
                  .user(authUser.user.uid)
                  .set({
                    email: authUser.user.email,
                    name: data.name + " " + data.surname,
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
              <Grid container spacing={8}>
                <Grid item>
                  <Field
                    name="name"
                    required
                    component={TextField}
                    id="name"
                    label="Name"
                    margin="normal"
                    onChange={props.handleChange}
                  />
                 <StyledErrorMsg error id="component-error-text">{props.errors.name}</StyledErrorMsg>
                </Grid>
                <Grid item>
                  <Field
                    name="surname"
                    component={TextField}
                    id="surname"
                    label="Surname"
                    margin="normal"
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
                  onChange={props.handleChange}
                  fullWidth
                />
                <StyledErrorMsg error id="component-error-text">{props.errors.email}</StyledErrorMsg>
              </Grid>
              <Grid item>
                <Field
                  name="password"
                  required
                  component={TextField}
                  id="password"
                  label="Password"
                  type="password"
                  margin="normal"
                  onChange={props.handleChange}
                  fullWidth
                />
                <StyledErrorMsg error id="component-error-text">{props.errors.password}</StyledErrorMsg>
              </Grid>
              <Grid item>
                <Field
                  name="reapeted-password"
                  required
                  component={TextField}
                  id="reapetedPassword"
                  label="Repeat password"
                  onChange={props.handleChange}
                  type="password"
                  margin="normal"
                  fullWidth
                />
                <StyledErrorMsg error id="component-error-text">{props.errors.reapetedPassword}</StyledErrorMsg>
              </Grid>
              <Grid item>
                <StyledButton
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
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

export default withSnackbar()(OwnerForm)

