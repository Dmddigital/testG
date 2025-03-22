import styled from "styled-components";
import { variables } from "../../assets/styles/variables";
import BgBattle from "../../assets/images/bg-battle.jpeg";

const Heading = styled.header`
  color: ${variables.WHITE_COLOR};
  font-size: 3rem;
  margin-top: 4rem;
`;

const Container = styled.div`
  display: flex;

  .battle-width{
    display: flex;
    padding-right: 4rem;
  }
`;

const CardWrapper = styled.div`
  position: relative;

  .box-wrapper {
    background-color: ${variables.BLACK_COLOR};
    box-shadow: 0 0.5rem 1rem 0 rgba(255, 255, 255, 0.06);
    color: ${variables.WHITE_COLOR};
    text-align: center;
    border-radius: 2rem;
    width: 34rem;
    padding: 2rem;
    height: 38rem;
    margin-top: ${(props) => (props.bottom ? "53rem" : "3rem")};

    .title {
      font-size: 2rem;
    }

    .sub-title {
      font-size: 1.25rem;
      margin-top: 1rem;
      font-weight: normal;
    }

    .details-wrapper {
      margin: 2rem 0 0;
      display: grid;
      grid-template-columns: 45% 1% 1fr;
      gap: 1.75rem;

      .leftside,
      .rightside {
        .name,
        .description {
          font-size: 1.5rem;
        }
        .description {
          color: ${variables.GREY_COLOR};
        }
      }

      .leftside {
        text-align: right;

        .name {
          text-transform: uppercase;
        }
      }

      .rightside {
        text-align: left;
      }

      .divider {
        border-right: solid 0.3rem ${variables.WHITE_COLOR};
        opacity: 0.14;
      }
    }

    .image-wrapper img {
      width: 100%;
      max-width: 60%;
      // height: 17rem;
      margin-top: 3rem;
    }

    .button-wrapper button {
      width: 25rem;
      height: 4.75rem;
      margin-top: 1rem;
      background-color: ${variables.GREY_COLOR_THREE};
      border-radius: 2rem;
      color: ${variables.GREY_COLOR};
      font-size: 1.75rem;
      text-transform: uppercase;
      border: 0;
      cursor: pointer;

      &:hover {
        background-color: ${variables.RED_COLOR};
        color: ${variables.WHITE_COLOR};
      }

      &:focus{
        outline: none;
      }
    }
  }
`;

const Main = styled.div`
  left: 0;
  width: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
  padding: 0 6rem 3.5rem 6rem;
  box-sizing: border-box;
  background: url(${BgBattle}) no-repeat center center fixed;
  background-size: cover;

  &::-webkit-scrollbar-track{
    background-color: ${variables.BLACK_COLOR};
  }

  &::-webkit-scrollbar{
    background-color: ${variables.GREY_COLOR_THREE};
    height: 1rem;
  }

  &::-webkit-scrollbar-thumb{
    background-color: ${variables.GREY_COLOR_THREE};
    border: 0.2rem solid ${variables.GREY_COLOR_THREE};
    border-radius: 1rem;
  }
`;

const Divider = styled.div`
  position: absolute;
  top: 47%;
  bottom: 50%;
  width: 100%;
  right: 0.5rem;
  height: 0;

  hr {
    background-color: ${variables.GREY_COLOR_THREE};
    height: 0.6rem;
    border: 0;
  }

  .circle {
    background-color: ${variables.RED_COLOR};
    border-radius: 50%;
    position: relative;
    left: 50%;
    right: 50%;
    width: 4rem;
    height: 4rem;
    top: 2rem;

    img {
      margin-top: 1rem;
    }
  }
`;

export { Heading, Container, CardWrapper, Main, Divider };
