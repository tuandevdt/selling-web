import UserLayout from '../layouts/UserLayout'
import Home from '../pages/user/Home'
import ProductDetail from '../pages/user/ProductDetail'
import CartPage from '../pages/user/CartPage'
import CheckoutPage from '../pages/user/CheckoutPage'
import ProductPage from '../pages/user/products/ProductPage'
import OrderPage from '../pages/user/OrderPage'
import ProductByCategories from '../pages/user/products/by-categories/ProductByCategories'
import Blog from '../pages/user/blog/Blog'
import Contact from '../pages/user/contact/Contact'
import Profile from '../pages/user/profile/Profile'

const userRoutes = {
  path: '/',
  element: <UserLayout />,
  children: [
    { index: true, element: <Home /> },
    { path: 'san-pham/:id', element: <ProductDetail /> },
    { path: 'danh-muc/:id', element: <ProductByCategories /> },
    { path: 'san-pham', element: <ProductPage /> },
    { path: 'cart', element: <CartPage /> },
    { path: 'checkout', element: <CheckoutPage /> },
    { path: 'orders', element: <OrderPage /> },
    { path: 'tin-tuc', element: <Blog /> },
    { path: 'lien-he', element: <Contact /> },
    { path: 'tai-khoan', element: <Profile /> }
  ]
}

export default userRoutes
