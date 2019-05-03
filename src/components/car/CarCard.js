import React, {Component} from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddFixForm from './AddFixForm'
import AddUpgradeForm from './AddUpgradeForm'

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

  hadnleClick = () =>{
    console.log("something")
  }

  render(){
    return (
      <div>
        <Card className="card">
          <CardActionArea>
            <CardContent onClick={this.handleClick} >
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.name}
              </Typography>
              <Typography component="p">{this.props.vin}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="secondary" onClick={this.handleOpenFixForm} >
              Dodaj Naprawę
            </Button>
            <Button size="small" color="secondary" onClick={this.handleOpenUpgradeForm}>
              Dodaj Ulepszenie
            </Button>
          </CardActions>
        </Card>
        {this.state.addFixIsOpened && <AddFixForm isOpened={this.state.addFixIsOpened} handleOnClose={this.handleCloseAddFixForm} /> }
        {this.state.addUpgradeIsOpend && <AddUpgradeForm isOpened={this.state.addUpgradeIsOpend} handleOnClose={this.handleCloseAddUpgradeForm} /> }
      </div>
    );
  }
};

export const StyledCarCard = styled(CarCard)`
  .media {
    height:145px;
  }
`;
