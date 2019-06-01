import React, {Component} from "react"
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MUIDataTable from "mui-datatables";
import styled from 'styled-components'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
      },

});

  const columns = [
    {
     name: "fixCategoryName",
     label: "Category",
     options: {
      sort: true,
     }
    },
    {
     name: "name",
     label: "Name",
     options: {
      sort: true,
     }
    },
    {
     name: "course",
     label: "Course",
     options: {
      sort: true,
     }
    },
    {
     name: "price",
     label: "Price",
     options: {
      sort: true,
     }
    },
    {
        name: "dateTime",
        label: "Fix date",
        options: {
         sort: true,
        }
       },
   ];
   
   const options = {
     filterType: 'dropdown',
     viewColumns: false,
     filter: false,
     responsive: "scroll"
   };
   

const StyledMUIDataTable = styled(MUIDataTable)`
    background-color: "white";
    .ToolbarSelect-root{
        background-color: "black";
    }
`

class FixesTable extends Component{ 

prepareFixesAndDamages(){
    const fixes = (this.props.car.fixes)?Object.values(this.props.car.fixes):undefined
    const damages = (this.props.car.damages)?Object.values(this.props.car.damages):undefined
    if(fixes !== undefined && damages !== undefined){
        return fixes.concat(damages)
    }
    else if(fixes !== undefined){
        return fixes
    }
    else if(damages !== undefined){
        return damages
    }
    return []
}

render(){
    const { classes } = this.props;
    const data = this.prepareFixesAndDamages();

    return(
        <Paper id="carInfoTable" className={classes.root}>
            <StyledMUIDataTable
                title={"Car modification:"}
                data={data}
                columns={columns}
                options={options}
            />
        </Paper>
    )
}
}

export default withStyles(styles)(FixesTable)