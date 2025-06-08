import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const supplierApi = createApi({
  reducerPath: 'supplierApi',
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
  endpoints: (builder) => ({
    getSuppliers: builder.query({
      query: () => ({
        url: '/suppliers',
        method: 'GET'
      })
    }),
    // Thêm mới
    addSupplier: builder.mutation({
      query: (body) => ({
        url: '/suppliers',
        method: 'POST',
        body,
      }),
    }),
    // Sửa
    updateSupplier: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/suppliers/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    // Xóa
    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { 
  useGetSuppliersQuery,
  useAddSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation
} = supplierApi;