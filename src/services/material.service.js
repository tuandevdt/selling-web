import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const materialApi = createApi({
  reducerPath: 'materialApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8080/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMaterials: builder.query({
      query: () => ({
        url: '/materials',
        method: 'GET'
      })
    })
  })
});

export const { useGetMaterialsQuery } = materialApi; 