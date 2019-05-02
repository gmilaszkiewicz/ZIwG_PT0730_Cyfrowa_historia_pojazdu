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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { routes } from "../../constans/tabs-routes";
import { StyledCarList } from "../car/CarList";
import TopBar from "./TopBar"
import Button from '@material-ui/core/Button'


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

  constructor(){
    super()
    this.state = {
      choosenTab: 0
    }
  }

  handleChangeTab = (event, index) => {
    if(event.target.outerText==='Profile'){
      index = 5
    }
    this.setState({
      choosenTab: index
    })
  }

  render(){

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TopBar drawerWidth={drawerWidth} changeTab = {this.handleChangeTab} authUser={this.props.authUser}/>
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
                selected={this.state.choosenTab === index}
                className={classes.selectedListItem}
                onClick={event => this.handleChangeTab(event, index)}>
                  <ListItemIcon className={classes.listItemIcon}>
                    {route.icon()}
                  </ListItemIcon>
                  <ListItemText primary={<Typography type="body1" style={{ color: 'white' }}>{route.name}</Typography>} />
                </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {routes.map((route, index) => (
            (this.state.choosenTab === index) && route.main(this.props.authUser)
          ))}
        </main>
      </div>
    );}
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PermanentDrawerLeft);
