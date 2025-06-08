import { Routes, Route } from 'react-router-dom'
import adminRoutes from './router/adminRoutes'
import userRoutes from './router/userRoutes'
import authRoutes from './router/authRoutes'
import ForbiddenPage from './pages/ForbiddenPage'

function App() {
  return (
    <Routes>
      {/* Auth routes */}
      {authRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      
      {/* Admin routes */}
      <Route path={adminRoutes.path} element={adminRoutes.element}>
        {adminRoutes.children.map((route) => (
          <Route
            key={route.path || 'index'}
            index={route.index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Route>

      {/* User routes */}
      <Route path={userRoutes.path} element={userRoutes.element}>
        {userRoutes.children.map((route) => (
          <Route
            key={route.path || 'index'}
            index={route.index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Route>

      {/* Forbidden page */}
      <Route path="/forbidden" element={<ForbiddenPage />} />
    </Routes>
  )
}

export default App
