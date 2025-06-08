import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from '../services/products.service'
import { categoryApi } from '../services/category.service'
import { materialApi } from '../services/material.service'
import { supplierApi } from '../services/supplier.service'
import { orderApi } from '../services/order.service'
import { suppliersApi } from '../services/suppliers.service'
import { userApi } from '../services/user.service'
import { feedbackApi } from '../services/feedback.service'
// Tạo store với các middleware cần thiết
export const store = configureStore({
  reducer: {
    // Add API reducers
    [productsApi.reducerPath]: productsApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [materialApi.reducerPath]: materialApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [suppliersApi.reducerPath]: suppliersApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      categoryApi.middleware,
      materialApi.middleware,
      supplierApi.middleware,
      orderApi.middleware,
      suppliersApi.middleware,
      userApi.middleware,
      feedbackApi.middleware
    ),
})

// Export default store để phù hợp với import trong main.jsx
export default store 