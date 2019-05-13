import React, { Component } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { Grid, Button, TextField, InputLabel } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { compose } from "recompose";
import { withFirebase } from "./../../config/firebase/context";
import { DropzoneArea } from "material-ui-dropzone";

const StyledTextField = styled(TextField)`
  width: 400px;
  notchedoutline: {
    border-color:"black";
  };
`;

const StyledButton = styled(Button)`
  width: 200px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 400px;
`;

const StyledInputLabel = styled(InputLabel)`
  color: "black";
`;

export class NewCarForm extends Component {
  state = {
    images: [],
    imagesInBase64: ""
  };

  saveCar = values => {
    this.props.firebase
      .addCar()
      .push()
      .set(values);
  };

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms)); //tymczasowe rozwiazanie xD
  };
  getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  handleDropZoneChange = async (files, setFieldValue) => {
    this.setState({ images: files });
    let imagesInBase64 = [];
    files.map(file => {
      this.getBase64(file).then(image => {
        imagesInBase64.push(image.concat("&&&"));
      });
    });
    await this.sleep(400); //no niestety :(
    this.setState({ imagesInBase64: imagesInBase64.join() });
    setFieldValue("photos", imagesInBase64.join());
  };
  render() {
    return (
      <div className={this.props.className}>
        <Formik
          enableReinitialize={false}
          initialValues={{
            name: "",
            VIN: "",
            registerNumber: "",
            photos: "",
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
                <Grid container spacing={10}>
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
                    <DropzoneArea
                      onChange={value =>
                        this.handleDropZoneChange(value, props.setFieldValue)
                      }
                    />
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
