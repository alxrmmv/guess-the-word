import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { checkWordInDictionary, getWord } from "../../services/apiWords";
import { statsApi } from "../stats/statsSlice";
const MAX_MOVES = 6;
const WORD_LENGHT = 5;

export const fetchWord = createAsyncThunk(
  "game/fetchWord",
  async function (_, { getState }) {
    const { gameLanguage, wordLength } = getState().game;
    const word = await getWord(wordLength, gameLanguage);
    return word;
  }
);

export const makeMove = createAsyncThunk(
  "game/makeMove",
  async function (_, { getState }) {
    const { currentWord, gameLanguage, wordLength, hiddenWord } =
      getState().game;

    // if (gameStaus !== "playing") return true;

    if (currentWord.word.length < wordLength) return "";

    if (currentWord.status === "nonexistant") return "nonexistant";

    if (currentWord.word === hiddenWord) return "exists";

    const checkStatus = await checkWordInDictionary(
      currentWord.word,
      gameLanguage
    );
    return checkStatus ? "exists" : "nonexistant";
  }
);

const inintialState = {
  gameLanguage: "en",
  maxMoves: MAX_MOVES,
  wordLength: WORD_LENGHT,
  gameStatus: "new",
  gameResult: "",
  hiddenWord: { id: null, word: "" },
  guessedWords: [],
  currentWord: { word: "", status: "" },
  loggingStatus: "",
  error: "",
};

const gameSlice = createSlice({
  name: "game",
  initialState: inintialState,
  reducers: {
    startNewGame() {
      return inintialState;
    },

    addLetter(state, action) {
      if (state.gameStatus !== "playing") return;
      if (!action?.payload) return;
      if (state.currentWord.word.length === state.wordLength) return;
      state.currentWord.word += action.payload;
    },

    deleteLetter(state) {
      if (state.currentWord.word.length === 0) return;
      state.currentWord.word = state.currentWord.word.slice(0, -1);
      state.currentWord.status = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWord.pending, (state) => {
        state.gameStatus = "fetchingWord";
      })
      .addCase(fetchWord.fulfilled, (state, action) => {
        state.hiddenWord = action.payload;
        state.gameStatus = "playing";
      })
      .addCase(fetchWord.rejected, (state, action) => {
        state.gameStatus = "error";
        state.error = action.error.message;
      })
      .addCase(makeMove.pending, (state) => {
        state.currentWord.status = "checking";
      })
      .addCase(makeMove.fulfilled, (state, action) => {
        // state.gameStatus = "playing";
        state.currentWord.status = action.payload;

        if (action.payload === "exists") {
          state.guessedWords.push(state.currentWord.word);
          state.currentWord = { word: "", status: "" };
          if (state.hiddenWord.word === state.guessedWords.at(-1)) {
            state.gameResult = "won";
            state.gameStatus = "ended";
            return;
          }
          if (state.guessedWords.length === state.maxMoves) {
            state.gameResult = "lost";
            state.gameStatus = "ended";
            return;
          }
        }
      })
      .addCase(makeMove.rejected, (state, action) => {
        state.gameStatus = "error";
        state.error = action.error.message;
      })
      .addMatcher(statsApi.endpoints.recordGame.matchPending, (state) => {
        state.loggingStatus = "logging";
      })
      .addMatcher(statsApi.endpoints.recordGame.matchFulfilled, (state) => {
        state.loggingStatus = "logged";
      });
  },
});

const selectGuessedWords = (state) => state.game.guessedWords;
const selectHiddenWord = (state) => state.game.hiddenWord;
export const selectCurrentWord = (state) => state.game.currentWord;
const selectMaxMoves = (state) => state.game.maxMoves;
const selectWordLength = (state) => state.game.wordLength;

const selectGuessedWordsStatuses = createSelector(
  [selectGuessedWords, selectHiddenWord],
  (guessedWords, hiddenWord) => {
    //Calculating initial statuses of letters
    let guessedWordStatuses = guessedWords.map((word) => {
      return word.split("").map((letter, index) => {
        if (letter === hiddenWord.word.split("").at(index))
          return { letter, status: "correct" };
        if (!hiddenWord.word.split("").includes(letter))
          return { letter, status: "wrong" };

        return { letter, status: "exists" };
      });
    });

    //Cleaning up unwanted "exists"
    guessedWordStatuses = guessedWordStatuses.map((word) => {
      let newWord = [...word];

      for (let i = newWord.length - 1; i >= 0; i--) {
        const currentLetter = newWord.at(i);
        if (currentLetter.status != "exists") continue;

        //Number of given letters in the hidden word
        const hiddenLetterCount =
          hiddenWord.word.split(currentLetter.letter).length - 1;

        //Amount of geven letters in the checked word that are marked as "correct" or "exists"
        const letterCount = newWord.reduce(
          (acc, letter) =>
            letter.letter === currentLetter.letter && letter.status != "wrong"
              ? (acc += 1)
              : acc,
          0
        );

        if (letterCount > hiddenLetterCount)
          newWord[i] = { letter: currentLetter.letter, status: "wrong" };
      }

      return newWord;
    });

    return guessedWordStatuses;
  }
);

export const selectGameField = createSelector(
  [
    selectMaxMoves,
    selectWordLength,
    selectCurrentWord,
    selectGuessedWordsStatuses,
  ],
  (maxMoves, wordLength, currentWord, guessedWordStatuses) => {
    let gameField = [...guessedWordStatuses];

    //Modifying current word to array
    if (currentWord.word) {
      let currentWordArray = currentWord.word.split("").map((letter) => {
        return {
          letter,
          status: currentWord.status === "nonexistant" ? "error" : "",
        };
      });

      //Filling current word array up to wordLength
      if (currentWordArray.length < wordLength) {
        currentWordArray = currentWordArray.concat(
          new Array(wordLength - currentWordArray.length).fill({
            letter: "",
            status: "",
          })
        );
      }

      gameField = [...gameField, currentWordArray];
    }

    //Adding empty fields
    if (gameField.length < maxMoves) {
      gameField = gameField.concat(
        new Array(maxMoves - gameField.length).fill(
          new Array(wordLength).fill({ letter: "", status: "" })
        )
      );
    }

    return gameField;
  }
);

const selectLetter = (state, letter) => letter;

export const selectLetterStatus = createSelector(
  [selectGuessedWordsStatuses, selectLetter],
  (guessedWordStatuses, letter) => {
    const letterStatus = guessedWordStatuses.flat().reduce((sts, ltr) => {
      if (letter != ltr.letter) return sts;
      if (sts === "correct" || ltr.status === "correct") return "correct";
      if (ltr.status === "exists") return "exists";
      if (ltr.status === "wrong" && sts != "exists") return "wrong";
      return sts;
    }, "");

    return letterStatus;
  }
);

export const { startNewGame, addLetter, deleteLetter } = gameSlice.actions;

export default gameSlice.reducer;
