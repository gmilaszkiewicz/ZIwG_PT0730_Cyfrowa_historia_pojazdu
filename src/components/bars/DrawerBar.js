import React, { Component } from 'react';
import {ListItemText, ListItem, Divider, List, Drawer, Toolbar, Link} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {MyCars} from './MyCars'
import styled from 'styled-components'
import {StyledCarList as CarList} from './../car-card/CarList'
import { BrowserRouter as Router, Route } from "react-router-dom"

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)`
    position: absolute;
    width: "drawerWidth";
    flex-shrink: 0;
    z-index: -1;
`

const routes = [
    {
      path: "/cards",
      exact: true,
      sidebar: () => <CarList />,
      main: () => <h2>Home</h2>
    },
    {
      path: "/bubblegum",
      sidebar: () => <div>bubblegum!</div>,
      main: () => <h2>Bubblegum</h2>
    },
    {
      path: "/shoelaces",
      sidebar: () => <div>shoelaces!</div>,
      main: () => <h2>Shoelaces</h2>
    }
  ];

class DrawerBar extends Component {
  
    render(){
        return (
            <Router>
                <StyledDrawer variant="permanent">
                <Toolbar />
                <List>
                    {['Show my cars', 'Car services'].map((text, index) => (
                    // <Link to={MyCars}>
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    // {/* </Link> */}
                    ))}
                </List>
                <Divider />
                <List>
                    {['Info'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />

                    </ListItem>
                    ))}
                </List>
                </StyledDrawer>
            </Router>
        );
    }
  }

  export default DrawerBar;