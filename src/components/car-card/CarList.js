import React, { Fragment } from "react";
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
    return (
      <div className={this.props.className}>
        <GridList cellHeight={200} className="grid-list" cols={3} spacing={10} padding={1}>
          {this.carList.map((car, index) => (
            <GridListTile key={index}>
              <CarCard vin={car.vin} name={car.name} />
            </GridListTile>
          ))}
        </GridList>
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
  }
  .icon {
    color: "rgba(255, 255, 255, 0.54)";
  }
`;
