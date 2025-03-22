import React from "react";
import styled from "styled-components";
import { variables } from "../../assets/styles/variables";
import Header from "./Header/Header";

const Main = styled.main`
  width: 100%;
  position: relative;
  overflow-y: auto;
  top: 7rem; /* Match the header height */
  height: calc(100vh - 7rem);
  padding: 2rem 3rem 3.5rem 3rem;
  box-sizing: border-box;

  &::-webkit-scrollbar-track {
    background-color: ${variables.BLACK_COLOR};
  }

  &::-webkit-scrollbar {
    background-color: ${variables.GREY_COLOR_THREE};
    width: 0.8rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${variables.GREY_COLOR_THREE};
    border: 0.2rem solid ${variables.GREY_COLOR_THREE};
    border-radius: 1rem;
  }
`;

const Layout = ({ children }) => (
  <>
    <Header />
    <Main>{children}</Main>
  </>
);

export default Layout;

