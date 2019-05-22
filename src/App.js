import React from "react";
import "./App.css";
import LoginPage from "./components/pages/LoginPage";
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import {BrowserRouter} from 'react-router-dom'
import { withAuthentication } from "./components/session"
import * as ROUTES from './constans/routes'
import SnackbarProvider from './components/snackbar/SnackbarProvider'

  {/* the rest of your app belongs here, e.g. the router */}

const App = () => (
  <SnackbarProvider SnackbarProps={{ autoHideDuration: 3000 }}>
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
  </SnackbarProvider>
  );

export default withAuthentication(App);
