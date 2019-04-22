import React, { Component } from "react";
import "./App.css";
import LoginPage from "./components/pages/LoginPage";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import { StyledCarList as CarList } from "./components/car/CarList";
import {BrowserRouter} from 'react-router-dom'
import { withAuthentication } from "./components/session"
import * as ROUTES from './constans/routes'




const App = () => (
        <BrowserRouter>
          <div>
            {/* <Route authorize={["owner"]} exact path="/" component={LoginPage} />
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
            /> */}
              <Route exact path={ROUTES.LANDING} component={LoginPage} />
              <Route path={ROUTES.HOME} component={HomePage} />
              </div>
      </BrowserRouter>
  );

export default withAuthentication(App);
