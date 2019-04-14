import React, { Component } from "react";
import "./App.css";
import LoginPage from "./components/pages/LoginPage";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import { StyledCarCard as CarCard } from "./components/car-card/CarCard";
import { StyledCarList as CarList } from "./components/car-card/CarList";

class App extends Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default App;
