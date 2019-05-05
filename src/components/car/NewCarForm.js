import React, { Component } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { Grid, Button, Divider, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { compose } from "recompose";
import { withFirebase } from "./../../config/firebase/context";

export class NewCarForm extends Component {
  saveCar = values => {
    this.props.firebase
      .addCar()
      .push()
      .set(values);
  };

  render() {
    console.log(this.props);
    return (
      <div className={this.props.className}>
        <Formik
          enableReinitialize
          initialValues={{
            name: "",
            Vin: "",
            registerNumber: "",
            registerTime: ""
          }}
          onSubmit={values => {
            setTimeout(() => {
              this.saveCar(values);
            }, 1000);
          }}
          render={props => (
            <Form>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid
                  container
                  direction="column"
                  spacing={10}
                  justify="center"
                >
                  <Grid item>
                    <Field
                      name="carName"
                      component={TextField}
                      id="carName"
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
                    <Field
                      name="registerNumber"
                      component={TextField}
                      id="registerNumber"
                      label="Register Number"
                      margin="normal"
                      variant="outlined"
                      onChange={props.handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      name="registerTime"
                      component={DatePicker}
                      id="registerTime"
                      label="Register Time"
                      margin="normal"
                      value={props.values.registerTime}
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
              </MuiPickersUtilsProvider>
            </Form>
          )}
        />
      </div>
    );
  }
}

export const composedNewCarForm = compose(withFirebase)(NewCarForm);
export const StyledNewCarForm = styled(composedNewCarForm)``;
