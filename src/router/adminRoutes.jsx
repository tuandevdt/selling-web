import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/dashboard/Dashboard'
import ManageProducts from '../pages/admin/ManageProducts'
import ManageCategories from '../pages/admin/ManageCategories'
import ManageOrders from '../pages/admin/orders/ManageOrders'
import ManageSuppliers from '../pages/admin/ManageSuppliers'
import AuthMiddleware from '../middleware/AuthMiddleware'
import ForbiddenPage from '../pages/ForbiddenPage'

const adminRoutes = {
  path: '/admin',
  element: (
    <AuthMiddleware>
      <AdminLayout />
    </AuthMiddleware>
  ),
  errorElement: <ForbiddenPage />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: 'products', element: <ManageProducts /> },
    { path: 'categories', element: <ManageCategories /> },
    { path: 'orders', element: <ManageOrders /> },
    { path: 'suppliers', element: <ManageSuppliers /> }
  ]
}

export default adminRoutes
