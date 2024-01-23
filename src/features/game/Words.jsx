import styled from "styled-components";
import Word from "./Word";
import { selectGameField } from "./gameSlice";

import { useSelector } from "react-redux";
// import { fetchWord } from "./gameSlice";
// import { useEffect } from "react";
// import Spinner from "../../ui/Spinner";

const WordsContainer = styled.div`
  container-type: size;
  container-name: words-resize-box;
  display: grid;

  overflow: hidden;
`;

const StyledWords = styled.div`
  //Resizing with aspent rario
  width: 100%;
  aspect-ratio: 5/6;
  object-fit: contain;
  overflow: auto;
  margin: auto;

  display: flex;
  min-width: 28rem;

  @container words-resize-box (aspect-ratio > 5/6) {
    width: auto;
    height: 100%;
  }

  display: grid;

  align-content: start;

  gap: 0.8rem;
  padding: 1.2rem;

  /* background-color: var(--color-grey-300); */
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
