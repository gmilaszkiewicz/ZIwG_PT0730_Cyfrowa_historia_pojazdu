import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import CarPhotoViewer from './CarPhotosViewer';
import FixesTable from './FixesTable'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    borderRadius: '30px',
    padding: theme.spacing.unit*3,
    color:"white"

  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: "90%",
    width: "90%",
    borderRadius: 30,
    margin: theme.spacing(2),
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(1)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  rootOutlinedInput: {
    width: 580,
    color:"black",
    "&$cssDisabled $notchedOutline": {   //add this nested selector
      borderColor: "black",
   },
   "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
    borderColor: "black"
    }
  },
  notchedOutline: {
    borderColor: "black",
  },
  label:{
    color: "black",
    '&$cssFocused': {
      color: "black",
    },
    '&$cssDisabled': {
      color: "black",
    }
  },
  cssFocused: {},
  cssDisabled:{
    borderColor: "black",
    color: "black"
  },
});

const mapStateToProps = state => {
  return {
      chosenCar: state.chosenCar
  }
}

function DisabledTextField(label, value, classes){
  return(
    <TextField
          disabled
          id="outlined-disabled"
          label={label}
          defaultValue={value}
          InputLabelProps={{
            classes: {
              root: classes.label,
              focused: classes.cssFocused,
              disabled: classes.cssDisabled,
            },
          }}
          InputProps={{
            classes: {
              root: classes.rootOutlinedInput,
              notchedOutline: classes.notchedOutline,
              disabled: classes.cssDisabled,
            },
          }}
          margin="normal"
          variant="outlined"
      />
  )
}

class CarInfoForm extends Component {

  constructor(){
    super()
    this.state={
      isOpenPhotosViewer: false
    }
  }

  showPhotosViewer = event => {
    this.setState({
      isOpenPhotosViewer: true
    })
  }

  handleClosePhotosViewer = event =>{
    this.setState({
      isOpenPhotosViewer: false
    })
  }

    render(){
      const {classes} = this.props;
      const mainPhoto = this.props.chosenCar.photos !== undefined ? this.props.chosenCar.photos[0] : undefined
    return (
        <Paper className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <CardMedia
                  className={classes.media}
                  image={mainPhoto}
                  title="My car"
                  component={Button}
                  onClick={this.showPhotosViewer}
                />
            </Grid>
          <Grid item xs={6}>
                {DisabledTextField("Name", this.props.chosenCar.name, classes)}
                {DisabledTextField("VIN", this.props.chosenCar.VIN,classes)}
                {DisabledTextField("Register number", this.props.chosenCar.registerNumber,classes)}
                {DisabledTextField("First registration", this.props.chosenCar.firstRegistrationDate,classes)}
          </Grid>
        </Grid>
        <FixesTable car={this.props.chosenCar} />
        {this.state.isOpenPhotosViewer && <CarPhotoViewer isOpened={this.state.isOpenPhotosViewer} handleOnClose={this.handleClosePhotosViewer} car={this.props.chosenCar} /> }
        </Paper>
    );
    }
}

// CenteredGrid.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default connect(mapStateToProps,null)(withStyles(styles)(CarInfoForm));