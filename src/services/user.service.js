import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUserbyEmail: builder.query({
      query: (email) => ({
        url: `/users/get-user-by-email?email=${email}`,
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['Users'],
    }),
    searchUsers: builder.query({
      query: ({ phone, email, fullname, address, isActive, page = 0, size = 10 }) => ({
        url: '/users/search',
        method: 'GET',
        params: {
          phone,
          email,
          fullname,
          address,
          isActive,
          page,
          size
        }
      }),
      transformResponse: (response) => response?.body?.data,
      providesTags: ['Users'],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      transformResponse: (response) => response?.body?.data,
      providesTags: ['Users'],
    }),
    lockUser: builder.mutation({
      query: (email) => ({
        url: `/users/lock/${email}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Users'],
    }),
    unlockUser: builder.mutation({
      query: (email) => ({
        url: `/users/unlock/${email}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (email) => ({
        url: `/users/${email}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { 
  useGetUserbyEmailQuery,
  useUpdateUserMutation,
  useSearchUsersQuery,
  useGetAllUsersQuery,
  useLockUserMutation,
  useUnlockUserMutation,
  useDeleteUserMutation
} = userApi;