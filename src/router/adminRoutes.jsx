import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/dashboard/Dashboard'
import ManageProducts from '../pages/admin/ManageProducts'
import ManageCategories from '../pages/admin/ManageCategories'
import ManageOrders from '../pages/admin/orders/ManageOrders'
import ManageSuppliers from '../pages/admin/ManageSuppliers'
import AuthMiddleware from '../middleware/AuthMiddleware'
import ForbiddenPage from '../pages/ForbiddenPage'
import ManagerUser from '../pages/admin/users/ManagerUser'
import ManagerFeedback from '../pages/admin/feedbacks/ManagerFeedback'

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
    { path: 'users', element: <ManagerUser /> },
    { path: 'products', element: <ManageProducts /> },
    { path: 'categories', element: <ManageCategories /> },
    { path: 'orders', element: <ManageOrders /> },
    { path: 'suppliers', element: <ManageSuppliers /> },
    { path: 'feedbacks', element: <ManagerFeedback /> }
  ]
}

export default adminRoutes
