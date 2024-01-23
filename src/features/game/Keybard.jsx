import styled from "styled-components";
import KeyboardRow from "./KeyboardRow";

import { useDispatch } from "react-redux";
import { addLetter, makeMove, deleteLetter } from "./gameSlice";
import { useEffect } from "react";

const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
];
const KeyboardContainer = styled.div`
  container-type: size;
  container-name: keyboard-resize-box;
  display: grid;
  /* resize: both; */
  overflow: hidden;
`;

const StyledKeyboard = styled.div`
  //Resizing with aspent rario
  width: 100%;
  aspect-ratio: 2/1;
  object-fit: contain;
  overflow: auto;
  margin: auto;

  @container keyboard-resize-box (aspect-ratio > 2/1) {
    width: auto;
    height: 100%;
  }
  display: grid;
  grid-template-rows: repeat(3, 1fr);

  padding: 0.8rem;
`;

function Keybard() {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleKeyDown(e) {
      const keyPressed = e.key.toLowerCase();

      if (!keyboard.flat().includes(keyPressed)) return;

      if (keyPressed === "enter") {
        dispatch(makeMove());
      } else if (keyPressed === "backspace") {
        dispatch(deleteLetter());
      } else dispatch(addLetter(keyPressed));
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  function handleClick(e) {
    const button = e.target.closest("button");
    if (!button) return;

    if (button.dataset.key === "enter") {
      dispatch(makeMove());
    } else if (button.dataset.key === "backspace") {
      dispatch(deleteLetter());
    } else dispatch(addLetter(button.dataset.key));
  }

  return (
    <KeyboardContainer>
      <StyledKeyboard onClick={handleClick}>
        {keyboard.map((row, index) => (
          <KeyboardRow keys={row} key={index} />
        ))}
      </StyledKeyboard>
    </KeyboardContainer>
  );
}

export default Keybard;
