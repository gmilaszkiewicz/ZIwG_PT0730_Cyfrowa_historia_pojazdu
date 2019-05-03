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

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth, 
    background: '#424242'

  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  selectedListItem:{
  },
  list:{
    '&$selected': { 
      backgroundColor: theme.palette.action.selected, 
    },
  },
  listItemIcon:{
    color: 'white',
  }
});

class PermanentDrawerLeft extends Component {

  render(){

    const { classes } = this.props;

    return (
      // <div className={classes.root}>
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
                route.visible && 
                <ListItem 
                component={Link} 
                key={route.name} 
                to={routes[index].path} 
                selected={this.props.choosenTab === index}
                className={classes.selectedListItem}
                onClick={event => this.props.changeTab(event, index)}>
                  <ListItemIcon className={classes.listItemIcon}>
                    {route.icon()}
                  </ListItemIcon>
                  <ListItemText primary={<Typography type="body1" style={{ color: 'white' }}>{route.name}</Typography>} />
                </ListItem>
            ))}
          </List>
        </Drawer>
      // </div>
    );}
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PermanentDrawerLeft);
