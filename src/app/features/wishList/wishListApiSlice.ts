import { apiSlice } from "../../api/apiSlice";

const wishListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllWishLists: builder.query({
      query: () => `/wish-list`,
    }),
    getWishListSingleWishList: builder.query({
      query: (id) => `/wish-list/${id}`,
    }),
    createWishList: builder.mutation({
      query: (body) => ({
        url: `/wish-list`,
        method: "POST",
        body,
      }),
    }),
    updateWishList: builder.mutation({
      query: ({ email, body }) => ({
        url: `/wish-list/${email}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteWishList: builder.mutation({
      query: (id) => ({
        url: `/wish-list/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllWishListsQuery,
  useGetWishListSingleWishListQuery,
  useCreateWishListMutation,
  useUpdateWishListMutation,
  useDeleteWishListMutation,
} = wishListApi;
