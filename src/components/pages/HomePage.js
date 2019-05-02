import React, { Component } from "react";
import PermanentDrawerLeft from "../bars/PermanentDrawerLeft";
import { withAuthorization, AuthUserContext } from '../session'

class HomePage extends Component{

    render(){
        return(
            <AuthUserContext.Consumer>
                {authUser => (
            <div>
                {/* <TopBar /> */}
                <PermanentDrawerLeft authUser={authUser}/>
            </div> )}
            </AuthUserContext.Consumer>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);