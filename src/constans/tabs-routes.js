import { StyledCarList as CarList } from "../components/car/CarList";
import React from "react";
import CarInfoForm from "./../components/car/CarInfoForm";
import * as ROLES from "../constans/roles";
import ServicesMap from "./../components/services-map/ServicesMap";
import { StyledAddFixesService as AddFixesService } from "./../components/serviceFixes/AddFixesService";
import FixesHistoryTable from './../components/serviceFixes/FixesHistoryTable'
import MaterialIcon from 'material-icons-react';

export const routes = [
  {
    path: "#cars",
    exact: true,
    visible: true,
    icon: () => <MaterialIcon icon="directions_car" color={"white"} />,
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
    icon: () => <MaterialIcon icon="person_pin_circle" color={"white"} />,
    name: "Car services",
    access: ROLES.OWNER
  },
  {
    path: "#addfixes",
    visible: true,
    sidebar: () => <AddFixesService />,
    main: (authUser, index) => <AddFixesService authUser={authUser} />,
    icon: () => <MaterialIcon icon="note_add" color={"white"} />,
    name: "Add fixes",
    access: ROLES.CAR_SERVICE
  },
  {
    path: "#fixeshistory",
    visible: true,
    sidebar: () => <h2>Service</h2>,
    main: (authUser, index) => <FixesHistoryTable authUser={authUser} />,
    icon: () => <MaterialIcon icon="history" color={"white"} />,
    name: "Fixes History",
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
    main: (authUser, index) => <CarInfoForm user={authUser} />,
    name: "CarInfo",
    access: [ROLES.OWNER, ROLES.CAR_SERVICE]
  }
];
