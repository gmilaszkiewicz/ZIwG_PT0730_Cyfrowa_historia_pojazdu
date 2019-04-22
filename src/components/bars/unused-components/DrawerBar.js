import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  ListItemText,
  ListItem,
  Divider,
  List,
  Drawer,
  Toolbar
} from "@material-ui/core";
import styled from "styled-components";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { StyledCarList as CarList } from "./../car/CarList";
import TopBar from "./TopBar";
const StyledDrawer = styled(Drawer)`
  .drawer {
    top: 64px;
  }
  position: absolute;
  width: "drawerWidth";
  flex-shrink: 0;
  z-index: 1300;
`;

const styles = {
  navBar: { top: TopBar.height }
};

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: "/cars",
    exact: true,
    // sidebar: () => <div>aaa</div>,
    main: () => <CarList />
  },
  {
    path: "/bubblegum",
    // sidebar: () => <div>bubblegum!</div>,
    main: () => <CarList />
  },
  {
    path: "/shoelaces",
    // sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
];

function SidebarExample() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "10px",
            width: "40%",
            background: "#f0f0f0"
          }}
        >
          <StyledDrawer variant="permanent" className="drawer">
            <Toolbar />
            <List>
              {["Show my cars", "Car services"].map((text, index) => (
                <Link to={`${routes[index].path}`}>
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </StyledDrawer>

          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.sidebar}
            />
          ))}
        </div>

        <div>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>
      </div>
    </Router>
  );
}

export default SidebarExample;
