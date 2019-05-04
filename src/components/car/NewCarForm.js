import React, { Component } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { Grid, Button, Divider, TextField } from "@material-ui/core";

export class NewCarForm extends Component {
  render() {
    return (
      <Formik
        enableReinitialize
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            console.log(values);
          }, 1000);
        }}
        render={props => (
          <Form>
            <Field component={this.ToggleButtons} name="roles" />
            <Grid container direction="column" spacing={16} justify="center">
              <Grid item>
                <Field
                  name="carName"
                  component={TextField}
                  id="car-name"
                  label="Car Name"
                  margin="normal"
                  variant="outlined"
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid item>
                <Field
                  name="vin"
                  component={TextField}
                  id="vin"
                  label="Vin"
                  margin="normal"
                  variant="outlined"
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                 Save
                </Button>
              </Grid>
              <Grid item>
                <Divider variant="middle" />
              </Grid>
              <Grid />
            </Grid>
          </Form>
        )}
      />
    );
  }
}
