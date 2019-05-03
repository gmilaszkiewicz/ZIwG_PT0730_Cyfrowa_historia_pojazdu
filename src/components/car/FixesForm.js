import React, { Component } from 'react'
import {Dialog, withStyles} from '@material-ui/core'
import { Formik, Form } from 'formik';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { compose } from 'recompose';
import { withFirebase } from "../../config/firebase/context";

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      flexBasis: 300,
      width: '250px',
    },
    button: {
      margin: theme.spacing(1),
      width:'250px',
    },
    selector:{
      width: '430px',
    },
    dense:{
      width:'250px',
    },
    picker:{
      width:'250px',
    },
    comp:{
      alignItems: 'center'
    }
  });

class AddFixForm extends Component{

    state = {
        fixName: '',
        price: '',
        course: 0,
        selectedDate: new Date(),
        fixCategory: '',
        description: '',
        fixCategories: [],
        damageCategories: [],
      };

      componentDidMount() {
        const categoryName = this.props.category.toLowerCase() + "Categories";
        this.props.firebase.fixCategories().on('value', snapshot => {
          this.setState({
          fixCategories: snapshot.val()
          })
      })}

      handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
      };

      handleDateChange = date => {
        this.setState({ selectedDate: date });
      };

    render(){

        const { classes } = this.props;
         
        return(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Dialog open={this.props.isOpened}  onClose={this.props.handleOnClose}>
                <Formik
                    enableReinitialize
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            console.log(values)}
                            

                        ,1000);
                    }}
                    render={props => (
                        <Form onSubmit={props.handleSubmit}>
                        <div className={classes.root}>
                        <Typography className={classes.margin} component="h3" variant="body1" gutterBottom color="secondary">
                          {this.props.category} category:
                        </Typography>
                        <Select
                          value={this.state.fixCategory}
                          onChange={this.handleChange('fixCategory')}
                          className={classNames(classes.margin, classes.selector)}
                          input={
                            <OutlinedInput
                              labelWidth={30}
                              name="Categories:"
                            />
                          }
                        >
                          {this.state.fixCategories.map((category) => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                          ))}
                        </Select>
                          </div>
                        <Grid container justify="space-between">
                        <Grid item xs={6} className={classes.comp} >
                          <TextField
                            label={this.props.category.toLowerCase() + " name"}
                            className={classNames(classes.margin, classes.textField)}
                            margin="normal"
                            value={this.state.fixName}
                            onChange={this.handleChange('fixName')}
                            variant="outlined"
                          />
                          <TextField
                          id="standard-dense"
                          label="Price"
                          value={this.state.price}
                          onChange={this.handleChange('price')}
                          className={classNames(classes.textField, classes.dense, classes.margin)}
                          margin="dense"
                          />

                          <DatePicker
                          margin="normal"
                          label="Fix data:"
                          className={classNames(classes.margin, classes.picker)}
                          value={this.state.selectedDate}
                          onChange={this.handleDateChange}
                          />
                          </Grid>
                          <Grid item xs={6}>

                          <TextField
                          id="outlined-adornment-weight"
                          className={classNames(classes.margin, classes.textField)}
                          variant="outlined"
                          label="Course"
                          value={this.state.course}
                          onChange={this.handleChange('course')}
                          InputProps={{
                              endAdornment: <InputAdornment position="start">KM</InputAdornment>,
                          }}
                          />
                          
                        <TextField
                          label="Description"
                          multiline
                          rows="4"
                          value={this.state.description}
                          onChange={this.handleChange('description')}
                          className={classNames(classes.margin, classes.textField)}
                          margin="normal"
                          variant="outlined"
                        />
                        <Button variant="contained" color="primary" className={classes.button}>
                          Accept
                        </Button>
                        </Grid>
                        </Grid>
                        </Form>
                    )}
                />
        </Dialog>
        </MuiPickersUtilsProvider>
        );
    } 
}

export default compose(withFirebase)(withStyles(styles)(AddFixForm))