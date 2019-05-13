import React, {Component} from 'react'
import { routes } from "../../constans/tabs-routes";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
    root: {
      display: "flex",
      flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        // backgroundImage: "url(https://wallpapercave.com/wp/WR4WVIP.jpg)",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
    },
    toolbar: theme.mixins.toolbar,
})

class PageContent extends Component{

    render(){
        const { classes } = this.props;

        return(
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {routes.map((route, index) => (
                (this.props.choosenTab === index) && route.main(this.props.authUser, index)
                ))}
          </main>
        )
    }
}

export default withStyles(styles)(PageContent)