import { apiSlice } from "../../api/apiSlice";

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => `/book`,
      providesTags: ["book"],
    }),
    getBookSingleBook: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ["book"],
    }),

    createNewBook: builder.mutation({
      query: (body) => ({
        url: `/book`,
        method: "POST",
        body,
      }),
    }),
    updateBook: builder.mutation({
      query: (body) => ({
        url: `/book/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookSingleBookQuery,
  useCreateNewBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
