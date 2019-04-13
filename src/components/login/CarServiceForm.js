import React, { Component } from 'react';
import { TextField, Grid, Button} from '@material-ui/core'
import { Field } from 'formik';

export default class CarServiceForm extends Component{

    render(){
        return(
            <div>
                <Grid container direction="column" spacing={8} justify="center">
                <Grid item>
                    <Field
                        name="name"
                        required
                        component={TextField}
                        id="standard-required"
                        label="Service name"
                        margin="normal"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address"
                        fullWidth
                        autoComplete="billing address-line1"
                    />
                </Grid>
                <Grid container spacing={16}>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                                required
                                id="zip"
                                name="zip"
                                label="Zip / Postal code"
                                autoComplete="billing postal-code"
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
                            component={TextField}
                            required
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
                            component={TextField}
                            required
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