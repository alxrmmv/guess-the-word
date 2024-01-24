import styled, { css } from "styled-components";

const justifications = {
  stretch: css`
    justify-self: stretch;
  `,
  center: css`
    justify-self: center;
    align-items: center;
  `,
};

const Form = styled.form`
  display: grid;
  gap: 2.4rem;
  padding: 1.2rem 2.4rem;
  max-width: 40rem;
  margin: 0 auto;
`;

const StyledFormRow = styled.div`
  font-size: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  ${(props) => justifications[props.$justify]}
`;

const Label = styled.label`
  color: var(--color-grey-100);
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-500);
`;

const Input = styled.input`
  font-family: inherit;
  font-size: 1.8rem;
  color: var(--color-grey-800);
  border: none;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  min-width: 0;

  &::placeholder {
    font-family: inherit;
    color: var(--color-grey-500);
  }
`;

function FormRowVertical({ label, error, children, justify }) {
  return (
    <StyledFormRow $justify={justify}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

Form.FormRowVertical = FormRowVertical;
Form.Input = Input;

export default Form;
