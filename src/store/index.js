import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from '../services/products.service'
import { categoryApi } from '../services/category.service'
import { materialApi } from '../services/material.service'
import { supplierApi } from '../services/supplier.service'

// Tạo store với các middleware cần thiết
export const store = configureStore({
  reducer: {
    // Add API reducers
    [productsApi.reducerPath]: productsApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [materialApi.reducerPath]: materialApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      categoryApi.middleware,
      materialApi.middleware,
      supplierApi.middleware
    ),
})

// Export default store để phù hợp với import trong main.jsx
export default store 