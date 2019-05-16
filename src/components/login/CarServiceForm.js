import React, { Component } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import { Field, Formik } from "formik";

export default class CarServiceForm extends Component {
  registerUser = (email, password) => {
    this.props.firebase.doCreateUserWithEmailAndPassword(email, password);
  };
  render() {
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
          onSubmit={() => {}}
          render={props => (
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
              </Grid>
              <Grid item>
                <Field
                  required
                  component={TextField}
                  id="address1"
                  name="address1"
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
