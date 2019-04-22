import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { routes } from "./routes";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  appBar: {
    marginLeft: drawerWidth,
    zIndex: 1400
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  grow: {
    flexGrow: 1,
  },
});

function PermanentDrawerLeft(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
            Place for tittle
          </Typography>
          <div>
                <IconButton
                  aria-owns='home'
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  // anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  // open={open}
                  // onClose={this.handleClose}
                >
                  {/* <MenuItem onClick={this.handleClose}>Profile</MenuItem> */}
                  {/* <MenuItem onClick={this.handleClose}>My account</MenuItem> */}
                </Menu>
              </div>
        </Toolbar>
      </AppBar>
      {/* <Router> */}
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"s
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>
            {routes.map((route, index) => (
              <Link to={`${routes[index].path}`}>
                <ListItem button key={route.name}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={route.name} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.sidebar}
            />
          ))}
        </main>
      {/* </Router> */}
    </div>
  );
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PermanentDrawerLeft);
