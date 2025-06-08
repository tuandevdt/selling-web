import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
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
  tagTypes: ['Products', 'ProductById', 'ProductImages'], // 🏷️ Tag types
  endpoints: (builder) => ({

    getProducts: builder.query({
      query: (params = {}) => {
        // Destructuring với default values cho tất cả các tham số có thể có
        const {
          name = '',
          category_id = '',
          supplier_id = '',
          min_price = '',
          max_price = '',
          sort = '',
          page = 0,
          size = 15
        } = params;

        // Chỉ thêm các tham số có giá trị thực sự
        const queryParams = {
          page,
          size,
          ...(name && name.trim() !== '' && { name }),
          ...(category_id && { category_id }),
          ...(supplier_id && { supplier_id }),
          ...(min_price && { min_price }),
          ...(max_price && { max_price }),
          ...(sort && sort.trim() !== '' && { sort })
        };

        return {
          url: '/products',
          method: 'GET',
          params: queryParams,
        };
      },
      transformResponse: (response) => response?.body?.data,
      providesTags: ['Products'],
    }),

    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      transformResponse: (response) => response?.body,
      providesTags: (result, error, id) => [{ type: 'ProductById', id }],
    }),

    getProductImages: builder.query({
      query: (id) => ({
        url: `/products/image-url-list/${id}`,
        method: 'GET',
      }),
      transformResponse: (response) => response?.body?.data,
      providesTags: (result, error, id) => [{ type: 'ProductImages', id }],
    }),

    createProduct: builder.mutation({
      query: ({ productData }) => {
        const formData = new FormData();
        const productRequest = {
          name: productData.name,
          tag: productData.tag,
          description: productData.description,
          size: productData.size,
          price: productData.price,
          stock: productData.stock,
          warranty: productData.warranty,
          material_ids: productData.material_ids,
          category_id: productData.category_id,
          supplier_id: productData.supplier_id
        };
        formData.append('productRequest', JSON.stringify(productRequest));
        if (productData.images?.length > 0) {
          productData.images.forEach(image => {
            formData.append('multipartFiles', image);
          });
        }

        return {
          url: '/products',
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (response) => response.data,
      invalidatesTags: ['Products'],
    }),

    updateProduct: builder.mutation({
      query: ({ id, productData }) => {
        const formData = new FormData();
        const productRequest = {
          name: productData.name,
          tag: productData.tag,
          description: productData.description,
          size: Number(productData.size),
          price: productData.price,
          stock: productData.stock,
          warranty: Number(productData.warranty),
          material_ids: productData.materialIds,
          category_id: productData.categoryId,
          supplier_id: productData.supplierId
        };
        formData.append('productRequest', JSON.stringify(productRequest));
        if (productData.images?.length > 0) {
          productData.images.forEach(image => {
            formData.append('multipartFiles', image);
          });
        }

        return {
          url: `/products/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      transformResponse: (response) => response.data,
      invalidatesTags: (result, error, { id }) => [
        'Products',
        { type: 'ProductById', id },
        { type: 'ProductImages', id }
      ],
    }),

    deleteProductSoft: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ['Products'],
    }),

    deleteProductPermanent: builder.mutation({
      query: (id) => ({
        url: `/products/${id}/permanent`,
        method: 'DELETE',
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ['Products'],
    }),

    getProductsByCategory: builder.query({
      query: (categoryId) => ({
        url: '/products',
        method: 'GET',
        params: {
          category_id: categoryId,
        },
      }),
      transformResponse: (response) => response?.body?.data,
      providesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductImagesMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductSoftMutation,
  useDeleteProductPermanentMutation,
  useGetProductImagesQuery,
  useGetProductsByCategoryQuery,
} = productsApi;
