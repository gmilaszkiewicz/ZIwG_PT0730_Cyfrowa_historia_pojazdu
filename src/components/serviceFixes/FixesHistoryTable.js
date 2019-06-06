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
      sort: true,
     }
    },
    {
     name: "carBrand",
     label: "Brand",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "productionYear",
     label: "Production Year",
     options: {
      filter: true,
      sort: true,
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
         sort: true,
        }
    },
   ];
   
   const options = {
    filterType: 'dropdown',
    viewColumns: true,
    filter: false,
    responsive: "scroll"
  };

   const StyledMUIDataTable = styled(MUIDataTable)`
   background-color: "white";
   color:"white";
   .ToolbarSelect-root{
       background-color: "black";
   }
   .MuiToolbar-root{
       color:white;
   }
   .MuiPaper-elevation1{
       background-color:black;
       color:white;
   }
`;

class FixesHistoryTable extends Component{

    prepareDateFixesHistory = () => {
        let finalFixes = []
        const fixes =  (this.props.authUser.createdFixes)?Object.values(this.props.authUser.createdFixes):undefined
        fixes.map(fix => (
            fix && (Object.values(fix)).length>0 && finalFixes.push(...Object.values(fix))
        ))
        return finalFixes
    }

    render(){
        const data = this.prepareDateFixesHistory();
        return(
        <StyledMUIDataTable
            title={"Created fixes"}
            data={data}
            columns={columns}
            options={options}
        />
    )
    }
}

export default FixesHistoryTable;


