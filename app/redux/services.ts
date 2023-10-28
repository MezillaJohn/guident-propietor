import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLocalStorage } from "../helpers/storage";

export const authenticatedBase = createApi({
  reducerPath: "Auth",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_AUTH_BASE_URL,
    prepareHeaders: (headers) => {
      if (getLocalStorage("school_id") || getLocalStorage("school_token")) {
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");
        headers.set(
          "Authorization",
          `Bearer ${getLocalStorage("school_token")}`
        );
      }
      return headers;
    },
  }),
  tagTypes: ["classes", "academicSession", "students"],
  refetchOnReconnect: true,
  endpoints: () => ({}),
});

export const unAuthenticatedBase = createApi({
  reducerPath: "unAth",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_UNAUTH_BASE_URL,
  }),
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
