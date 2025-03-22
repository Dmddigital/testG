import styled from "styled-components";
import { variables } from "../../../assets/styles/variables";

const ImgWrapper = styled.div`
  img {
    margin: 4rem 0;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;

  img {
    margin-right: 1.5rem;
    height: 2.75rem;
    width: 3rem;
  }

  h2 {
    font-size: 2rem;
  }
`;

const DetailsWrapper = styled.div`
  margin: 3rem 0 0 9rem;
  .col {
    display: grid;
    grid-template-columns: 30% 0.05rem 1fr;
    gap: 2.5rem;
    margin-bottom: 1.5rem;

    div {
      font-size: 2rem;
    }

    .label,
    .value {
      text-align: left;
    }
  }
`;

const ButtonWrapper = styled.div`
  margin: 3rem 0 2rem;
  button {
    background-color: ${(props) =>
      props.status === "WON" ? variables.BLUE_COLOR : variables.RED_COLOR};
    color: ${variables.WHITE_COLOR};
    padding: 1.5rem;
    font-size: 1.75rem;
    cursor: pointer;
    width: 100%;
    border: 0;
  }
`;

export { ImgWrapper, TitleWrapper, DetailsWrapper, ButtonWrapper };
