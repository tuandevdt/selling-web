import { Outlet } from 'react-router-dom'

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white">
      {children}
    </div>
  )
}

export default AuthLayout 