import { StyledCarList as CarList } from "../components/car/CarList";
import React from "react";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import {StyledNewCarForm as  NewCarForm } from "./../components/car/NewCarForm";


export const routes = [
  {
    path: "#cars",
    exact: true,
    visible: true,
    icon: () => <InboxIcon />,
    sidebar: () => <CarList />,
    main: (authUser, index) => <CarList key={index} authUser={authUser} />,
    name: "Show my cars"
  },
  {
    path: "#addcar",
    visible: true,
    icon: () => <InboxIcon />,
    sidebar: () => <NewCarForm />,
    main: (authUser, index) => <NewCarForm key={index} authUser={authUser} />,
    name: "Add car"
  },
  {
    path: "#service",
    visible: true,
    sidebar: () => <h2>services</h2>,
    main: () => <h2>Car sevices</h2>,
    icon: () => <InboxIcon />,
    name: "Car services"
  },
  {
    path: "#fixeshistory",
    visible: true,
    sidebar: () => <h2>Service</h2>,
    main: () => <h2>Fixes history</h2>,
    icon: () => <InboxIcon />,
    name: "Fixes history"
  },
  {
    path: "#addfixes",
    visible: true,
    sidebar: () => <h2>Service</h2>,
    main: () => <h2>Add fixes</h2>,
    icon: () => <InboxIcon />,
    name: "Add fixes"
  },
  {
    path: "#profile",
    visible: false,
    sidebar: () => <h2>Profile</h2>,
    main: () => <h2>Profile</h2>,
    name: "Profile"
  }
];
