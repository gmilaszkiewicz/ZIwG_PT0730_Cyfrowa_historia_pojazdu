import React, { Component } from "react";
import styled from "styled-components";
import { Form, Formik } from "formik";
import { StyledSearch as Search } from "./Search";
import { StyledCarCard as CarCard } from "./../car/CarCard";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import Zoom from "@material-ui/core/Zoom";
import classnames from "classnames";
import { StyledNewCarForm } from "./../car/NewCarForm";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { withFirebase } from "./../../config/firebase/context";

const styles = theme => ({
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(6),
    right: theme.spacing(7)
  }
});

export class AddFixesService extends Component {
  constructor() {
    super();
    this.state = {
      carList: [],
      isOpenAddNewCarModal: false,
      checked: true,
      email: "",
      currentUid: ""
    };
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

  handleSearchChange = e => {
    this.setState({ email: e.target.value });
  };

  submitEmail = () => {
    this.props.firebase.userByEmail(this.state.email).on("value", snapshot => {
      let uid = snapshot.val().uid;
      this.setState({ currentUid: uid });
      this.props.firebase.userCars(uid).on("value", snapshot => {
        let cars = [];
        if (snapshot.val()) {
          Object.values(snapshot.val().cars).forEach(object => {
            cars.push(object);
          });
          this.groupImages(cars);
        }
        this.setState({ carList: cars });
      });
    });
  };

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <div className="top">
          <div className="search-bar ">
            <Search
              onChange={this.handleSearchChange}
              onClick={this.submitEmail}
            />
          </div>
        </div>
        <div className="content">
          <div
            onClose={this.props.handleOnClose}
            open={this.props.isOpened}
            className="car-list"
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
                      loggedUserUid={this.currentUid}
                    />
                  </GridListTile>
                </Zoom>
              ))}
            </GridList>
            {this.state.isOpenAddNewCarModal && (
              <StyledNewCarForm
                isOpened={this.state.isOpenAddNewCarModal}
                handleOnClose={this.handleCloseNewCarModal}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export const connectedAddFixesService = withFirebase(AddFixesService);

export const StyledAddFixesService = styled(connectedAddFixesService)`
  display: "flex";
  flex-wrap: "wrap";
  justify-content: "space-around";
  overflow: "hidden";
  .car-list {
    margin-top: 20px;
  }
  .icon {
    color: "rgba(255, 255, 255, 0.54)";
  }
  .top {
    display: flex;
    justify-content: center;
    .search-bar {
      width: 500px;
    }
  }
`;
