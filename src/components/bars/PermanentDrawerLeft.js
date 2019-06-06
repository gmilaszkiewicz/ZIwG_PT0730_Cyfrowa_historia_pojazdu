import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from '@material-ui/core/Typography'
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { routes } from "../../constans/tabs-routes";
import { connect } from "react-redux";
import { chooseTab } from "./../../actions/index"

const drawerWidth = 190;

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  drawer: {
    flexShrink: 0,
    minWidth: 50,
    [theme.breakpoints.down('md')]: {
      width: "7%",
      overflowX: "hidden"
    },
    [theme.breakpoints.up('md')]: {
      width: drawerWidth, 
    },
  },
  drawerPaper: {
    background: '#333333',
    minWidth: 50,
    [theme.breakpoints.down('md')]: {
      width: "7%",
      overflowX: "hidden"
    },
    [theme.breakpoints.up('md')]: {
      width: drawerWidth, 
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
  selectedListItem:{
  },
  listItemIcon:{
    color: 'white',
    minWidth: 40,
  },
  listItemText:{
    color: 'white',
    [theme.breakpoints.down('md')]: {
      visibility: "hidden",
    },
    [theme.breakpoints.up('md')]: {
      visibility: "visible",
    },
  }
});

function mapDispatchToProps(dispatch) {
  return {
    chooseTab: chosenTab => dispatch(chooseTab(chosenTab))
  };
}

const mapStateToProps = state => {
  return {
      chosenTab: state.chosenTab
  }
}

class PermanentDrawerLeft extends Component {

  
  render(){

    const { classes } = this.props;

    return (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
          color="primary"
        >
          <div className={classes.toolbar} />
          <Divider />
          <List className={classes.list}>
            {routes.map((route, index) => (
                route.visible && route.access.includes(this.props.authUser.role) &&
                <ListItem 
                component={Link} 
                key={route.name} 
                to={routes[index].path} 
                selected={this.props.chosenTab === index}
                className={classes.selectedListItem}
                onClick={event => this.props.chooseTab(index)}>
                  <ListItemIcon className={classes.listItemIcon}>
                    {route.icon()}
                  </ListItemIcon>
                  <ListItemText primary={<Typography type="body1" className={classes.listItemText}>{route.name}</Typography>} />
                </ListItem>
            ))}
          </List>
        </Drawer>
    );}
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PermanentDrawerLeft));
