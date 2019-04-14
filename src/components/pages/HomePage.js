import React, { Component } from 'react';
import DrawerBar from './../bars/DrawerBar'
import TopBar from './../bars/TopBar'

export default class HomePage extends Component{

    render(){
        return(
            <div>
                <TopBar />
                <DrawerBar />
            </div>
        );
    }
}