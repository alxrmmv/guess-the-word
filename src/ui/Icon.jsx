import styled from "styled-components";

const StyledIcon = styled.span`
  display: block;
  font-size: 2.4rem;
`;

function Icon({ children }) {
  return (
    <StyledIcon className="material-icons-outlined">{children}</StyledIcon>
  );
}

export default Icon;
