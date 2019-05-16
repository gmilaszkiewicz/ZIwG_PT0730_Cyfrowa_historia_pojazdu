import React, { Component } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { Grid, Button, TextField, InputLabel } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { compose } from "recompose";
import { withFirebase } from "./../../config/firebase/context";
import { DropzoneArea } from "material-ui-dropzone";
import DropzoneComponent from "react-dropzone-component";
import "react-dropzone-component/styles/filepicker.css";
import { Dialog } from "@material-ui/core";
import "dropzone/dist/min/dropzone.min.css";
// import ReactDOMServer from 'react-dom
// var ReactDOMServer = require('react-dom/server');

// var componentConfig = {
//   postUrl: 'no-url',
//  };
// var djsConfig = {
//   addRemoveLinks: true,
//   autoProcessQueue: false,
//   maxFiles: 2,
//   maxThumnails: 2,
//  }

// var myDropzone;

// function removeFile (file) {
//   if (myDropzone) {
//       myDropzone.removeFile(file);
//   }
// }

// function initCallback (dropzone) {
//     myDropzone = dropzone;
//     // myDropzone.on("complete", function(file) {
//     //   myDropzone.processQueue(file);
//     // });
//     console.log(myDropzone)
// }

// function thumbnailGenerate(file){
//   var progressElement = file.previewElement.querySelector('[data-dz-uploadprogress]')
//       progressElement.style.width = '100%'
//       // progressElement.style.display = 'none'
// }

// var eventHandlers = {
//   init: (dropzone) => initCallback(dropzone),
//   addedfile: (file) => file.upload.progress = 100,
//   maxfilesexceeded: (file) => removeFile(file),
//   thumbnail: (file) =>thumbnailGenerate(file)
//  }

const StyledTextField = styled(TextField)`
  width: 450px;
`;

const StyledButton = styled(Button)`
  width: 450px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 450px;
`;

const StyledDropZoneArea = styled(DropzoneArea)``;

export class NewCarForm extends Component {
  state = {
    images: [],
    imagesInBase64: ""
  };

  saveCar = values => {
    this.props.firebase.addCar(
      values.name,
      values,
      this.props.firebase.auth.currentUser.uid
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
    setFieldValue("photos", imagesInBase64.join());
  };
  render() {
    console.log(this.props);
    const { classes } = this.props;
    return (
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
            onSubmit={values => {
              setTimeout(() => {
                this.props.handleOnClose()
                this.saveCar(values);
              }, 1000);
            }}
            render={props => (
              <Form>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container spacing={8}>
                    {/* <Grid item xs> */}
                    <Field
                      name="name"
                      component={StyledTextField}
                      id="name"
                      label="Car Name"
                      margin="normal"
                      variant="outlined"
                      onChange={props.handleChange}
                    />
                    {/* </Grid> */}
                    <Field
                      name="VIN"
                      component={StyledTextField}
                      id="VIN"
                      label="VIN"
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

                    {/* </Grid> */}
                    {/* <Grid item xs> */}
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
                    {/* <DropzoneComponent config={componentConfig}
                       eventHandlers={eventHandlers}
                       djsConfig={djsConfig}
                        /> */}
                    {/* </Grid> */}
                    <StyledButton
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </StyledButton>
                  </Grid>
                </MuiPickersUtilsProvider>
              </Form>
            )}
          />
        </div>
      </Dialog>
    );
  }
}

export const composedNewCarForm = compose(withFirebase)(NewCarForm);
export const StyledNewCarForm = styled(composedNewCarForm)`
  padding-left: 10%;
  padding-top: 30px;
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
    margin-top: 20px;
    /* height: 200px; */
  }
`;
