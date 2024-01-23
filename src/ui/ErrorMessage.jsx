import styled from "styled-components";

const StyledErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 2.4rem;
`;

function ErrorMessage({ children }) {
  return <StyledErrorMessage>{children}</StyledErrorMessage>;
}

export default ErrorMessage;
