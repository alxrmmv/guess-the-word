import styled from "styled-components";

const ButtonIcon = styled.button`
  color: var(--color-grey-50);

  line-height: 1;
  background: none;
  border: none;

  display: inline-block;
  text-align: center;
  padding: 0.8rem;
  border-radius: var(--border-radius-sm);

  transition: all 0.2s;

  &:hover {
    background-color: var(--color-violet-600);
    cursor: pointer;
  }
`;

export default ButtonIcon;
