import React, { Component } from 'react'
import {Dialog} from '@material-ui/core'

export default class AddFixForm extends Component{

    render(){
        return(
            <Dialog open={this.props.isOpened}  onClose={this.props.handleOnClose}>
                <p>Hello</p>        
            </Dialog>
        );
    }
    
}