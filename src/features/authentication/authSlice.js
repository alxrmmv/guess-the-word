import { supabaseApi } from "../../services/apiSupabase";
import supabase from "../../services/supabase";

export const authApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) return { error };

        return { data };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { user },
          } = await queryFulfilled;
          dispatch(
            authApi.util.upsertQueryData("getCurrentUser", undefined, user)
          );
          // console.log("patchResult", patchResult);
          // console.log(user);
        } catch {
          return;
        }
      },
    }),
    logout: builder.mutation({
      queryFn: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) return { error };

        return { data: null };
      },
      invalidatesTags: ["User"],
    }),
    signUp: builder.mutation({
      queryFn: async ({ name, email, password }) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });

        if (error) return { error };

        return { data };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { user },
          } = await queryFulfilled;
          // console.log("USER", user);
          const patchResult = dispatch(
            authApi.util.upsertQueryData("getCurrentUser", undefined, user)
          );
          console.log("USER", user, patchResult);
          // console.log("patchResult", patchResult);
          // console.log(user);
        } catch {
          return;
        }
      },
      // providesTags: ["User"],
    }),
    getCurrentUser: builder.query({
      queryFn: async () => {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) return { error: sessionError };

        if (!sessionData.session) return { data: null };

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) return { error: userError };

        return { data: user };
      },
      providesTags: ["User"],
    }),
    updateCurrentUser: builder.mutation({
      queryFn: async ({ name, email, password }) => {
        let updateData = { email, data: { name } };
        if (password) updateData = { ...updateData, password };
        const { data, error } = await supabase.auth.updateUser(updateData);

        if (error) return { error };
        return { data };
      },
      onQueryStarted({ name }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authApi.util.updateQueryData("getCurrentUser", undefined, (draft) => {
            Object.assign(draft, { user_metadata: { name } });
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    invalidatesTags: ["User"],
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
} = authApi;
