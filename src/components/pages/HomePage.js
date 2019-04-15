import React, { Component } from 'react';
import DrawerBar from './../bars/DrawerBar'
import TopBar from './../bars/TopBar'
import { withAuthorization, AuthUserContext } from '../session'

class HomePage extends Component{

    render(){
        return(
            <AuthUserContext.Consumer>
                {authUser => (
            <div>
                {/* <TopBar /> */}
                {console.log(authUser.email)}
                <DrawerBar />
            </div> )}
            </AuthUserContext.Consumer>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);