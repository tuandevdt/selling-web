function Dashboard() {
  // Sample data
  const stats = [
    { name: 'Tổng sản phẩm', value: '48' },
    { name: 'Đơn hàng chờ xử lý', value: '12' },
    { name: 'Doanh thu tháng này', value: '24.500.000₫' },
    { name: 'Khách hàng mới', value: '38' },
  ]

  return (
    <div>
      <div className="bg-white shadow rounded-lg px-4 py-5 sm:px-6 mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</dd>
            </div>
          </div>
        ))}
      </div>
      
      {/* Main content area */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Welcome card */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900">Chào mừng bạn đến với Admin Dashboard</h2>
          <p className="mt-1 text-sm text-gray-500">
            Đây là bảng điều khiển quản trị viên nơi bạn có thể quản lý tất cả các khía cạnh của website nội thất của bạn.
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Xem hướng dẫn sử dụng
            </a>
          </div>
        </div>
        
        {/* Recent activities */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Hoạt động gần đây</h3>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="px-4 py-4 sm:px-6">
              <p className="text-sm text-gray-500">Khách hàng <span className="font-medium text-gray-900">Nguyễn Văn A</span> đã đặt hàng mới</p>
              <p className="mt-1 text-xs text-gray-500">1 giờ trước</p>
            </div>
            <div className="px-4 py-4 sm:px-6">
              <p className="text-sm text-gray-500">Sản phẩm <span className="font-medium text-gray-900">Ghế văn phòng cao cấp</span> sắp hết hàng</p>
              <p className="mt-1 text-xs text-gray-500">3 giờ trước</p>
            </div>
            <div className="px-4 py-4 sm:px-6">
              <p className="text-sm text-gray-500">Bạn đã thêm sản phẩm mới <span className="font-medium text-gray-900">Bàn làm việc gỗ sồi</span></p>
              <p className="mt-1 text-xs text-gray-500">Hôm qua lúc 15:30</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 