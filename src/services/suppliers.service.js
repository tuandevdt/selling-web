import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const suppliersApi = createApi({
  reducerPath: 'suppliersApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['Suppliers'],
  endpoints: (builder) => ({
    getSuppliers: builder.query({
      query: () => ({
        url: '/suppliers',
        method: 'GET',
      }),
      transformResponse: (response) => response?.body?.data,
      providesTags: ['Suppliers'],
    }),
  }),
});

export const {
  useGetSuppliersQuery,
} = suppliersApi; 