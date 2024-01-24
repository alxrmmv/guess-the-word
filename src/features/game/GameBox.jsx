import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { useGetCurrentUserQuery } from "../authentication/authSlice";
import { useRecordGameMutation } from "../stats/statsSlice";
import Words from "./Words";
import Keyboard from "./Keybard";
import GameResult from "./GameResult";
import { fetchWord } from "./gameSlice";
import Spinner from "../../ui/Spinner";

const StyledGameBox = styled.div`
  display: grid;
  grid-template-rows: 1fr max(30%, 13.5rem);

  @media screen and (min-width: 400px) and (min-height: 600px) {
    grid-template-rows: 1fr min(26%, 20rem);
  }

  gap: 0.8rem;
  height: 100%;
`;

function GameBox() {
  const { gameStatus, loggingStatus } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const { data: user } = useGetCurrentUserQuery();
  const isAuthenticated = user != null && user?.role === "authenticated";
  const [recordGame] = useRecordGameMutation();

  useEffect(
    function () {
      if (gameStatus === "new") {
        dispatch(fetchWord());
      }

      if (gameStatus === "ended" && loggingStatus === "" && isAuthenticated) {
        recordGame(user.id);
      }
    },
    [gameStatus, recordGame, dispatch, user, loggingStatus, isAuthenticated]
  );

  return (
    <StyledGameBox>
      {gameStatus === "fetchingWord" && <Spinner />}
      {gameStatus != "fetchingWord" && <Words />}
      {gameStatus === "playing" && <Keyboard />}
      {gameStatus == "ended" && <GameResult />}
    </StyledGameBox>
  );
}

export default GameBox;
