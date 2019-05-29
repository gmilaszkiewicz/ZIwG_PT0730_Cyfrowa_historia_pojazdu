import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import classnames from "classnames";
import styled from "styled-components";

const useStyles = makeStyles({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    marginLeft: 8,
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
});
const classes = makeStyles();
export const Search = ({ className }) => (
  <Paper className={className}>
    {console.log(className)}
    <IconButton className={classes.iconButton} aria-label="Menu">
      <MenuIcon />
    </IconButton>
    <InputBase className={classes.input} placeholder="Find Owner" />
    <IconButton
      className={classnames(classes.iconButton, "icon-search")}
      aria-label="Search"
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
