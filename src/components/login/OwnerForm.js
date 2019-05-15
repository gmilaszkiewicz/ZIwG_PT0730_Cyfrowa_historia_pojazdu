import React, { Component } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import { Field, Formik } from "formik";

export default class OwnerForm extends Component {
  registerUser = (email, password) => {
    this.props.firebase.doCreateUserWithEmailAndPassword(email, password);
  };
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
            repetedPassword: ""
          }}
          onSubmit={() => {}}
          render={props => (
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
              </Grid>
              <Grid item>
                <Field
                  name="reapeted-password"
                  required
                  component={TextField}
                  id="reapeted-password"
                  label="Repeat password"
                  onChange={props.handleChange}
                  type="password"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={(e) => {
                    this.registerUser(
                      props.values.email,
                      props.values.password
                    );
                    this.props.handleClose(e);
                  }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          )}
        />
      </div>
    );
  }
}
