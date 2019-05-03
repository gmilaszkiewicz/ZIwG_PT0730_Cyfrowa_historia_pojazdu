import React, { Component } from 'react'
import {Dialog} from '@material-ui/core'

export default class AddUpgradeForm extends Component{

    render(){
        return(
            <Dialog open={this.props.isOpened}  onClose={this.props.handleOnClose}>
                <p>Hello 2</p>        
            </Dialog>
        );
    }
    
}