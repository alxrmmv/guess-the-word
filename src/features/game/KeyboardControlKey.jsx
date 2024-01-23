import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

import Icon from "../../ui/Icon";

const keyboardKeys = {
  enter: css`
    color: var(--color-grey-900);
    background-color: var(--color-main-500);

    &:hover {
      background-color: var(--color-main-600);
    }
  `,

  backspace: css`
    color: var(--color-grey-50);
    background-color: var(--color-grey-500);

    &:hover {
      background-color: var(--color-grey-600);
    }
  `,
};

const StyledKeyboardСontrolKey = styled.button`
  height: 70%;
  width: auto;
  aspect-ratio: 1/1;
  font-size: 1.6rem;
  border-radius: var(--border-radius-md);

  border: 1px solid var(--color-grey-500);
  cursor: pointer;

  @media (min-width: 700px) {
    font-size: 2rem;
  }

  display: flex;
  align-items: center;
  justify-content: center;

  line-height: 1;

  cursor: pointer;

  &:disabled {
    background-color: var(--color-grey-300);
    color: var(--color-grey-500);
    cursor: default;

    &:hover {
      background-color: var(--color-grey-300);
      color: var(--color-grey-500);
    }
  }

  border: none;
  border-radius: var(--border-radius-sm);

  transition: all 0.2s;

  ${(props) => keyboardKeys[props.$keyboardKey]}
`;

StyledKeyboardСontrolKey.defaultProps = {
  type: "secondary",
};

function KeyboardControlKey({ keyboardKey }) {
  const currentWord = useSelector((state) => state.game.currentWord?.word);
  const wordLength = useSelector((state) => state.game?.wordLength);
  let disabled = false;
  if (keyboardKey === "enter" && currentWord?.length < wordLength)
    disabled = true;
  if (keyboardKey === "backspace" && currentWord?.length === 0) disabled = true;

  return (
    <StyledKeyboardСontrolKey
      disabled={disabled}
      $keyboardKey={keyboardKey}
      data-key={keyboardKey}
    >
      <Icon>{keyboardKey === "enter" ? "check" : "backspace"}</Icon>
    </StyledKeyboardСontrolKey>
  );
}

export default KeyboardControlKey;
