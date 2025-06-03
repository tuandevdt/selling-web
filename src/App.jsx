import { Routes, Route } from 'react-router-dom'

// Layouts
import AdminLayout from './layouts/AdminLayout'
import UserLayout from './layouts/UserLayout'
import AuthLayout from './layouts/AuthLayout'

// Middleware
import AuthMiddleware from './middleware/AuthMiddleware'

// Admin pages
import Dashboard from './pages/admin/Dashboard'
import ManageProducts from './pages/admin/ManageProducts'
import ManageCategories from './pages/admin/ManageCategories'

// User pages
import Home from './pages/user/Home'
import ProductDetail from './pages/user/ProductDetail'
import CartPage from './pages/user/CartPage'
import CheckoutPage from './pages/user/CheckoutPage'
// Auth pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ProductPage from './pages/user/ProductPage'

function App() {
  return (
    <Routes>
      {/* Auth routes without header/footer */}
      <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
      
      {/* Admin routes - protected với role = 2 */}
      <Route path="/admin" element={
        <AuthMiddleware requiredRole={2}>
          <AdminLayout />
        </AuthMiddleware>
      }>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ManageProducts />} />
        <Route path="categories" element={<ManageCategories />} />
      </Route>
      
      {/* User routes with header/footer - không yêu cầu đăng nhập */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="san-pham/:id" element={<ProductDetail />} />
        <Route path="san-pham" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  )
}

export default App
