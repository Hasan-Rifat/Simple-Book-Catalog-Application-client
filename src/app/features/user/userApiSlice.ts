import { apiSlice } from "../../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `/users`,
    }),
    getUserSingleUser: builder.query({
      query: (id) => `/user/${id}`,
    }),
    register: builder.mutation({
      query: (body) => ({
        url: `/user/register`,
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `/user/login`,
        method: "POST",
        body,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ email, body }) => ({
        url: `/user/${email}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserSingleUserQuery,
  useRegisterMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
