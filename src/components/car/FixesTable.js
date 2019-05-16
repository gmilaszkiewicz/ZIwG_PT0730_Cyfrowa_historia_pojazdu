import React, {Component} from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import MUIDataTable from "mui-datatables";
import styled from 'styled-components'

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
      table: {
        minWidth: 700,
      },
      row: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.background.default,
        },
      },
});

  const columns = [
    {
     name: "fixCategoryName",
     label: "Category",
     options: {
    //   filter: true,
      sort: true,
     }
    },
    {
     name: "name",
     label: "Name",
     options: {
    //   filter: true,
      sort: true,
     }
    },
    {
     name: "course",
     label: "Course",
     options: {
    //   filter: true,
      sort: true,
     }
    },
    {
     name: "price",
     label: "Price",
     options: {
    //   filter: true,
      sort: true,
     }
    },
    {
        name: "fixDate",
        label: "Fix date",
        options: {
        //  filter: true,
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
        const data1 = Object.values(fixesObj).concat(Object.values(damagesObj))

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