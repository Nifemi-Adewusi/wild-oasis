/* eslint-disable no-unused-vars */
import styled from "styled-components";
import light from "../data/img/logo-light.png";
import dark from "../data/img/logo-dark.png";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src={light} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
