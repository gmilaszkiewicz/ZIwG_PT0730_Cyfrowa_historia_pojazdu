import React, { Component } from 'react';
import { snackSignInForm as SignInForm } from '../login/LoginForm'
import styled from 'styled-components';
import { connect } from "react-redux";

const StyledDiv = styled.div`
    background-image: url("http://www.kinyu-z.net/data/wallpapers/226/1494552.jpg");
    position: fixed; 
    min-width: 100%;
    min-height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
`

class LoginPage extends Component{

    render(){
        return(
            <StyledDiv>
                <SignInForm />
            </StyledDiv>
        );
    }
}

export default LoginPage