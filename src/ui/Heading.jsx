import styled, { css } from "styled-components";

// const test =  css`text-align:center`
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-weight: 700;
      /* background-color: yellow; */
      font-size: 25px;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-weight: 600;
      background-color: green;
      font-size: 20px;
      width: 50%;
      text-align: center;
    `}
${(props) =>
    props.as === "h3" &&
    css`
      font-weight: 500;

      font-size: 15px;
    `}
${(props) =>
    props.as === "h4" &&
    css`
      font-weight: 600;

      font-size: 3rem;
      text-align: center;
    `}
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 20px;

  line-height: 1.4;
`;

export default Heading;
