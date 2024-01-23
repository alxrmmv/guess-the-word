import styled from "styled-components";
import Letter from "./Letter";

const StyledWord = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

function Word({ word }) {
  return (
    <StyledWord>
      {word.map((letter, index) => (
        <Letter $status={letter.status} key={`${index}-${letter.letter}`}>
          {letter.letter}
        </Letter>
      ))}
    </StyledWord>
  );
}

export default Word;
