import React, { Component } from "react";
import { Dialog, Typography } from "@material-ui/core";
import { Tab, Tabs } from "@material-ui/core";
import OwnerForm from "./OwnerForm";
import CarServiceForm from "./CarServiceForm";
import { styled } from "@material-ui/styles";

const StyledTab = styled(Tab)`
  color: "white";
`;

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 24 }}>
      {props.children}
    </Typography>
  );
}

export default class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      numberOfTab: 0
    };
  }

  handleChange = (event, numberOfTab) => {
    this.setState({ numberOfTab });
  };

  render() {
    console.log(this.props);
    return (
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={this.props.isOpened}
        onClose={this.props.handleOnClose}
      >
        <Tabs
          value={this.state.numberOfTab}
          onChange={this.handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
        >
          <StyledTab label="Owner" />
          <StyledTab label="Car service" />
        </Tabs>
        {this.state.numberOfTab === 0 && (
          <TabContainer>
            <OwnerForm
              firebase={this.props.firebase}
              handleClose={this.props.handleOnClose}
            />
          </TabContainer>
        )}
        {this.state.numberOfTab === 1 && (
          <TabContainer>
            <CarServiceForm
              firebase={this.props.firebase}
              handleClose={this.props.handleOnClose}
            />
          </TabContainer>
        )}
      </Dialog>
    );
  }
}
