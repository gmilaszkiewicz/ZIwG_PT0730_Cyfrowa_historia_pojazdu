import React, {Component} from 'react'
import { Dialog } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { withFirebase } from "../../config/firebase/context";


class SalesForm extends Component {

    constructor(){
        super()
        this.state = {
            newOwnerEmail: ""
        }
    }

    handleSellCar = () => {
        this.props.firebase.userByEmail(this.state.newOwnerEmail).on("value", snapshot => {
            let uid = snapshot.val().uid;
            this.props.firebase.sellCar(uid, this.props.user, this.props.car)
        });
    }
    
    handleChangeEmail = (event) => {
        this.setState({
            newOwnerEmail: event.target.value
        })
    }

    render(){
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <TextField
                // className={classes.margin}
                label="E-mail new owner"
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <AccountCircle />
                    </InputAdornment>
                ),
                }}
                onChange={this.handleChangeEmail}
                />
                <Button variant="contained" 
                    color="primary" 
                    // className={classes.button}
                    onClick={this.handleSellCar}
                    >
                    Primary
                </Button>
            </Dialog>
            
        );
    }
}

export default withFirebase(SalesForm)