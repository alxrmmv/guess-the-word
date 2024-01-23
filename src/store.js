import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./features/game/gameSlice";
import { authApi } from "./features/authentication/authSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
