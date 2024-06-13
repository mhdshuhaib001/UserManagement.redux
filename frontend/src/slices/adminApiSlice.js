import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    getUserData: builder.mutation({
      query: ({ searchTerm }) => ({
        url: `${ADMIN_URL}/getuser?searchTerm=${searchTerm}`,
        method: "GET",
      }),
    }),    
    addUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adduser`,
        method: "POST",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_URL}/delete?id=${userId}`,
        method: "DELETE",
      }),
    }),
    editUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `${ADMIN_URL}/edituser?id=${userId}`,
        method: "POST",
        body: { userId, ...data },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/adminlogout`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetUserDataMutation,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useLogoutMutation
} = adminApiSlice;
