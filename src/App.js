import React, { Component } from "react";
import "./App.css";
import LoginPage from "./components/pages/LoginPage";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import { StyledCarCard as CarCard } from "./components/car-card/CarCard";
import { StyledCarList as CarList } from "./components/car-card/CarList";
import { MuiThemeProvider } from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core/styles';
import Firebase, { FirebaseContext } from './config/firebase/index';

const muiTheme = createMuiTheme({
    palette:{
        type: 'light',
    },
    typography: {
      useNextVariants: true,
    },
})

class App extends Component {
  render() {
    return (
    <MuiThemeProvider theme={muiTheme}>
      <FirebaseContext.Provider value={new Firebase()}> 
        <Switch>
          <Route authorize={["owner"]} exact path="/" component={LoginPage} />
          <Route
            authorize={["service"]}
            exact
            path="/home"
            component={HomePage}
          />
          <Route
            authorize={["service"]}
            exact
            path="/card"
            component={CarList}
          />
        </Switch>
      </FirebaseContext.Provider>
    </MuiThemeProvider>
    );
  }
}

export default App;
