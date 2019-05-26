import { StyledCarList as CarList } from "../components/car/CarList";
import React from "react";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import CarInfoForm from './../components/car/CarInfoForm'
import * as ROLES from '../constans/roles';
import ServicesMap from './../components/services-map/ServicesMap'

export const routes = [
  {
    path: "#cars",
    exact: true,
    visible: true,
    icon: () => <InboxIcon />,
    sidebar: () => <CarList />,
    main: (authUser, index) => <CarList key={index} authUser={authUser} />,
    name: "Show my cars",
    access: ROLES.OWNER
  },
  {
    path: "#service",
    visible: true,
    sidebar: () => <h2>services</h2>,
    main: () => <ServicesMap />,
    icon: () => <InboxIcon />,
    name: "Car services",
    access: ROLES.OWNER
  },
  {
    path: "#fixeshistory",
    visible: true,
    sidebar: () => <h2>Service</h2>,
    main: () => <h2>Fixes history</h2>,
    icon: () => <InboxIcon />,
    name: "Fixes history",
    access: ROLES.CAR_SERVICE
  },
  {
    path: "#addfixes",
    visible: true,
    sidebar: () => <h2>Service</h2>,
    main: () => <h2>Add fixes</h2>,
    icon: () => <InboxIcon />,
    name: "Add fixes",
    access: ROLES.CAR_SERVICE
  },
  {
    path: "#profile",
    visible: false,
    sidebar: () => <h2>Profile</h2>,
    main: () => <h2>Profile</h2>,
    name: "Profile",
    access: [ROLES.OWNER, ROLES.CAR_SERVICE]
  },
  {
    path: "#carInfo",
    visible: false,
    sidebar: () => <h2>CarInfo</h2>,
    main: (authUser, index) => <CarInfoForm />,
    name: "CarInfo",
    access: [ROLES.OWNER,ROLES.CAR_SERVICE]
  }
];
