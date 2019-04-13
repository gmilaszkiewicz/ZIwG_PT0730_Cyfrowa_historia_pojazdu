import React, { Component } from 'react';
import './App.css';
import LoginPage from './components/pages/LoginPage';
import {Switch, Route} from 'react-router-dom'
import HomePage from './components/pages/HomePage'

class App extends Component {
  
  render() {
    return (
    <div>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/home" component={HomePage} />
      </Switch>
    </div>
    );
  }

}

export default App;
