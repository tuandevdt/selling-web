import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8080/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 0, size = 10, sort = 'desc', ...params } = {}) => {
        return {
          url: '/products',
          method: 'GET',
          params: {
            page,
            size,
            sort,
            ...params,
          },
        };
      },
    }),
    
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      transformResponse: (response) => response?.body,
    }),

    getProductImages: builder.query({
      query: (id) => ({
        url: `/products/image-url-list/${id}`,
        method: 'GET',
      }),
      transformResponse: (response) => response?.body?.data,
    }),
    
    createProduct: builder.mutation({
      query: ({ productData }) => {
        const formData = new FormData();
        
        // Tạo object productRequest chứa tất cả thông tin sản phẩm trừ images
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
        
        // Append productRequest dưới dạng JSON string
        formData.append('productRequest', JSON.stringify(productRequest));
        
        // Append images với tên field là multipartFiles
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
    }),
    
    updateProduct: builder.mutation({
      query: ({ id, productData }) => {
        const formData = new FormData();
        
        // Tạo object productRequest chứa tất cả thông tin sản phẩm trừ images
        const productRequest = {
          name: productData.name,
          tag: productData.tag,
          description: productData.description,
          size: productData.size,
          price: productData.price,
          stock: productData.stock,
          warranty: productData.warranty,
          material_ids: productData.materialIds,
          category_id: productData.categoryId,
          supplier_id: productData.supplierId
        };
        
        // Append productRequest dưới dạng JSON string
        formData.append('productRequest', JSON.stringify(productRequest));
        
        // Append images với tên field là multipartFiles
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
    }),
    
    deleteProductSoft: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => response.data,
    }),
    
    deleteProductPermanent: builder.mutation({
      query: (id) => ({
        url: `/products/${id}/permanent`,
        method: 'DELETE',
      }),
      transformResponse: (response) => response.data,
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
} = productsApi; 