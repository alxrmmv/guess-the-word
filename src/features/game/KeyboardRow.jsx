import styled from "styled-components";
import KeyboardLetterKey from "./KeyboardLetterKey";
import KeyboardControlKey from "./KeyboardControlKey";

const StyledKeyboardRow = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  @media screen and (min-width: 700px) and (min-height: 1200px) {
    gap: 0.8rem;
  }
`;

function KeyboardRow({ keys }) {
  return (
    <StyledKeyboardRow>
      {keys.map(
        (key) =>
          key === "enter" || key == "backspace" ? (
            <KeyboardControlKey keyboardKey={key} key={key} />
          ) : (
            //
            <KeyboardLetterKey keyboardKey={key.toLowerCase()} key={key} />
          )
        // <KeyboardLetterKey keyboardKey={key.toLowerCase()} key={key} />
      )}
    </StyledKeyboardRow>
  );
}

export default KeyboardRow;
