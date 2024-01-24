import styled from "styled-components";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.2rem;

  @media screen and (min-aspect-ratio: 10/16) {
    padding-left: 3.6rem;
    padding-right: 3.6rem;
  }

  @media (min-height: 800px) {
    padding-top: 3.6rem;
    padding-bottom: 3.6rem;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Logo />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
