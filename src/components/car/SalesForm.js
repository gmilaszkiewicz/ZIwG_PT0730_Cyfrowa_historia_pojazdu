import React, {Component} from 'react'
import { Dialog } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { withFirebase } from "../../config/firebase/context";
import styled from 'styled-components'
import withSnackbar from './../snackbar/withSnackbar'
import { connect } from "react-redux";
import { chooseTab, chooseCar } from "./../../actions/index";
import Grid from "@material-ui/core/Grid";


const StyledDiv = styled.div`
    padding: 15px;
    margin-right: 17px;
`;

const StyledField = styled(TextField)`
    &&{
        margin: 10px;
    }
`;

const StyledButton = styled(Button)`
    &&{
        margin: 10px;
    }
`;

function mapDispatchToProps(dispatch) {
    return {
      chooseTab: chosenTab => dispatch(chooseTab(chosenTab)),
      chooseCar: chosenCar => dispatch(chooseCar(chosenCar))
    };
  }

class SalesForm extends Component {

    constructor(){
        super()
        this.state = {
            newOwnerEmail: "",
            openInfoAfterAccept: false,
            code: ""
        }
    }

    handleSellCar = () => {
        if(this.state.code == "CODE"){
            this.props.firebase.userByEmail(this.state.newOwnerEmail).on("value", snapshot => {
                if(snapshot.val()){
                    let uid = snapshot.val().uid;
                    if(this.props.user.uid === uid){
                        this.props.snackbar.showMessage(
                            "Bez żartów :P", "error")
                    }else{
                        this.props.firebase.sellCar(uid, this.props.user, this.props.car)
                        this.props.snackbar.showMessage(
                            "Successful sale!", "success")
                        this.props.chooseTab(0)
                    }
                }else{
                    this.props.snackbar.showMessage(
                        "Bad e-mail buyer!", "error")
                }
            });
        }else{
            this.props.snackbar.showMessage(
                "Bad code!", "error")
        }
        this.props.onClose();
    }

    handleOpenVerificationModal = () =>{
        this.setState({
            openInfoAfterAccept:true
        })
    }
    
    handleChangeEmail = (event) => {
        this.setState({
            newOwnerEmail: event.target.value
        })
    }

    handleChangeVerCode = (event) =>{
        this.setState({
            code: event.target.value
        })
    }

    render(){
        return (
            <Dialog
            open={this.props.open}
            onClose={this.props.onClose}>
            <StyledDiv>
            <Grid container direction="column" spacing={2} justify="center">
                <Grid item>
                    <StyledField
                    disabled={this.state.openInfoAfterAccept}
                    label="E-mail new owner"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <AccountCircle />
                        </InputAdornment>
                    ),
                    }}
                    onChange={this.handleChangeEmail}
                    fullWidth
                    />
                    </Grid>
                <Grid item>
                    <StyledButton variant="contained" 
                        fullWidth
                        disabled={this.state.openInfoAfterAccept}
                        color="primary" 
                        onClick={this.handleOpenVerificationModal}
                        >
                        Verification
                    </StyledButton>
                </Grid>
                <Grid item>
                {this.state.openInfoAfterAccept && 
                <Grid container direction="column" spacing={2} justify="center">
                    <Grid item>
                        <StyledField
                            label="Code from your e-mail"
                            onChange={this.handleChangeVerCode}
                            handleChangeVerCode
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <StyledButton variant="contained" 
                        color="primary" 
                        onClick={this.handleSellCar}
                        fullWidth
                        >
                            Sell car
                        </StyledButton>
                    </Grid>
                    </Grid>}
                </Grid>
                </Grid>
                </StyledDiv>
            </Dialog>
        );
    }
}

export default connect(
    null,
    mapDispatchToProps
  )(withSnackbar()(withFirebase(SalesForm)))