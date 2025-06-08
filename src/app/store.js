import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../services/products.service';
import { suppliersApi } from '../services/suppliers.service';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [suppliersApi.reducerPath]: suppliersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      suppliersApi.middleware
    ),
}); 