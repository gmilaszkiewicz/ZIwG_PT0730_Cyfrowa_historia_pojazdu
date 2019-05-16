import React, { Component } from "react";
import { Dialog, withStyles } from "@material-ui/core";
import { Formik, Form } from "formik";
import classNames from "classnames";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { compose } from "recompose";
import { withFirebase } from "../../config/firebase/context";
import "filepond/dist/filepond.min.css";
import { FilePond, File, registerPlugin } from "react-filepond";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between"
  },
  margin: {
    margin: theme.spacing(2)
  },
  textField: {
    flexBasis: 300,
    width: "268px"
  },
  input: {
    color: "white",
    "&$focused": {
      color: "white"
    }
  },
  button: {
    margin: theme.spacing(2),
    width: "268px"
  },
  selector: {
    width: "400px"
  },
  dense: {
    width: "268px"
  },
  picker: {
    width: "268px"
  },
  comp: {
    alignItems: "center"
  },
  pond: {
    margin: theme.spacing(1),
    "& .react-fine-uploader-gallery-dropzone": {
      minHeight: 50
    },
    "& .react-fine-uploader-gallery-file-input-container": {
      width: 140
    },
    "& .react-fine-uploader-gallery-dropzone-content": {
      width: "unset",
      left: "unset",
      top: "20%",
      right: "10%"
    }
  }
});

class AddFixForm extends Component {
  state = {
    fixName: "",
    price: "",
    course: 0,
    selectedDate: new Date(),
    fixCategory: "",
    description: "",
    fixCategories: [],
    damageCategories: [],
    files: []
  };

  addFixes = (name, e) => {
    e.preventDefault();
    this.props.handleOnClose()
    const {
      fixName,
      price,
      course,
      selectedDate,
      fixCategory,
      description,
      fixCategories,
      damageCategories,
      files
    } = this.state;
    const values = {
      name: fixName,
      description,
      course,
      DateTime: selectedDate,
      fixCategoryName: fixCategory,
      price
    };
    this.props.firebase.addFix(
      name,
      values,
      this.props.firebase.auth.currentUser.uid,
      this.props.category
    );
  };
  componentDidMount() {
    const categoryName = this.props.category.toLowerCase() + "Categories";
    if (categoryName === "fixCategories") {
      this.props.firebase.fixCategories().on("value", snapshot => {
        this.setState(prevState => ({
          ...prevState,
          fixCategories: snapshot.val(),
          fixCategory: snapshot.val()[1] // nie wiem czemu pierwsza komorka snapshot jest pusta ...
        }));
      });
    } else if (categoryName === "damageCategories") {
      this.props.firebase.damageCategories().on("value", snapshot => {
        this.setState(prevState => ({
          ...prevState,
          damageCategories: snapshot.val(),
          fixCategory: snapshot.val()[1]
        }));
      });
    }
  }

  componentWillUnmount() {
    this.props.firebase.fixCategories().off();
    this.props.firebase.damageCategories().off();
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { classes, name } = this.props;
    console.log(this.state);
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Dialog open={this.props.isOpened} onClose={this.props.handleOnClose}>
          <Form>
            <div className={classes.root}>
              <Typography
                className={classes.margin}
                component="h3"
                variant="body1"
                gutterBottom
                color="secondary"
              >
                {this.props.category} category:
              </Typography>
              <Select
                value={this.state.fixCategory}
                onChange={this.handleChange("fixCategory")}
                className={classNames(classes.margin, classes.selector)}
                input={<OutlinedInput labelWidth={0} />}
              >
                {this.props.category === "Fix"
                  ? this.state.fixCategories.map(category => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))
                  : this.state.damageCategories.map(category => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
              </Select>
            </div>
            <Grid container direction="row">
              <Grid item xs={6} className={classes.comp}>
                <TextField
                  label={this.props.category + " name"}
                  className={classNames(classes.margin, classes.textField)}
                  margin="normal"
                  InputProps={{
                    className: classes.input
                  }}
                  InputLabelProps={{
                    className: classes.input
                  }}
                  value={this.state.fixName}
                  onChange={this.handleChange("fixName")}
                  variant="outlined"
                />

                <DatePicker
                  margin="normal"
                  label="Fix data:"
                  className={classNames(classes.margin, classes.picker)}
                  value={this.state.selectedDate}
                  onChange={this.handleDateChange}
                />
                <div className={classes.pond}>
                  <FilePond
                    className={classes.pond}
                    files={this.state.files}
                    allowMultiple={true}
                    maxFiles={3}
                    // onupdatefiles={setFiles}
                    labelIdle="Browse files"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-adornment-weight"
                  className={classNames(classes.margin, classes.textField)}
                  variant="outlined"
                  label="Course"
                  value={this.state.course}
                  onChange={this.handleChange("course")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">KM</InputAdornment>
                    )
                  }}
                  InputLabelProps={{
                    className: classes.input
                  }}
                />
                <TextField
                  id="standard-dense"
                  label="Price"
                  value={this.state.price}
                  onChange={this.handleChange("price")}
                  className={classNames(
                    classes.textField,
                    classes.dense,
                    classes.margin
                  )}
                  margin="dense"
                  InputProps={{
                    className: classes.input
                  }}
                  InputLabelProps={{
                    className: classes.input
                  }}
                />

                <TextField
                  label="Description"
                  multiline
                  rows="4"
                  value={this.state.description}
                  onChange={this.handleChange("description")}
                  className={classNames(classes.margin, classes.textField)}
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.input
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={e => this.addFixes(name, e)}
                >
                  Accept
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Dialog>
      </MuiPickersUtilsProvider>
    );
  }
}

export default compose(withFirebase)(withStyles(styles)(AddFixForm));
