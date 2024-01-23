import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  padding: 0 0.8rem;
`;

const Img = styled.img`
  display: block;
  height: 2.4rem;
  width: auto;
`;

function Logo() {
  // const { isDarkMode } = useDarkMode();
  return (
    <StyledLogo>
      <Img src="/logo.svg" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
