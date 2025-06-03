import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

function UserLayout() {
  const categories = [
    { name: 'Ghế sofa', href: '/category/sofa' },
    { name: 'Bàn', href: '/category/tables' },
    { name: 'Tủ', href: '/category/cabinets' },
    { name: 'Giường', href: '/category/beds' },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  )
}

export default UserLayout 