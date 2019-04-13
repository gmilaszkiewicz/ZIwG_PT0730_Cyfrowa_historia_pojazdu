import React, { Component } from 'react';
import {Paper, TextField, Grid, Button, Typography, Divider} from '@material-ui/core'
import styled from 'styled-components';
import { Formik, Field, Form } from 'formik';
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'

const StyledPaper = styled(Paper)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
`;

const StyledTextField = styled(TextField)`
    width: 300px;
`

const ToggleButtonsStyled = styled(ToggleButtonGroup)`
    width: 100%;
    justify-content: 'space-between';
`;

const StyledButton = styled(Button)`
    width:100%;
    padding:10px;
`

const StyledToggleButton = styled(ToggleButton)`
   
`


const ToggleButtons = () =>  (
    <ToggleButtonsStyled exclusive>
        <Grid container direction="row" spacing={0} justify="space-between">
            <Grid item sm={6}>
                <StyledToggleButton value="owner">
                    Owner
                </StyledToggleButton>
            </Grid>
            <Grid>
                <StyledToggleButton value="service" sm={6}>
                    Car Service
                </StyledToggleButton>
            </Grid>
        </Grid>
    </ToggleButtonsStyled>
);

export default class LoginForm extends Component{

    render(){
        return(
        <StyledPaper elevation={1}>
            <Formik
                initialValues={{ name: 'jared' }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                    }, 1000);
                }}
                render={props => (
                    <Form onSubmit={props.handleSubmit}>
                            <Field 
                                component={ToggleButtons} name="roles" 
                            />
                            <Grid container direction="column" spacing={16} justify="center">
                                <Grid item>
                                    <Field
                                        name="email" 
                                        component={StyledTextField}
                                        id="outlined-email-input"
                                        label="Email"
                                        type="email"
                                        autoComplete="email"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item>
                                    <Field
                                        name="password"
                                        component={StyledTextField}
                                        id="outlined-password-input"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item>
                                    <StyledButton variant="contained" color="primary">
                                        Log In
                                    </StyledButton>
                                </Grid>
                                <Grid item>
                                    <Divider variant="middle"/>
                                </Grid>
                                <Grid>   
                                    <Typography align="center">
                                        You don't have an account?
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <StyledButton variant="contained" color="secondary">
                                        Register account
                                    </StyledButton>
                                </Grid>
                        </Grid>
                    </Form>
                )}
            />
        </StyledPaper>
        )
    }
}