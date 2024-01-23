import supabase from "../../services/supabase";
import { supabaseApi } from "../../services/apiSupabase";

export const statsApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    recordGame: builder.mutation({
      queryFn: async (userId, { getState }) => {
        const { data, error } = await supabase
          .from("games")
          .upsert([
            {
              user_id: userId,
              word: getState().game.hiddenWord.id,
              result: getState().game.gameResult,
              gameLanguage: getState().game.gameLanguage,
              movesNumber: getState().game.guessedWords.length,
            },
          ])
          .select();

        if (error) return { error };

        return { data };
      },
      invalidatesTags: ["Stats"],
    }),

    getStats: builder.query({
      queryFn: async () => {
        const { data: games, error } = await supabase
          .from("games")
          .select("*")
          .order("id", { ascending: true });

        if (error) return { error };

        const gamesNumber = games.length;

        const successRate =
          games.length > 0
            ? games.filter((game) => game.result === "won").length /
              games.length
            : 0;

        const avgMoves = games
          .filter((game) => game.result === "won")
          .reduce(
            (acc, game, _, arr) => acc + game.movesNumber / arr.length,
            0
          );

        const { currentStreak, bestStreak } = games.reduce(
          (acc, game) => {
            const cs = game.result === "won" ? acc.currentStreak + 1 : 0;
            const bs = cs > acc.bestStreak ? cs : acc.bestStreak;

            return { currentStreak: cs, bestStreak: bs };
          },
          {
            currentStreak: 0,
            bestStreak: 0,
          }
        );

        return {
          data: {
            gamesNumber,
            successRate,
            avgMoves,
            bestStreak,
            currentStreak,
          },
        };
      },
      providesTags: ["Stats"],
    }),
  }),
});

export const { useRecordGameMutation, useGetStatsQuery } = statsApi;
