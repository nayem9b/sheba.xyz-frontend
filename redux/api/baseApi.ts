import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://sheba-backkend.vercel.app/api/v1",
  }),

  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
