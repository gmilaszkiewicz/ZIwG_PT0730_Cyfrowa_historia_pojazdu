import React, { Component } from 'react';
import {Paper, TextField, Grid, Button, Typography, Divider, Tab, Tabs} from '@material-ui/core'
import styled from 'styled-components';
import { Field } from 'formik';
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'

export default class CarServiceForm extends Component{

    render(){
        return(
            <div>
            <Field 
            component={ToggleButtonGroup} name="roles" 
            />
            {/* <Grid container direction="column" spacing={16} justify="center">
                <Grid item> */}
                    <Field
                        name="name" 
                        component={TextField}
                        required
                        id="standard-required"
                        label="Required"
                        defaultValue="Hello World"
                        margin="normal"
                    />
                {/* </Grid>
                <Grid item> */}
                    <Field
                        name="surname"
                        component={TextField}
                        required
                        id="standard-required"
                        label="Required"
                        defaultValue="Hello World"
                        margin="normal"
                    />
                    <Field
                        name="surname"
                        component={TextField}
                        required
                        id="standard-required"
                        label="Required"
                        defaultValue="Hello World"
                        margin="normal"
                    />
                {/* </Grid>
                <Grid item> */}
                     <Divider variant="middle"/> 
                 {/* </Grid>
                 <Grid item> */}
                    <Button variant="contained" color="primary" onClick={this.handleOpenRegisterFrom}>
                        Register
                    </Button>
                 {/* </Grid>
            </Grid> */}
            </div>
        )
    }
}