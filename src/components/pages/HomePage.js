import React, { Component } from "react";
import DrawerBar from "./../bars/DrawerBar";
import TopBar from "./../bars/TopBar";
import PermanentDrawerLeft from "../bars/PermanentDrawerLeft";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        {/* <TopBar /> */}
        {/* <div>asdsada</div>
        <DrawerBar /> */}
        <PermanentDrawerLeft />
      </div>
    );
  }
}
