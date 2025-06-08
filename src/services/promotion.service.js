import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const promotionApi = createApi({
  reducerPath: 'promotionApi',
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
  tagTypes: ['Promotions'],
  endpoints: (builder) => ({
    getActivePromotions: builder.query({
      query: () => ({
        url: '/promotions/active',
        method: 'GET',
      }),
      transformResponse: (response) => response?.body?.data,
      providesTags: ['Promotions'],
    }),

    createPromotion: builder.mutation({
      query: (data) => ({
        url: '/promotions',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response?.body?.data,
      invalidatesTags: ['Promotions'],
    }),

    updatePromotion: builder.mutation({
      query: ({ id, data }) => ({
        url: `/promotions/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response) => response?.body?.data,
      invalidatesTags: ['Promotions'],
    }),

    softDeletePromotion: builder.mutation({
      query: (id) => ({
        url: `/promotions/${id}/soft`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Promotions'],
    }),

    hardDeletePromotion: builder.mutation({
      query: (id) => ({
        url: `/promotions/${id}/hard`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Promotions'],
    }),

    getPromotionCategories: builder.query({
      query: (id) => ({
        url: `/promotions/${id}/categories`,
        method: 'GET',
      }),
      transformResponse: (response) => response?.body?.data,
    }),
  }),
});

export const {
  useGetActivePromotionsQuery,
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
  useSoftDeletePromotionMutation,
  useHardDeletePromotionMutation,
  useGetPromotionCategoriesQuery,
} = promotionApi; 