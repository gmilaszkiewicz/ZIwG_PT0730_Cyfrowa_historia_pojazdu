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

    render(){
        const { classes } = this.props;
        const fixesObj = this.props.car.fixes
        const damagesObj = this.props.car.damages
        const data1 = (fixesObj !== undefined && damagesObj !== undefined)? Object.values(fixesObj).concat(Object.values(damagesObj)):undefined

        return(
            <Paper className={classes.root}>
                <StyledMUIDataTable
                    title={"Car modification:"}
                    data={data1}
                    columns={columns}
                    options={options}
                />
            </Paper>
        )
    }
}

export default withStyles(styles)(FixesTable)