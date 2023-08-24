import { apiSlice } from "../../api/apiSlice";

const readingListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReadingLists: builder.query({
      query: () => `/reading-list`,
    }),
    getReadingListSingleReadingList: builder.query({
      query: (id) => `/reading-list/${id}`,
    }),
    createReadingList: builder.mutation({
      query: (body) => ({
        url: `/reading-list`,
        method: "POST",
        body,
      }),
    }),
    updateReadingList: builder.mutation({
      query: ({ email, body }) => ({
        url: `/reading-list/${email}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteReadingList: builder.mutation({
      query: (id) => ({
        url: `/reading-list/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllReadingListsQuery,
  useGetReadingListSingleReadingListQuery,
  useCreateReadingListMutation,
  useUpdateReadingListMutation,
  useDeleteReadingListMutation,
} = readingListApi;
