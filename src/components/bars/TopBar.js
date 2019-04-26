import React, { Component } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SignOutButton from './SignOutButton';
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    marginLeft: drawerWidth,
    zIndex: theme.zIndex.drawer + 1
  },
  grow: {
    flexGrow: 1,
  },
  userMenu: {
    zIndex: theme.zIndex.appbar + 1
  }
});

class TopBar extends Component{

    state = {
        anchorEl: null,
      };
    
      handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
    
      handlelogOut = ({ firebase }) => {
        console.log(firebase)
        firebase.doSignOut();
        this.handleClose();
      }

    render(){

        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return(
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
                Place for tittle
            </Typography>
            <div>
                <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
                className={classes.userMenu}
                >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <SignOutButton />
                </Menu>
            </div>
            </Toolbar>
        </AppBar>
        )
    }
}

export default withStyles(styles)(TopBar)