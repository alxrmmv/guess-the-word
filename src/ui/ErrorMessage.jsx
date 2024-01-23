import styled from "styled-components";

const StyledErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 2.4rem;

  /* background-color: var(--color-violet-600);
  border-radius: var(--border-radius-xlg);
  border: 1px solid var(--color-grey-700); */
`;

function ErrorMessage({ children }) {
  return <StyledErrorMessage>{children}</StyledErrorMessage>;
}

export default ErrorMessage;
