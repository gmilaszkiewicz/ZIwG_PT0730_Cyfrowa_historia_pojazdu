import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import CarPhotoViewer from './CarPhotosViewer';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const styles = theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: '#424242',
    borderRadius: '30px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 200,
    width: 300,
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
});

const mapStateToProps = state => {
  return {
      chosenCar: state.chosenCar
  }
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
    console.log("Close popup")
    this.setState({
      isOpenPhotosViewer: false
    })
  }

    render(){
      const {classes} = this.props;
    
    return (
      
        <div className={classes.root}>
        <CardMedia
          className={classes.media}
          image={this.props.chosenCar.photos[0]}
          title="My car"
          component={Button}
          onClick={this.showPhotosViewer}
        />
        <GridList className={classes.gridList} cols={2.5}>
            {this.props.chosenCar.photos.map(car => (
            <GridListTile key={car.img}>
                <img src={car.img} alt={car.VIN} />
                <GridListTileBar
                title={car.name}
                classes={{
                    root: classes.titleBar,
                    title: classes.title,
                }}
                actionIcon={
                    <IconButton>
                    <StarBorderIcon className={classes.title} />
                    </IconButton>
                }
                />
            </GridListTile>
            ))}
        </GridList>
        {this.state.isOpenPhotosViewer && <CarPhotoViewer isOpened={this.state.isOpenPhotosViewer} handleOnClose={this.handleClosePhotosViewer} car={this.props.chosenCar} /> }
        {/* <Grid container spacing={24}>
            <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12</Paper>
            </Grid>
            <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
        </Grid> */}
        </div>
    );
    }
}

// CenteredGrid.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default connect(mapStateToProps,null)(withStyles(styles)(CarInfoForm));