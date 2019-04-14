import React, { Component } from 'react';
import {ListItemText, ListItem, Divider, List, Drawer, Toolbar} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {MyCars} from './MyCars'
import styled from 'styled-components'
import {StyledCarList as CarList} from './../car-card/CarList'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)`
    position: absolute;
    width: "drawerWidth";
    flex-shrink: 0;
    /* z-index: -1; */
`

const routes = [
    {
      path: "/cards",
      exact: true,
      sidebar: () => <CarList />,
    },
    {
      path: "/bubblegum",
      sidebar: () => <div>bubblegum!</div>,
    },
    {
      path: "/shoelaces",
      sidebar: () => <div>shoelaces!</div>,
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
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                            <Link to="/cards" />
                        </ListItem>
                    ))}
                </List>
                {routes.map((route, index) => (
                    // You can render a <Route> in as many places
                    // as you want in your app. It will render along
                    // with any other <Route>s that also match the URL.
                    // So, a sidebar or breadcrumbs or anything else
                    // that requires you to render multiple things
                    // in multiple places at the same URL is nothing
                    // more than multiple <Route>s.
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.sidebar}
                    />
                ))}
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
        //     <Router>
        //     <div style={{ display: "flex" }}>
        //       <div
        //         style={{
        //           padding: "10px",
        //           width: "40%",
        //           background: "#f0f0f0"
        //         }}
        //       >
        //         <ul style={{ listStyleType: "none", padding: 0 }}>
        //           <li>
        //             <Link to="/cards">Home</Link>
        //           </li>
        //           <li>
        //             <Link to="/bubblegum">Bubblegum</Link>
        //           </li>
        //           <li>
        //             <Link to="/shoelaces">Shoelaces</Link>
        //           </li>
        //         </ul>
      
        //         {routes.map((route, index) => (
        //           // You can render a <Route> in as many places
        //           // as you want in your app. It will render along
        //           // with any other <Route>s that also match the URL.
        //           // So, a sidebar or breadcrumbs or anything else
        //           // that requires you to render multiple things
        //           // in multiple places at the same URL is nothing
        //           // more than multiple <Route>s.
        //           <Route
        //             key={index}
        //             path={route.path}
        //             exact={route.exact}
        //             component={route.sidebar}
        //           />
        //         ))}
        //       </div>
      
        //       <div style={{ flex: 1, padding: "10px" }}>
        //         {routes.map((route, index) => (
        //           // Render more <Route>s with the same paths as
        //           // above, but different components this time.
        //           <Route
        //             key={index}
        //             path={route.path}
        //             exact={route.exact}
        //             component={route.main}
        //           />
        //         ))}
        //       </div>
        //     </div>
        //   </Router>
        );
    }
  }

  export default DrawerBar;