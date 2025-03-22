import { variables } from "../../assets/styles/variables";
import styled from "styled-components";
import prevIcon from "../../assets/images/back.png";
import nextIcon from "../../assets/images/next.png";
import BgPatternLarge1 from "./../../assets/images/bg-pattern-l-1.jpeg";
import BgPatternLarge2 from "./../../assets/images/bg-pattern-l-2.jpeg";

const Heading = styled.main`
  color: ${variables.WHITE_COLOR};
  font-size: 3rem;
  margin-top: 4rem;
`;

const UserStatus = styled.div`
  span {
    background-color: ${variables.GREEN_COLOR};
    display: inline-block;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    margin-right: 0.6rem;
  }

  small {
    color: ${variables.GREY_COLOR_ONE};
    font-size: 1.6rem;
  }
`;

const Banner = styled.div`
  background: url(${(props) => (props.bgImg)});
  background-size: cover;
  position: relative;
  margin-top: 4rem;
  height: calc(100vh - 18rem);
  overflow: hidden;
  border-radius: 1rem;

  img {
    max-width: 100%;
    min-width: 100%;
  }

  .power {
    color: ${variables.WHITE_COLOR};
    display: flex;
    align-items: flex-end;
    margin-bottom: 1.3rem;

    small,
    span {
      font-size: 2rem;
    }

    small {
      color: ${variables.GREY_COLOR};
    }
  }

  ul {
    position: absolute;
    display: flex;
    justify-content: space-between;
    left: 0;
    bottom: 7rem;
    width: 100%;

    li {
      display: flex;
      justify-content: center;
      width: 25%;

      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        justify-content: center;
        padding: 1rem;
        min-width: 8rem;
        transition: 0.2s all ease-in;
        border: 2px solid transparent;

        img {
          min-width: auto;
          width: 5rem;
          margin-bottom: 1.8rem;
        }

        span {
          color: ${variables.WHITE_COLOR};
          font-size: 2rem;
        }
      }
    }
  }
`;

const DropArrow = styled.div`
  position: absolute;
  text-align: center;
  bottom: 1rem;
  width: 100%;

  a {
    cursor: pointer;

    img {
      width: 6rem;
      min-width: auto;
      max-width: auto;
    }
  }
`;

const HeaderDetails = styled.div`
  position: fixed;
  top: 4rem;
  left: 60rem;

  .nft-details {
    background-color: ${variables.GREY_COLOR_TWO};
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: top;
    margin-right: 2rem;
    height: 5.2rem;
    min-width: 24rem;
    padding: 1.6rem 2rem;

    span {
      color: ${variables.WHITE_COLOR};
      font-size: 1.4rem;
      margin-right: 1.7rem;
      display: inline-block;
    }

    small {
      background-color: ${variables.RED_COLOR};
      color: ${variables.WHITE_COLOR};
      display: inline-block;
      font-size: 1.4rem;
      padding: 0.7rem 1rem;
      line-height: 2rem;
      border: 1px solid transparent;

      &.border-text {
        border-color: ${variables.RED_COLOR};
        background: none !important;
      }
    }
  }
`;

const ChooseBackground = styled.div`
  position: fixed;
  right: 26rem;
  top: 4.2rem;

  ul {
    li {
      display: inline-block;
      margin-left: 1rem;

      a {
        border: 1px solid transparent;
        display: inline-block;
        cursor: pointer;
        border-radius: 1rem;

        img {
          vertical-align: middle;
          width: 3.5rem;
        }

        &.active {
          border-color: ${variables.GREY_COLOR_ONE};
        }
      }
    }
  }
`;

const CharacterInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 23rem;
  left: 0;
  z-index: 1;
  width: 100%;

  div {
    text-align: center;
    width: 25%;

    img {
      width: 75%;
    }
  }
`;

const SliderDiv = styled.div`
  .slick-slider{
    position: absolute;
    bottom: 6rem;
    left: 6rem;
    width: calc(100% - 14rem);
    z-index: 5;
    padding: 1rem;
    display: flex;
  }

  .slick-slide{
    img{
      display: inline-block;
    }
  }

  .slick-arrow.slick-prev{
    background: url(${prevIcon});
    left: -35px;
  }

  .slick-arrow.slick-next{
    background: url(${nextIcon});
    right: -35px;
  }

  .slick-arrow.slick-prev, .slick-arrow.slick-next{
    height: 4rem;
    width: 4rem;
    background-size: 4rem;
    background-repeat: no-repeat;

    &:before{
      display: none;
    }
  }

  .close-slider{
    color: ${variables.WHITE_COLOR};
    position: absolute;
    cursor: pointer;
    z-index:99;
    right: 10rem;
    bottom: 48rem;
    font-size: 1.6rem;

    &:hover{
      text-decoration: underline;
    }
  }
`;

export {Heading, UserStatus, Banner, DropArrow, HeaderDetails, ChooseBackground, CharacterInfo, SliderDiv}; 