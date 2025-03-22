import styled from "styled-components";
import { variables } from "../../assets/styles/variables";

const CharacterItemDiv = styled.div`
  .slider-info {
    border-radius: 1rem;
    border: solid 1px #363636;
    background-color: #100e0e;
    cursor: pointer;
    position: relative;
    height: 40rem;
    width: calc(100% - 1rem);

    &:hover {
      .slider-info__details {
        height: 27rem;
      }
    }

    &__action{
      position: absolute;
      left: 0.5rem;
      top: 1rem;

      li{
        a{
          cursor: pointer;
        }
      }
    }

    &__character {
      height: 23rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 3rem;

      img {
        width: 15rem;
      }
    }

    &__details {
      background: #1f1d1d;
      padding: 2rem 3rem;
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      height: 13rem;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      transition: 0.2s all ease-in;
    }

    div > div {
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    span {
      color: ${variables.WHITE_COLOR};
      display: inline-flex;
      width: 12rem;
      font-size: 1.8rem;

      img {
        margin-right: 0.5rem;
      }
    }
  }
`;

export { CharacterItemDiv };
