import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const supabaseApi = createApi({
  reducerPath: "supabaseApi",
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ["User", "Stats"],
});
