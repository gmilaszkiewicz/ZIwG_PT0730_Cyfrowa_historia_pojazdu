import React, { Component } from "react";
import PermanentDrawerLeft from "../bars/PermanentDrawerLeft";
import { withAuthorization, AuthUserContext } from '../session'
import TopBar from './../bars/TopBar'
import PageContent from './../content/PageContent'
import styled from 'styled-components';

const drawerWidth = 240;

const StyledDiv = styled.div`
    display: flex;
    flex-grow: 1;
    min-height:1000px;
`

class HomePage extends Component{

    render(){
        return(
            <AuthUserContext.Consumer>
                {authUser => (
            <StyledDiv>
                <TopBar drawerWidth={drawerWidth}  authUser={authUser}/>
                <PermanentDrawerLeft authUser={authUser} drawerWidth={drawerWidth}/>
                <PageContent />
            </StyledDiv> )}
            </AuthUserContext.Consumer>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);