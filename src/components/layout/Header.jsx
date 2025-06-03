import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('shopping_cart');
    setUser(null);
    setDropdownOpen(false);
  };

  const menuItems = [
    { name: 'Sản phẩm', href: '/san-pham' },
    { name: 'Phòng khách', href: '/phong-khach' },
    { name: 'Phòng ngủ', href: '/phong-ngu' },
    { name: 'Nhà bếp', href: '/nha-bep' },
    { name: 'Phòng thờ', href: '/phong-tho' },
    { name: 'Văn phòng', href: '/van-phong' },
    { name: 'Dự án', href: '/du-an' },
    { name: 'Tin tức', href: '/tin-tuc' },
    { name: 'Liên hệ', href: '/lien-he' },
  ]

  const keywords = ["ghế xoay văn phòng", "ghế giám đốc", "ghế lãnh đạo da", "bàn làm việc"]

  return (
    <header className="bg-white">
      {/* Top bar */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 flex justify-between items-center py-1 text-sm">
          <div className="hidden md:block">
            <Link to="/" className="text-blue-800 font-bold text-base md:text-lg whitespace-nowrap overflow-hidden text-ellipsis">
              GOVI FURNITURE – NỘI THẤT VĂN PHÒNG
            </Link>
          </div>
          <div className="flex items-center space-x-3 md:space-x-4">
            <Link to="/tin-tuc" className="flex items-center text-gray-700 hover:text-blue-700 text-xs sm:text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span className="hidden sm:inline">Tin tức</span>
            </Link>
            <div className="flex items-center text-gray-700 space-x-1">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center hover:text-blue-700 text-xs sm:text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="hidden sm:inline">{user.fullName}</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Thông tin cá nhân
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Đơn hàng của tôi
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="flex items-center hover:text-blue-700 text-xs sm:text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span className="hidden sm:inline">Đăng nhập</span>
                  </Link>
                  <span className="hidden sm:inline text-xs">/</span>
                  <Link to="/register" className="hover:text-blue-700 text-xs sm:text-sm hidden sm:inline">
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
            <Link to="/wishlist" className="flex items-center text-gray-700 hover:text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
            <Link to="/cart" className="flex items-center text-gray-700 hover:text-blue-700 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-blue-700 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">1</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="py-2 md:py-3">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 flex flex-wrap items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <img src="../../../public/logo/logo_fami.png" alt="FAMI" className="h-10 md:h-12" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-blue-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="w-full lg:w-auto lg:flex-1 mt-4 lg:mt-0 lg:mx-6 order-3 lg:order-2">
            <div className="flex">
              <div className="relative w-full">
                <div className="flex">
                  <button className="border border-gray-300 bg-gray-100 text-gray-700 px-2 sm:px-3 rounded-l-md flex items-center text-xs sm:text-sm whitespace-nowrap">
                    Tất cả
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    className="w-full border border-gray-300 py-1.5 px-2 sm:px-3 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Nhập từ khóa tìm kiếm..."
                  />
                </div>
                <button className="absolute right-0 top-0 h-full bg-blue-700 text-white px-2 sm:px-3 rounded-r-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap mt-1 text-xs text-gray-600 items-center">
              <span className="mr-1 hidden sm:inline">Từ khóa phổ biến:</span>
              {keywords.map((keyword, index) => (
                <Link key={index} to={`/search?q=${encodeURIComponent(keyword)}`} className="mr-2 hover:text-blue-700 text-xs truncate">
                  {keyword}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="hidden lg:flex items-center order-2 lg:order-3">
            <div className="mr-4">
              <div className="flex items-center">
                <div className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600 text-xs">Tư vấn bán hàng</p>
                  <p className="text-red-600 font-bold text-base">0909.12.1111</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <div className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600 text-xs">Tổng đài (24/24)</p>
                  <p className="text-red-600 font-bold text-base">1900 4752</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center">
            <button className="py-2 px-3 bg-blue-900 flex items-center font-medium text-sm sm:text-base whitespace-nowrap">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>DANH MỤC SẢN PHẨM</span>
            </button>
            <nav className="hidden md:flex overflow-x-auto">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="px-3 py-2 hover:bg-blue-700 transition duration-200 text-sm whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="bg-white border-b shadow-lg md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 my-2 pt-2">
              <div className="flex items-center px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-gray-600 text-xs">Tổng đài (24/24)</p>
                  <p className="text-red-600 font-bold text-base">1900 4752</p>
                </div>
              </div>
              <div className="flex items-center px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div>
                  <p className="text-gray-600 text-xs">Tư vấn bán hàng</p>
                  <p className="text-red-600 font-bold text-base">0909.12.1111</p>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-2 pt-2 flex">
                <Link 
                  to="/login" 
                  className="flex-1 text-center py-2 text-blue-700 font-medium border-r border-gray-200" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
                <Link 
                  to="/register" 
                  className="flex-1 text-center py-2 text-blue-700 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header 