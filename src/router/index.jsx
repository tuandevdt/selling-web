import { createBrowserRouter } from 'react-router-dom'
import adminRoutes from './adminRoutes'
import userRoutes from './userRoutes'
import authRoutes from './authRoutes'
import ForbiddenPage from '../pages/ForbiddenPage'

const router = createBrowserRouter([
  // Auth routes
  ...authRoutes,
  
  // Admin routes
  adminRoutes,
  
  // User routes
  userRoutes,
  
  // Error pages
  {
    path: '/forbidden',
    element: <ForbiddenPage />
  }
])

export default router 