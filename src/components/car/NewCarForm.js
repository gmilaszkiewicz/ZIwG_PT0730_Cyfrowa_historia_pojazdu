import React, { Component } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { Grid, Button, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { compose } from "recompose";
import { withFirebase } from "./../../config/firebase/context";
import { DropzoneArea } from "material-ui-dropzone";
import "react-dropzone-component/styles/filepicker.css";
import { Dialog } from "@material-ui/core";
import "dropzone/dist/min/dropzone.min.css";
import * as yup from "yup";
import { StyledErrorMsg } from "./../login/LoginForm";
import withSnackbar from "./../snackbar/withSnackbar";

const StyledTextField = styled(TextField)`
  width: 450px;
`;

const StyledButton = styled(Button)`
  width: 450px;
  margin-bottom: 10px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 450px;
`;

const StyledDropZoneArea = styled(DropzoneArea)``;

const newCarSchema = yup.object().shape({
  name: yup.string().required("Required field"),
  VIN: yup
    .string()
    .required("Nr VIN is required")
    .min(17, "VIN must conatins 17 characters")
    .max(17, "VIN must conatins 17 characters"),
  registerNumber: yup.string().required("Required field")
  // registerTime: yup.date()
  // .max(new Date(), "Wrong date")
});

export class NewCarForm extends Component {
  state = {
    images: [],
    imagesInBase64: "",
    registerNumber: new Date()
  };

  handleDateChange = (date, setFieldValue) => {
    this.setState({ registerNumber: date });
    setFieldValue("registerTime", date);
  };

  saveCar = (values, data) => {
    this.props.firebase.addCar(
      values.name,
      values,
      this.props.firebase.auth.currentUser.uid,
      data
    );
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
    setFieldValue("photos", imagesInBase64.join(""));
  };

  getCarDataFromAPI = carData => {
    return fetch(
      `https://5cd467e9b231210014e3d8e7.mockapi.io/api/cars?search=${
        carData.VIN
      }`
    )
      .then(results => {
        return results.json();
      })
      .then(data => {
        return data;
      });
  };

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Dialog onClose={this.props.handleOnClose} open={this.props.isOpened}>
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
              validationSchema={newCarSchema}
              onSubmit={values => {
                setTimeout(async () => {
                  const data = await this.getCarDataFromAPI(values);
                  if (data[0] !== undefined) {
                    this.props.handleOnClose();
                    this.saveCar(values, data[0]);
                    this.props.snackbar.showMessage(
                      "Successful added new car!",
                      "success"
                    );
                  } else {
                    this.props.snackbar.showMessage(
                      "Car with this data isn't exist!",
                      "error"
                    );
                  }
                }, 1000);
              }}
              render={props => (
                <Form>
                  <Grid container spacing={0}>
                    <Grid item>
                      <Field
                        name="name"
                        component={StyledTextField}
                        id="name"
                        label="Car Name"
                        margin="normal"
                        variant="outlined"
                        onChange={props.handleChange}
                      />
                      <StyledErrorMsg error id="component-error-text">
                        {props.errors.name}
                      </StyledErrorMsg>
                    </Grid>
                    <Grid item>
                      <Field
                        name="VIN"
                        component={StyledTextField}
                        id="VIN"
                        label="VIN"
                        margin="normal"
                        variant="outlined"
                        onChange={props.handleChange}
                      />
                      <StyledErrorMsg error id="component-error-text">
                        {props.errors.VIN}
                      </StyledErrorMsg>
                    </Grid>
                    <Grid item>
                      <Field
                        name="registerNumber"
                        component={StyledTextField}
                        id="registerNumber"
                        label="Register Number"
                        margin="normal"
                        variant="outlined"
                        onChange={props.handleChange}
                      />
                      <StyledErrorMsg error id="component-error-text">
                        {props.errors.registerNumber}
                      </StyledErrorMsg>
                    </Grid>
                    <Grid item>
                      <StyledDatePicker
                        value={this.state.registerNumber}
                        onChange={data =>
                          this.handleDateChange(data, props.setFieldValue)
                        }
                        variant="outlined"
                      />
                      {/* <Field
                        name="registerTime"
                        component={StyledDatePicker}
                        id="registerTime"
                        label="Register Time"
                        margin="normal"
                        value={props.values.registerTime}
                        variant="outlined"
                        onChange={props.handleChange}
                      /> */}
                      {/* <DatePicker
                      margin="normal"
                      label="Fix data:"
                      className={classNames(classes.margin, classes.picker)}
                      value={props.values.registerTime}
                      onChange={props.handleChange}
                    /> */}
                      <StyledErrorMsg error id="component-error-text">
                        {props.errors.registerTime}
                      </StyledErrorMsg>
                    </Grid>
                    <Grid item>
                      {console.log(props.setFieldValues)}
                      <StyledDropZoneArea
                        filesLimit={3}
                        onChange={value =>
                          this.handleDropZoneChange(value, props.setFieldValue)
                        }
                        showPreviews={false}
                        showPreviewsInDropzone={true}
                        dropzoneText="Browse files"
                        dropZoneClass="dropzone"
                      />
                    </Grid>
                    <Grid item>
                      <StyledButton
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Save
                      </StyledButton>
                    </Grid>
                  </Grid>
                </Form>
              )}
            />
          </div>
        </Dialog>
      </MuiPickersUtilsProvider>
    );
  }
}

export const composedNewCarForm = compose(withFirebase)(NewCarForm);
export const StyledNewCarForm = withSnackbar()(styled(composedNewCarForm)`
  padding-left: 10%;
  padding-top: 10px;
  padding-right: 10%;
  height: 550px;
  .MuiGrid-root {
    justify-content: center;
  }
  .DropzoneArea-dropZone-620,
  .dropzone {
    width: 450px;
    min-height: 0px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
`);
