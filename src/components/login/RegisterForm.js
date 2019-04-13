import React, { Component } from 'react';
import {Dialog, DialogTitle, Typography} from '@material-ui/core'
import {Tab, Tabs} from '@material-ui/core'
import { Formik, Form } from 'formik';
import OwnerForm from './OwnerForm';
import CarServiceForm from './CarServiceForm'

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }

export default class RegisterForm extends Component{

    constructor(){
        super()
        this.state = {
                numberOfTab: 0,
        };
    }

    handleChange = (event, numberOfTab) => {
       this.setState({ numberOfTab });
    };

    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };  

    // onClose={this.handleClose}

    render(){
        return(
            <Dialog aria-labelledby="simple-dialog-title" open={this.props.isOpened}  >
                <Tabs
                    value={this.state.numberOfTab}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth
                    >
                    <Tab label="Owner" />
                    <Tab label="Car service" />
                </Tabs>
                {this.state.numberOfTab===0 && (
                    <TabContainer>
                        <OwnerForm />
                    </TabContainer>
                )}
                {this.state.numberOfTab===1 && (
                    <TabContainer>
                        <CarServiceForm />
                    </TabContainer>
                )}
            </Dialog>
        )
    }
}