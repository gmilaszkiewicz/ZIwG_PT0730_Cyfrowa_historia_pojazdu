import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './config/firebase/index';
import {createMuiTheme} from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core';


const muiTheme = createMuiTheme({
    palette:{
        type: 'light',
    },
    typography: {
      useNextVariants: true,
    },
})

ReactDOM.render(
    <MuiThemeProvider theme={muiTheme}>
        <FirebaseContext.Provider value={new Firebase()}> 
            <App />
        </FirebaseContext.Provider>
    </MuiThemeProvider>
    ,
     document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
