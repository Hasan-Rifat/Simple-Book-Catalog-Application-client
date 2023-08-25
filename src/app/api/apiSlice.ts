import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://simple-book-catalog-application-server.vercel.app/api/v1",
  }),
  endpoints: () => ({}),
  tagTypes: ["wishlist", "readingList", "book"],
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
