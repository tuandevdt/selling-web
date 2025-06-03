import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import UserLayout from '../layouts/UserLayout'
import AuthLayout from '../layouts/AuthLayout'
import Dashboard from '../pages/admin/Dashboard'
import ManageMovies from '../pages/admin/ManageMovies'
import ManageProducts from '../pages/admin/ManageProducts'
import Home from '../pages/user/Home'
import MovieDetail from '../pages/user/MovieDetail'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

const router = createBrowserRouter([
  // Auth routes - must be defined before the root path
  {
    path: '/login',
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthLayout>
        <Register />
      </AuthLayout>
    ),
  },
  // Admin routes
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'movies', element: <ManageMovies /> },
      { path: 'products', element: <ManageProducts /> },
    ],
  },
  // User routes (with header/footer)
  {
    path: '/',
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'movie/:id', element: <MovieDetail /> },
    ],
  }
])

export default router 