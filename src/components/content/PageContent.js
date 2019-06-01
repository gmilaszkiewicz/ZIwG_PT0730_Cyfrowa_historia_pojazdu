import React, { Component } from "react";
import { routes } from "../../constans/tabs-routes";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    position: "relative",
    overflowY: "auto",
    backgroundColor: "#323232",
    backgroundImage: `url("http://www.kinyu-z.net/data/wallpapers/180/1334867.jpg")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  toolbar: theme.mixins.toolbar
});

const mapStateToProps = state => {
  return {
    chosenTab: state.chosenTab,
    snackBarStatus: state.snackBarStatus
  };
};

class PageContent extends Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {routes.map(
          (route, index) =>
            this.props.chosenTab === index &&
            route.main(this.props.authUser, index)
        )}
      </main>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(PageContent));
