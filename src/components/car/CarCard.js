import React, {Component} from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FixesForm from './FixesForm'


const StyledCardAction = styled(CardActions)`
  justify-content: space-around;
`;

export class CarCard extends Component {

  constructor(){
    super()
    this.state={
      addFixIsOpened: false,
      addUpgradeIsOpend: false,
    }
  }

  handleOpenFixForm = (event) => {
    event.preventDefault()
    this.setState((prevState) => ({
            ...prevState,
            addFixIsOpened: true
    }))
  }

  handleOpenUpgradeForm = (event) => {
    event.preventDefault()
    this.setState((prevState) => ({
            ...prevState,
            addUpgradeIsOpend: true
    }))
  }

  handleCloseAddFixForm = (event) => {
    this.setState((prevState) => ({
            ...prevState,
            addFixIsOpened: false
    }))
  }

  handleCloseAddUpgradeForm = (event) =>{
    this.setState((prevState) => ({
            ...prevState,
            addUpgradeIsOpend: false
    }))
  }

  handleClick = (event) => {
    
  }

  render(){
    
    return (
        <Card>
          <CardActionArea>
            <CardContent onClick={this.handleClick} >
              <Typography gutterBottom variant="h5" component="h2" color="secondary">
                {this.props.name}
              </Typography>
              <Typography component="p" color="secondary">{this.props.vin}</Typography>
            </CardContent>
          </CardActionArea>
          <StyledCardAction>
            <Button size="small" color="secondary" onClick={this.handleOpenFixForm} >
              Dodaj Naprawę
            </Button>
            <Button size="small" color="secondary" onClick={this.handleOpenUpgradeForm}>
              Dodaj Ulepszenie
            </Button>
          </StyledCardAction>
          {this.state.addFixIsOpened && <FixesForm category="Fix" isOpened={this.state.addFixIsOpened} handleOnClose={this.handleCloseAddFixForm} /> }
          {this.state.addUpgradeIsOpend && <FixesForm category="Damage" isOpened={this.state.addUpgradeIsOpend} handleOnClose={this.handleCloseAddUpgradeForm} /> }
        </Card>
    );
  }
};

export const StyledCarCard = styled(CarCard)`
  .media {
    height:145px;
  }
`;
