import { StyledCarList as CarList } from "./../car/CarList";
import React from "react";
export const routes = [
  {
    path: "/cars",
    exact: true,
    sidebar: () => <CarList />,
    main: () => <div />,
    name: "Show my cars"
  },
  {
    path: "/service",
    sidebar: () => <h2>Service</h2>,
    main: () => <h2>Bubblegum</h2>,
    name: "Car services"
  }
];
