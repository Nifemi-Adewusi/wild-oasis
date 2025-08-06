import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 20px;
    `}
    ${(props)=> props.type === "vertical" && css`
        flex-direction: column;
    `}
`;
export default Row