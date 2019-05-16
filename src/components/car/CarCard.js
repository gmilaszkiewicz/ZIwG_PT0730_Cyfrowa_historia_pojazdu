import React, { Component } from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FixesForm from "./FixesForm";
import { CardMedia } from "@material-ui/core";
import { connect } from "react-redux";
import { chooseTab, chooseCar } from "./../../actions/index";

const carInfoIndex = 5;

const StyledCardAction = styled(CardActions)`
  justify-content: space-around;
`;


const StyledCardMedia = styled(CardMedia)`
  border-radius: 50px;
`;

function mapDispatchToProps(dispatch) {
  return {
    chooseTab: chosenTab => dispatch(chooseTab(chosenTab)),
    chooseCar: chosenCar => dispatch(chooseCar(chosenCar))
  };
}

export class CarCard extends Component {
  constructor() {
    super();
    this.state = {
      addFixIsOpened: false,
      addUpgradeIsOpend: false
    };
  }

  handleOpenFixForm = event => {
    event.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      addFixIsOpened: true
    }));
  };

  handleOpenUpgradeForm = event => {
    event.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      addUpgradeIsOpend: true
    }));
  };

  handleCloseAddFixForm = event => {
    this.setState(prevState => ({
      ...prevState,
      addFixIsOpened: false
    }));
  };

  handleCloseAddUpgradeForm = event => {
    this.setState(prevState => ({
      ...prevState,
      addUpgradeIsOpend: false
    }));
  };

  handleClick = event => {
    this.props.chooseTab(carInfoIndex);
    this.props.chooseCar(this.props.car);
  };

  render() {
    const { images, name, vin, className } = this.props;
    return (
      <Card className={className}>
      {console.log(this.props.chosenCar)}
        <CardActionArea>
          <CardContent onClick={this.handleClick}>
            {(images !== undefined && images.length > 0) && (
              <StyledCardMedia
                className="media"
                image={images[0]}
                title="Car"
              />
            )}
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="secondary"
            >
              {name}
            </Typography>
            <Typography component="p" color="secondary">
              {vin}
            </Typography>
          </CardContent>
        </CardActionArea>
        <StyledCardAction>
          <Button
            size="small"
            color="secondary"
            onClick={this.handleOpenFixForm}
          >
            Add Fix
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={this.handleOpenUpgradeForm}
          >
            Add Modification
          </Button>
        </StyledCardAction>
        {this.state.addFixIsOpened && (
          <FixesForm
            category="Fix"
            isOpened={this.state.addFixIsOpened}
            handleOnClose={this.handleCloseAddFixForm}
            name={name}
          />
        )}
        {this.state.addUpgradeIsOpend && (
          <FixesForm
            category="Damage"
            isOpened={this.state.addUpgradeIsOpend}
            handleOnClose={this.handleCloseAddUpgradeForm}
            name={name}
          />
        )}
      </Card>
    );
  }
}

export const StyledCarCard = styled(
  connect(
    null,
    mapDispatchToProps
  )(CarCard)
)`
  .media {
    height: 200px;
    border-radius: 20px;
  }
  .image {
    width: 100px;
  }
`;
