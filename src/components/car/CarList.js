import React, { Component } from "react";
import styled from "styled-components";
import { StyledCarCard as CarCard } from "./CarCard";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { withFirebase } from "../../config/firebase/context";
import { compose } from 'recompose';

export class CarList extends Component {

  constructor(){
    super()
    this.state = {
      carList: []
    }
  }

  componentDidMount() {
    this.props.firebase.userCars().on('value', snapshot => {
      let cars = []
      Object.values(snapshot.val().cars).forEach((object) => {cars.push(object);})
      this.setState({
      carList: cars
      })
  })}

  componentWillUnmount() {
    this.props.firebase.userCars().off();
  }

  render() {
    return (
      <div className={this.props.className}>
        <GridList cellHeight={200} className="grid-list" cols={3} spacing={10} padding={1}>
          {this.state.carList.map((car, index) => (
            <GridListTile key={index}>
              <CarCard vin={car.VIN} name={car.name} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

const StyledCarList = compose(withFirebase)(styled(CarList)`
  display: "flex";
  flex-wrap: "wrap";
  justify-content: "space-around";
  overflow: "hidden";

  .grid-list {
  }
  .icon {
    color: "rgba(255, 255, 255, 0.54)";
  }
`);


export {StyledCarList}