import React, { Component } from 'react';
import {Paper, TextField, Grid, Button, Typography, Divider} from '@material-ui/core'
import styled from 'styled-components';
import { Formik, Field, Form } from 'formik';
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'
import RegisterForm from '../login/RegisterForm';

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

const StyledButton = styled(Button)`
    width:100%;
    padding:10px;
`

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
    width: 100%;
    text-align: center;
    display: inline-block;
`;

const StyledToggleButton = styled(ToggleButton)`
   width: 50%;
`

export default class LoginForm extends Component{

    constructor(){
        super()
        this.state = {
            registerFormIsOpened: false,
            role: "owner"
        }
    }

    handleCloseRegisterForm = (event) => {
        event.preventDefault()
        this.setState((prevState) => ({
                ...prevState,
                registerFormIsOpened: false
        }))
    }

    handleOpenRegisterForm = (event) => {
        event.preventDefault()
        this.setState((prevState) => ({
                ...prevState,
                registerFormIsOpened: true
        }))
    }

    handleRole = (event, role) =>{
        this.setState({
            role
        })
    }

    ToggleButtons = () =>  (
        <StyledToggleButtonGroup exclusive value={this.state.role} onChange={this.handleRole}>
            <StyledToggleButton value="owner" id="owner">
                Owner
            </StyledToggleButton>
            <StyledToggleButton value="service">
                Car Service
            </StyledToggleButton>
        </StyledToggleButtonGroup>
    );

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
                        <Field component={this.ToggleButtons} name="roles" />
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
                                <StyledButton type="submit" variant="contained" color="primary">
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
                                <StyledButton variant="contained" color="secondary" onClick={this.handleOpenRegisterForm}>
                                    Register account
                                </StyledButton>
                            </Grid>
                    </Grid>
                    {this.state.registerFormIsOpened && <RegisterForm isOpened={this.state.registerFormIsOpened} handleOnClose={this.handleCloseRegisterForm} /> }
                </Form>
                )}
            />
        </StyledPaper>
        )
    }
}