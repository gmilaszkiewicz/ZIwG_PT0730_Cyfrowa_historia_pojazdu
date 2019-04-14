import React from "react";
import styled from "styled-components";
import { StyledCarCard as CarCard } from "./CarCard";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { initialValues } from "./../../InitialValues";

export class CarList extends React.Component {
  componentDidMount() {
    this.carList = initialValues.cars;
  }
  state = {};

  carList = initialValues.cars;

  render() {
    console.log(this.carList);
    return (
      <div className={this.props.className}>
        <div>
          <GridList cellHeight={180} className="grid-list">
            <GridListTile key="Subheader" cols={2}>
              <ListSubheader component="div">December</ListSubheader>
            </GridListTile>
            {this.carList.map((car, index) => (
              <GridListTile key={index}>
                <CarCard vin={car.vin} name={car.name} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export const StyledCarList = styled(CarList)`
  display: "flex";
  flex-wrap: "wrap";
  justify-content: "space-around";
  overflow: "hidden";

  .grid-list {
    width: 500px;
    height: 450px;
  }
  .icon {
    color: "rgba(255, 255, 255, 0.54)";
  }
`;
