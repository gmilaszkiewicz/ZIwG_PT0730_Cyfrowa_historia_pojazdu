import React, { Component } from "react";
import styled from "styled-components";
import { StyledCarCard as CarCard } from "./CarCard";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { withFirebase } from "../../config/firebase/context";
import { compose } from "recompose";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import { withStyles } from "@material-ui/core/styles";
import { StyledNewCarForm } from "./NewCarForm";
import Zoom from "@material-ui/core/Zoom";
import classNames from "classnames";
import { LoadingSpinner } from "../common/LoadingSpinner";

const styles = theme => ({
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(6),
    right: theme.spacing(7)
  }
});

export class CarList extends Component {
  constructor() {
    super();
    this.state = {
      carList: [],
      isOpenAddNewCarModal: false,
      checked: true,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    this.props.firebase
      .userCars(this.props.authUser.uid)
      .on("value", snapshot => {
        let cars = [];
        if (snapshot.val().cars) {
          Object.values(snapshot.val().cars).forEach(object => {
            cars.push(object);
          });
          this.groupImages(cars);
        }
        this.setState({ carList: cars, loading: false });
      });
  }
  groupImages = cars => {
    let arrayOfImages = [];
    cars.forEach((car, index) => {
      arrayOfImages = [];
      if (car.photos) arrayOfImages = car.photos.split("&&&");
      car.photos = arrayOfImages;
    });
  };

  componentWillUnmount() {
    this.props.firebase.userCars().off();
  }

  handleAddNewCar = event => {
    this.setState({
      isOpenAddNewCarModal: true
    });
  };

  handleCloseNewCarModal = event => {
    this.setState({
      isOpenAddNewCarModal: false
    });
  };

  render() {
    const { classes } = this.props;
    const speedDialClassName = classNames(classes.speedDial);
    
    return this.state.loading ? (
      <LoadingSpinner />
    ) : (
      <div
        className={this.props.className}
        onClose={this.props.handleOnClose}
        open={this.props.isOpened}
      >
        <GridList
          cellHeight={350}
          className="grid-list"
          cols={3}
          spacing={10}
          padding={1}
        >
          {this.state.carList.map((car, index) => (
            <Zoom
              key={index}
              in={this.state.checked}
              style={{
                transitionDelay: this.state.checked ? index * 400 : 0
              }}
            >
              <GridListTile key={index}>
                <CarCard
                  vin={car.VIN}
                  name={car.name}
                  images={car.photos}
                  car={car}
                  loggedUserUid={this.props.firebase.auth.currentUser.uid}
                  authUser={this.props.authUser}
                />
              </GridListTile>
            </Zoom>
          ))}
        </GridList>
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          className={speedDialClassName}
          icon={<SpeedDialIcon />}
          onClick={this.handleAddNewCar}
          open={false}
          children={null}
        />
        {this.state.isOpenAddNewCarModal && (
          <StyledNewCarForm
            isOpened={this.state.isOpenAddNewCarModal}
            handleOnClose={this.handleCloseNewCarModal}
          />
        )}
      </div>
    );
  }
}

const WithStylesCarList = withStyles(styles)(CarList);

const StyledCarList = compose(withFirebase)(styled(WithStylesCarList)`
  display: "flex";
  flex-wrap: "wrap";
  justify-content: "space-around";
  overflow: "hidden";

  .grid-list {
  }
  .grid-item {
    && {
      border-radius: 30px;
    }
  }
  .icon {
    color: "rgba(255, 255, 255, 0.54)";
  }
`);

export { StyledCarList };
