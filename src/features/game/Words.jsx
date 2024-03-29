import { useSelector } from "react-redux";
import styled from "styled-components";

import Word from "./Word";
import { selectGameField } from "./gameSlice";

const WordsContainer = styled.div`
  container-type: size;
  container-name: words-resize-box;
  display: grid;

  overflow: hidden;
`;

const StyledWords = styled.div`
  //Resizing with aspent rario
  width: min(100%, 50rem);
  aspect-ratio: 5/6;
  object-fit: contain;
  overflow: auto;
  margin: auto;

  display: flex;
  min-width: 28rem;

  @container words-resize-box (aspect-ratio > 5/6) {
    width: auto;
    height: min(100%, 60rem);
  }

  display: grid;

  align-content: start;

  gap: 0.8rem;
  padding: 0.4rem 0.8rem;
`;

function Words() {
  const gameField = useSelector((state) => selectGameField(state));

  return (
    <WordsContainer>
      <StyledWords>
        {gameField.map((word, index) => (
          <Word key={index} word={word} />
        ))}
      </StyledWords>
    </WordsContainer>
  );
}

export default Words;
