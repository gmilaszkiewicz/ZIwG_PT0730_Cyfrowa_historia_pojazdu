import React, {Component} from 'react'
import MUIDataTable from "mui-datatables";
import styled from 'styled-components'

const columns = [
    {
     name: "userEmail",
     label: "Client",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "category",
     label: "Category",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "carBrand",
     label: "Brand",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "productionYear",
     label: "Production Year",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
        name: "price",
        label: "Price",
        options: {
         filter: true,
         sort: false,
        }
    },
    {
        name: "description",
        label: "Description",
        options: {
         filter: true,
         sort: false,
        }
    },
    {
        name: "fixedDate",
        label: "Date",
        options: {
         filter: true,
         sort: false,
        }
    },
   ];
   
   const options = {
     filterType: 'none',
   };

   const StyledMUIDataTable = styled(MUIDataTable)`
   background-color: "white";
   .ToolbarSelect-root{
       background-color: "black";
   }
`;

class FixesHistoryTable extends Component{

    render(){
        const fixes = (this.props.authUser.createdFixes)?Object.values(this.props.authUser.createdFixes):undefined
        return(
            <StyledMUIDataTable
                title={"Created fixes"}
                data={fixes}
                columns={columns}
                options={options}
            />
        )
    }
}

export default FixesHistoryTable;


