import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import { fetchWord, startNewGame } from "./gameSlice";
import { useGetCurrentUserQuery } from "../authentication/authSlice";

const StyledGameResult = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;

  border-top-left-radius: var(--border-radius-xlg);
  border-top-right-radius: var(--border-radius-xlg);
  background-color: var(--color-violet-700);
  border: 1px solid var(--color-grey-700);
  border-bottom: none;
  padding: 1.2rem;

  overflow: auto;
`;

const HiddenWord = styled.span`
  font-size: 2rem;
  color: var(--color-main-500);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 2px;
`;

const ResultTitle = styled.h2`
  font-size: 2rem;
  font-weight: 500;
`;
const ResultText = styled.p`
  color: var(--color-grey-200);
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-top: 1.2rem;
`;

function GameResult() {
  const dispatch = useDispatch();
  const {
    gameResult,
    hiddenWord: { word },
  } = useSelector((state) => state.game);

  const { data: user } = useGetCurrentUserQuery();
  const isAuthenticated = user != null && user?.role === "authenticated";

  function handleNewGame() {
    dispatch(startNewGame());
    dispatch(fetchWord());
  }

  return (
    <StyledGameResult>
      {gameResult === "lost" && (
        <>
          <ResultTitle>
            {" "}
            {"😢 Solution: "}
            <HiddenWord>{word}</HiddenWord>
          </ResultTitle>
          <ResultText>Do you want to try another one?</ResultText>
        </>
      )}
      {gameResult === "won" && (
        <>
          <ResultTitle>🥳 Awsome!</ResultTitle>
          {isAuthenticated ? (
            <ResultText>
              Check out your
              <LinkButton to="/stats"> stats </LinkButton>
              or try:
            </ResultText>
          ) : (
            <ResultText>
              <LinkButton to="/login">Login </LinkButton>
              to keep track of your stats or try:
            </ResultText>
          )}
        </>
      )}
      <ButtonContainer>
        <Button size="medium" onClick={handleNewGame}>
          New word
        </Button>
      </ButtonContainer>
    </StyledGameResult>
  );
}

export default GameResult;
