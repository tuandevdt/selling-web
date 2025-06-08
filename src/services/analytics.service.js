import { axiosPrivate } from './axiosConfig';

// Xử lý lỗi chung cho các API request
const handleError = (error) => {
  const { status, data } = error.response || {};
  let errorMessage = 'Đã xảy ra lỗi không xác định';
  
  if (data?.message) {
    errorMessage = data.message;
  } else if (status === 401) {
    errorMessage = 'Bạn cần đăng nhập để thực hiện thao tác này';
  } else if (status === 403) {
    errorMessage = 'Bạn không có quyền thực hiện thao tác này';
  } else if (status === 404) {
    errorMessage = 'Không tìm thấy dữ liệu yêu cầu';
  } else if (status === 400) {
    errorMessage = 'Dữ liệu gửi đi không hợp lệ';
  } else if (status >= 500) {
    errorMessage = 'Lỗi máy chủ, vui lòng thử lại sau';
  }
  
  throw new Error(errorMessage);
};

export const analyticsService = {
  // Lấy doanh thu theo khoảng thời gian
  getRevenue: async (params = {}) => {
    try {
      const response = await axiosPrivate.get('/statistics/revenue', { params });
      return response.data?.body?.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Lấy dữ liệu biểu đồ doanh thu
  getRevenueChart: async (params = {}) => {
    try {
      const response = await axiosPrivate.get('/statistics/revenue/chart', { params });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Lấy thống kê tổng quan (có thể thêm API mới cho phần này)
  getOverviewStats: async () => {
    try {
      // Gọi nhiều API song song để lấy dữ liệu tổng quan
      const [todayRevenue, weekRevenue, monthRevenue] = await Promise.all([
        analyticsService.getRevenue({ timeType: 'today' }),
        analyticsService.getRevenue({ timeType: 'thisWeek' }),
        analyticsService.getRevenue({ timeType: 'thisMonth' })
      ]);

      return {
        todayRevenue,
        weekRevenue,
        monthRevenue
      };
    } catch (error) {
      handleError(error);
    }
  },

  // Lấy báo cáo doanh số
  getSalesReport: async (params = {}) => {
    try {
      const response = await axiosPrivate.get('/analytics/sales', { params });
      return response.data?.body?.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Lấy thống kê khách hàng
  getCustomerStats: async (params = {}) => {
    try {
      const response = await axiosPrivate.get('/analytics/customers', { params });
      return response.data?.body?.data;
    } catch (error) {
      handleError(error);
    }
  },
}; 