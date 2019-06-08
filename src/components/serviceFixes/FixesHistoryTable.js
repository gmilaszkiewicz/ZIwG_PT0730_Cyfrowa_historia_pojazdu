import React, {Component} from 'react'
import MUIDataTable from "mui-datatables";
import styled from 'styled-components'
import { withFirebase } from "../../config/firebase/context";

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

    constructor(){
        super()
        this.state = {
            tableData: []
        }
    }

    prepareDateFixesHistory = (hashedData) => {
        let finalFixes = []
        const fixes =  (hashedData)?Object.values(hashedData):undefined
        fixes && 
        fixes.map(fix => (
            fix && (Object.values(fix)).length>0 && finalFixes.push(...Object.values(fix))
        ))
        return finalFixes
    }

    componentDidMount() {
        this.props.firebase
          .serviceCreatedFixes(this.props.authUser.uid)
          .on("value", snapshot => {
              if(snapshot.val()){
                let fixesData = this.prepareDateFixesHistory(snapshot.val())
                this.setState({
                    tableData: fixesData
                })
              }
          });
      }

      componentWillUnmount() {
        this.props.firebase.serviceCreatedFixes().off();
      }

    render(){
        return(
        <StyledMUIDataTable
            title={"Created fixes"}
            data={this.state.tableData}
            columns={columns}
            options={options}
        />
    )
    }
}

export default withFirebase(FixesHistoryTable);


