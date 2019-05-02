import React, { Component } from "react";
import PermanentDrawerLeft from "../bars/PermanentDrawerLeft";
import { withAuthorization, AuthUserContext } from '../session'
import TopBar from './../bars/TopBar'
import PageContent from './../content/PageContent'

const drawerWidth = 240;

class HomePage extends Component{

    constructor(){
        super()
        this.state = {
            choosenTab: 0
        }
    }

    handleChangeTab = (event, index) => {
        if(event.target.outerText==='Profile'){
            index = 5
        }
        this.setState({
            choosenTab: index
        })
    }

    render(){
        return(
            <AuthUserContext.Consumer>
                {authUser => (
            <div>
                <TopBar drawerWidth={drawerWidth} changeTab = {this.handleChangeTab} authUser={authUser}/>
                <PermanentDrawerLeft authUser={authUser} drawerWidth={drawerWidth} changeTab = {this.handleChangeTab} choosenTab={this.state.choosenTab}/>
                {/* <PageContent choosenTab={this.state.choosenTab}/> */}
            </div> )}
            </AuthUserContext.Consumer>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);