import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
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
    getOrders: builder.query({
      query: (params) => ({
        url: '/orders',
        method: 'GET',
        params,
      }),
      transformResponse: (response) => response?.body?.data,
    }),
    getUserOrders: builder.query({
      query: (userId) => ({
        url: `/orders/user?user_id=${userId}`,
        method: 'GET',
      }),
    }),
    getLatestOrders: builder.query({
      query: () => ({
        url: '/orders',
        method: 'GET',
        params: {
          page: 0,
          size: 100,
        }
      }),
      transformResponse: (response) => {
        const data = response?.body?.data;
        if (!data?.content || !Array.isArray(data.content)) return { content: [] };
        
        // Sort và lấy 5 đơn hàng mới nhất
        const latestOrders = [...data.content]
          .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
          .slice(0, 5);
          
        return { content: latestOrders };
      },
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/update_status?id=${orderId}&status=${status}`,
        method: 'PUT',
      }),
      // Invalidate getOrders query để tự động refresh sau khi update
      invalidatesTags: ['Orders'],
    }),
  }),
  // Thêm tags để quản lý cache
  tagTypes: ['Orders'],
});

export const { 
  useGetOrdersQuery, 
  useGetUserOrdersQuery,
  useGetLatestOrdersQuery,
  useUpdateOrderStatusMutation 
} = orderApi;