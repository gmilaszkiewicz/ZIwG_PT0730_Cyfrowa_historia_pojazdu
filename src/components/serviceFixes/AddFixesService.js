import React, { Component } from "react";
import styled from "styled-components";
import { Form, Formik } from "formik";
import { StyledSearch as Search } from "./Search";

export class AddFixesService extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <div className="top">
          <div className="search-bar ">
            <Search />
          </div>
        </div>
      </div>
    );
  }
}

export const StyledAddFixesService = styled(AddFixesService)`
  .top {
    display: flex;
    justify-content: center;
    .search-bar {
      width: 500px;
    }
  }
`;
