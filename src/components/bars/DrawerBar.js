import React, { Component } from 'react';
import {ListItemText, ListItem, Divider, List, Drawer, Toolbar} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import styled from 'styled-components';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)`
    position: absolute;
    width: "drawerWidth";
    flex-shrink: 0;
    z-index: -1;
`

class DrawerBar extends Component {
  
    render(){
        return (
            <StyledDrawer variant="permanent">

            <Toolbar />
            <List>
                {['Show my cars', 'Car services'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
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
        );
    }
  }

  export default DrawerBar;