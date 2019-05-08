import React, { Component } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { Grid, Button, Divider, TextField, Paper } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { compose } from "recompose";
import { withFirebase } from "./../../config/firebase/context";
import { DropzoneArea } from "material-ui-dropzone";

const StyledTextField = styled(TextField)`
  width: 400px;
  notchedoutline: {
  }
`;
const StyledButton = styled(Button)`
  width: 60px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 400px;
`;

export class NewCarForm extends Component {
  state = {
    images: []
  };
  saveCar = values => {
    this.props.firebase
      .addCar()
      .push()
      .set(values);
  };

  handleDropZoneChange = files => {
    let imagesInBase64 = [];
    let image2base64 = require("image-to-base64");
    files.map(file => {
      image2base64(file).then(image => imagesInBase64.push(image));
    });
    this.setState({ images: imagesInBase64 });
  };

  render() {
    console.log(this.state);
    return (
      <div className={this.props.className}>
        <Formik
          enableReinitialize
          initialValues={{
            name: "",
            Vin: "",
            registerNumber: "",
            registerTime: new Date()
          }}
          onSubmit={values => {
            setTimeout(() => {
              this.saveCar(values);
            }, 1000);
          }}
          render={props => (
            <Form>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={20}>
                  <Grid item xs>
                    <Field
                      name="name"
                      component={StyledTextField}
                      id="name"
                      label="Car Name"
                      margin="normal"
                      variant="outlined"
                      onChange={props.handleChange}
                    />
                    <Field
                      name="Vin"
                      component={StyledTextField}
                      id="Vin"
                      label="Vin"
                      margin="normal"
                      variant="outlined"
                      onChange={props.handleChange}
                    />
                    <Field
                      name="registerNumber"
                      component={StyledTextField}
                      id="registerNumber"
                      label="Register Number"
                      margin="normal"
                      variant="outlined"
                      onChange={props.handleChange}
                    />
                    <Field
                      name="registerTime"
                      component={StyledDatePicker}
                      id="registerTime"
                      label="Register Time"
                      margin="normal"
                      value={props.values.registerTime}
                      variant="outlined"
                      onChange={props.handleChange}
                    />
                    <StyledButton
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </StyledButton>
                  </Grid>
                  <Grid item xs>
                    <DropzoneArea onChange={this.handleDropZoneChange} />
                  </Grid>
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
export const StyledNewCarForm = styled(composedNewCarForm)`
  padding-left: 20%;
  padding-top: 70px;
  padding-right: 15%;
`;
