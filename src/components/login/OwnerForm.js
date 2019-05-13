import React, { Component } from 'react';
import {TextField, Grid, Button} from '@material-ui/core'
import { Field } from 'formik';

export default class OwnerForm extends Component{

    render(){
        return(
            <div>
            <Grid container direction="column" spacing={0} justify="center">
                <Grid container spacing={8}>
                    <Grid item>
                        <Field
                            name="name" 
                            required
                            component={TextField}
                            id="standard-required"
                            label="Name"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item >
                        <Field
                            name="surname"
                            component={TextField}
                            id="standard-required"
                            label="Surname"
                            margin="normal"
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <Field
                        name="email"
                        required
                        component={TextField}
                        id="standard-required"
                        type="email"
                        autoComplete="email"
                        label="Email"
                        margin="normal"
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <Field
                        name="password"
                        required
                        component={TextField}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <Field
                        name="reapeted-password"
                        required
                        component={TextField}
                        id="outlined-reapeted-password-input"
                        label="Repeat password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        fullWidth
                    />
                </Grid>
                 <Grid item>
                    <Button variant="contained" color="primary"  fullWidth onClick={this.handleOpenRegisterFrom}>
                        Register
                    </Button>
                 </Grid>
        </Grid>
        </div>
        )
    }

}