import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import classnames from "classnames";
import styled from "styled-components";

const classes = makeStyles();
export const Search = ({ className, onChange, onClick }) => (
  <Paper className={className}>
    <IconButton className={classes.iconButton} aria-label="Menu">
      <MenuIcon />
    </IconButton>
    <InputBase
      className={classes.input}
      placeholder="Find Owner"
      onChange={onChange}
    />
    <IconButton
      className={classnames(classes.iconButton, "icon-search")}
      aria-label="Search"
      onClick={onClick}
    >
      <SearchIcon />
    </IconButton>
    <IconButton
      color="primary"
      className={classes.iconButton}
      aria-label="Directions"
    />
  </Paper>
);

export const StyledSearch = styled(Search)`
  height: 50px;
  .icon-search {
    margin-left: 200px;
  }
`;
