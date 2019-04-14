import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Grow
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";

const StyledAppBar = styled(AppBar)`
  position: absolute;
  flex-grow: 1;

`;

const StyledMenuButton = styled(IconButton)`
  margin-left: -12px;
  margin-right: 20px;
`;

const StyledTitle = styled(Typography)`
  display: "sm";
`;
const StyledDiv = styled.div`
  flex-grow: 1;
`;



class TopBar extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null
    };
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const isMenuOpen = Boolean(this.state.anchorEl);
    const { classes } = this.props;

    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    return (
      <div>
        <StyledAppBar variant="dark">
          <Toolbar>
            <StyledMenuButton color="inherit" aria-label="Home">
              <HomeIcon />
            </StyledMenuButton>
            <StyledTitle variant="h6" color="inherit" noWrap>
              Our title
            </StyledTitle>
            <StyledDiv />
            <IconButton
              aria-owns={isMenuOpen ? "material-appbar" : undefined}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </StyledAppBar>
        {renderMenu}
      </div>
    );
  }
}

export default TopBar;
