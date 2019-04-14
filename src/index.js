import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider } from '@material-ui/core';
import {darkBaseTheme} from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import Firebase, { FirebaseContext } from './config/index';

const muiTheme = createMuiTheme({
    palette:{
        type: 'dark',
    },
})

ReactDOM.render(
    <BrowserRouter>
        <FirebaseContext.Provider value={new Firebase()}>
            <MuiThemeProvider muiTheme={muiTheme}>
                <App />
            </MuiThemeProvider>
        </FirebaseContext.Provider>
    </BrowserRouter>,
     document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
