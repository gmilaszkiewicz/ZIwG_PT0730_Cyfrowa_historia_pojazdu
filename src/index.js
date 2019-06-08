import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './config/firebase/index';
import {createMuiTheme} from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Provider } from "react-redux";
import {store} from './store';


const muiTheme = createMuiTheme({
    palette:{
      type: 'dark',
          primary: {
            main: '#212121'
          },
          contrastThreshold: 3,
          secondary: {
            main: grey[50]
          },
      
          background: {
            default: '#eeeeee'
          },
          text:{
              main: grey[50]
          },
          zIndex:{
            snackbar: 1050
          }
    },

    typography: {
      root:{
        color: grey[50]
      },
      useNextVariants: true,
      primary:{
          main: grey[50]
      }
    },
    overrides: {
      MuiTypography:{
        alignCenter:{
          color: "white"
        }
      },
      MuiButton:{
        textPrimary:{
            color: "white",
          }
      },
      MuiSnackbar:{
        zIndex: 900
      },
      MuiListItem: {

       root: {
         color:"white",
         '&$selected:hover': {
           backgroundColor: 'red',
         },
         '&$selected': {
          backgroundColor: 'red',
        },
        }
      },
      MuiInputLabel: { // Name of the component ?? / style sheet
        root: { // Name of the rule
          color: "white",
          "&$focused": { // increase the specificity for the pseudo class
            color: "white"
          }
        }
      },
      MuiFab: {
          primary:{
            backgroundColor:"red",
            '&:hover': {
              backgroundColor: "red",
            }
          }
      }
    },
})

ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={muiTheme}>
          <FirebaseContext.Provider value={new Firebase()}> 
              <App />
          </FirebaseContext.Provider>
      </MuiThemeProvider>
    </Provider>
    ,
     document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
