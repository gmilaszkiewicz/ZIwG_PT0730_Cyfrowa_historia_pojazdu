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
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import classNames from "classnames";

const carInfoIndex = 5;

const StyledCardAction = styled(CardActions)`
  justify-content: space-around;

`;

const StyledCardMedia = styled(CardMedia)`
  &&{
    border-radius: 20px;
  }
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

  handleSharePDF = event => {
    this.handleClick()
  }

  render() {
    const { images, name, vin, className } = this.props;
    console.log(className)
    return (
      <Card id="card" className={classNames(className, "card")}>
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
            fullWidth
            style={{ height: '50px'}}
          >
            Add Fix
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={this.handleOpenUpgradeForm}
            fullWidth
            style={{ height: '50px'}}
          >
            Add Modification
          </Button>
          <IconButton 
            aria-label="Share"
            onClick={this.handleSharePDF}
          >
            <ShareIcon />
          </IconButton>
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

const connectedComponent = connect(null, mapDispatchToProps)(CarCard)

export const StyledCarCard = styled(connectedComponent)`
  .card{
    border-radius: 30px;
  }
  .media {
    height: 190px;
  }
  .image {
    width: 100px;
  }
`;
