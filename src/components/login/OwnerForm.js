import React, { Component } from 'react';
import {Paper, TextField, Grid, Button, Typography, Divider, Tab, Tabs} from '@material-ui/core'
import styled from 'styled-components';
import { Formik, Field, Form } from 'formik';
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'

export default class OwnerForm extends Component{

    render(){
        return(
            <div>
            <Grid container direction="column" spacing={8} justify="center">
                <Grid item>
                    <Field
                        name="name" 
                        component={TextField}
                        id="standard-required"
                        label="Name"
                        margin="normal"
                    /><br></br>
                    <Field
                        name="surname"
                        component={TextField}
                        id="standard-required"
                        label="Surname"
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <Field
                        name="email"
                        component={TextField}
                        id="standard-required"
                        type="email"
                        autoComplete="email"
                        label="Email"
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <Field
                        name="password"
                        component={TextField}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <Field
                        name="password"
                        component={TextField}
                        id="outlined-password-input"
                        label="Repeat password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                     <Divider variant="middle"/> 
                 </Grid>
                 <Grid item>
                    <Button variant="contained" color="primary" onClick={this.handleOpenRegisterFrom}>
                        Register
                    </Button>
                 </Grid>
        </Grid>
        </div>
        )
    }

}