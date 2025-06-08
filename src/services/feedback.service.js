import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
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
    getFeedbacks: builder.query({
      query: ({ page = 0, size = 10, product_id, user_id, comment }) => ({
        url: '/feedbacks',
        method: 'GET',
        params: {
          page,
          size,
          product_id,
          user_id,
          comment,
        }
      }),
      transformResponse: (response) => response?.body?.data,
    }),
    
    disableFeedback: builder.mutation({
      query: (feedback_id) => ({
        url: `/feedbacks/${feedback_id}`,
        method: 'PUT',
      }),
      transformResponse: (response) => response?.body?.data,
    }),
  }),
});

export const {
  useGetFeedbacksQuery,
  useDisableFeedbackMutation,
} = feedbackApi; 