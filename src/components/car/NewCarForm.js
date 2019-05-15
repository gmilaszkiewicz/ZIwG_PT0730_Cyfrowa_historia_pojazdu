import React, { Component } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { Grid, Button, TextField, InputLabel } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { compose } from "recompose";
import { withFirebase } from "./../../config/firebase/context";
import { DropzoneArea } from "material-ui-dropzone";
import { withStyles } from '@material-ui/core/styles';
import { purple } from "@material-ui/core/colors";
import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css'
import 'dropzone/dist/min/dropzone.min.css'

var componentConfig = { postUrl: 'no-url' };
var djsConfig = { autoProcessQueue: false }
var eventHandlers = { 
  addedfile: (file) => console.log(file),
  maxfilesexceeded: 2,
 }

const styles = theme => ({
  rootOutlinedInput: {
    // '&$cssFocused $notchedOutline': {
    //   borderColor: purple[500],
    // },
    "& $notchedOutline": {   //add this nested selector
      borderColor: "black",
   },
   "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
    borderColor: "black"
    }
  },
  notchedOutline: {
    borderColor: purple[500],
  },
  label:{
    color: "black",
    '&$cssFocused': {
      color: "black",
    },
  },
  cssFocused: {},
})

const StyledTextField = styled(TextField)`
  width: 400px;
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
    const { classes } = this.props;
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
                <Grid container spacing={8}>
                  <Grid item xs>
                    <Field
                      name="name"
                      component={StyledTextField}
                      id="name"
                      label="Car Name"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                          focused: classes.cssFocused,
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: classes.rootOutlinedInput,
                          notchedOutline: classes.notchedOutline,
                        },
                      }}
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
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                          focused: classes.cssFocused,
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: classes.rootOutlinedInput,
                          notchedOutline: classes.notchedOutline,
                        },
                      }}
                    />
                    <Field
                      name="registerNumber"
                      component={StyledTextField}
                      id="registerNumber"
                      label="Register Number"
                      margin="normal"
                      variant="outlined"
                      onChange={props.handleChange}
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                          focused: classes.cssFocused,
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: classes.rootOutlinedInput,
                          notchedOutline: classes.notchedOutline,
                        },
                      }}
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
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                          focused: classes.cssFocused,
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: classes.rootOutlinedInput,
                          notchedOutline: classes.notchedOutline,
                        },
                      }}    
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
                    {/* <DropzoneArea
                      onChange={value =>
                        this.handleDropZoneChange(value, props.setFieldValue)
                      }
                      showPreviews={true}
                      showPreviewsInDropzone={false}
                    /> */}
                    <DropzoneComponent config={componentConfig}
                       eventHandlers={eventHandlers}
                      //  djsConfig={djsConfig}
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
export const materialUIStyled = withStyles(styles)(composedNewCarForm)
export const StyledNewCarForm = styled(materialUIStyled)`
  padding-left: 20%;
  padding-top: 70px;
  padding-right: 15%;
  /* background-color: #424242; */
`;
