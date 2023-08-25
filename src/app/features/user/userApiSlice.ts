import { apiSlice } from "../../api/apiSlice";
import { setUser } from "./userSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `/users`,
    }),
    getUserSingleUser: builder.query({
      query: (id) => `/user/${id}`,
    }),
    register: builder.mutation({
      query: ({ email, password, firstName, lastName }) => ({
        url: `/user/register`,
        method: "POST",
        body: {
          email,
          password,
          firstName,
          lastName,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        if (result.data) {
          const data = {
            email: result.data.data.email,
            firstName: result.data.data.firstName,
            lastName: result.data.data.lastName,
          };
          dispatch(setUser(data));
        }
      },
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `/user/login`,
        method: "POST",
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        if (result.data) {
          const data = {
            email: result.data.data.email,
            firstName: result.data.data.firstName,
            lastName: result.data.data.lastName,
          };
          dispatch(setUser(data));
        }
      },
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
