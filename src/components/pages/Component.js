import React, { Component } from "react";
import PermanentDrawerLeft from "../bars/PermanentDrawerLeft";
import { withAuthorization, AuthUserContext } from "../session";
import TopBar from "./../bars/TopBar";
import PageContent from "./../content/PageContent";
import styled from "styled-components";
import {createAuthRoutes} from './../../constans/authRoutes'
import { routes } from "./../../constans/tabs-routes";

const drawerWidth = 240;

export default class ComponentX extends Component{

    // componentDidMount(){
    //     createAuthRoutes(routes, this.props.authUser)
    //   }

    // componentWillMount(){
    //     createAuthRoutes(routes, this.props.authUser)
    // }

    render(){
        return(
            <div>
                <TopBar drawerWidth={drawerWidth} authUser={this.props.authUser} />
                <PermanentDrawerLeft
                authUser={this.props.authUser}
                drawerWidth={drawerWidth}
                />
                <PageContent authUser={this.props.authUser} />
            </div>
        )
    }
}