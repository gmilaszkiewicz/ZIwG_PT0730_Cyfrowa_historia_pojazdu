import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import CarPhotoViewer from './CarPhotosViewer';
import FixesTable from './FixesTable'
import TextField from '@material-ui/core/TextField'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { CarInfoPDF } from './../pdf/CarInfoPDF'  
import { LoadingSpinner } from './../common/LoadingSpinner'
import { ShareButton, SellCarButton } from './ShareButton'
import  SalesForm  from './SalesForm';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#333333',
    borderRadius: '30px',
    padding: theme.spacing(3),
    color:"white"

  },
  paper: {
    padding: theme.spacing(2),
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
    width: '100%',
    color:"white",
    "&$cssDisabled $notchedOutline": {   //add this nested selector
      borderColor: "white",
   },
   "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
    borderColor: "white"
    }
  },
  notchedOutline: {
    borderColor: "white",
  },
  label:{
    color: "white",
    '&$cssFocused': {
      color: "white",
    },
    '&$cssDisabled': {
      color: "white",
    }
  },
  cssFocused: {},
  cssDisabled:{
    borderColor: "white",
    color: "white"
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
      isOpenPhotosViewer: false,
      isOpenSalesForm: false,
      loading: true
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

  handleSetLoading = isLoading =>{
    this.setState({
      loading: isLoading
    })
  }

  handleCloseSalesForm = () => {
    this.setState({
      isOpenSalesForm: false
    })
  }

  handleSellCar = (event) => {
    event.preventDefault()
    this.setState({
      isOpenSalesForm: true
    })
  }

  render(){
    const {classes} = this.props;
    const mainPhoto = this.props.chosenCar.photos !== undefined ? this.props.chosenCar.photos[0] : undefined
    const selectedCar = this.props.chosenCar;
    return (
    <div>
      {/* {(this.state.loading)? */}
      {/* <LoadingSpinner loading={this.state.loading}/>: */}
      <Paper id="carInfo" className={classes.root}>
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
        <Grid item xs={6} >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {DisabledTextField("Brand", selectedCar.data.brand + " " + selectedCar.data.model, classes)}
              {DisabledTextField("Car type", selectedCar.data.carType, classes)}
              {DisabledTextField("Production year", selectedCar.data.productionYear, classes)}
              {DisabledTextField("VIN", this.props.chosenCar.VIN,classes)}
              {DisabledTextField("Register number", this.props.chosenCar.registerNumber,classes)}
            </Grid>
            <Grid item xs={6}>
              {DisabledTextField("Name", this.props.chosenCar.name,classes)}
              {DisabledTextField("First registration", this.props.chosenCar.firstRegistrationDate,classes)}
              {DisabledTextField("Engine capacity", selectedCar.data.engineCapacity + " cm3",classes)}
              {DisabledTextField("Engine power", selectedCar.data.enginePower + " kW",classes)}
              {DisabledTextField("Fuel type", selectedCar.data.fuelType,classes)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <PDFDownloadLink document={<CarInfoPDF car = {this.props.chosenCar} user={this.props.user} />} fileName="somename.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <ShareButton />)}
        </PDFDownloadLink>
        <SellCarButton handleClick={(event) => this.handleSellCar(event)}/>
      </div>
      <FixesTable car={this.props.chosenCar} />
      {this.state.isOpenPhotosViewer && <CarPhotoViewer isOpened={this.state.isOpenPhotosViewer} handleOnClose={this.handleClosePhotosViewer} car={this.props.chosenCar} /> }
      {this.state.isOpenSalesForm && <SalesForm open={this.state.isOpenSalesForm} onClose={this.handleCloseSalesForm} car = {this.props.chosenCar} user={this.props.user}/>}
      </Paper>
    </div>
  );
  }
}

// CenteredGrid.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default connect(mapStateToProps,null)(withStyles(styles)(CarInfoForm));