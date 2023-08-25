import { apiSlice } from "../../api/apiSlice";

const readingListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReadingLists: builder.query({
      query: () => `/reading-list`,
    }),
    getReadingListSingleReadingList: builder.query({
      query: (email) => `/reading-list/${email}`,
      providesTags: ["readingList"],
    }),
    createReadingList: builder.mutation({
      query: (body) => ({
        url: `/reading-list`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["readingList"],
    }),
    updateReadingList: builder.mutation({
      query: (body) => ({
        url: `/reading-list/${body.id}`,
        method: "PATCH",
        body,
      }),
      onQueryStarted: async ({ email, status, bookId, id }) => {
        console.log("onQueryStarted", email, status, bookId, id);
      },
      invalidatesTags: ["readingList"],
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
