import React, { Component } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SignOutButton from './SignOutButton';
import { withStyles } from "@material-ui/core/styles";
import Link from '@material-ui/core/Link'

const drawerWidth = 240;
const title = "Cyfrowa historia pojazdów";

const styles = theme => ({
  appBar: {
    marginLeft: drawerWidth,
    zIndex: theme.zIndex.drawer + 1
  },
  grow: {
    flexGrow: 1,
    padding: 10

  },
  userMenu: {
    zIndex: theme.zIndex.appbar + 1
  },
  userInfo:{
    display: 'flex',
    flexDirection: 'row'
  }, 
  toolbar:{
    paddingLeft:0
  }
});

class TopBar extends Component{

    state = {
        anchorEl: null,
      };
    
      handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = (event) => {
        event.target.outerText==='Profile' && this.props.changeTab(event)
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
            <Toolbar className={classes.toolbar}>
            <IconButton component={Link} to="/home" className={classes.menuButton} color="inherit">
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
                {title}
            </Typography>
            <div className={classes.userInfo}>
                <Typography variant="body1" color="inherit" noWrap className={classes.grow}>
                    {this.props.authUser.email}
                </Typography>
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
                    <MenuItem name="profile" onClick={event => this.handleClose(event)}>Profile</MenuItem>
                    <SignOutButton />
                </Menu>
            </div>
            </Toolbar>
        </AppBar>
        )
    }
}

export default withStyles(styles)(TopBar)