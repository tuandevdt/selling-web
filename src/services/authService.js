import { axiosPublic, axiosPrivate } from './axiosConfig';

export const authService = {
  // Đăng nhập
  login: async (email, password) => {
    try {
      const response = await axiosPublic.post('/auth/login', {
        email,
        password
      });
      
      const userData = response.data;
      
      // Lưu token và thông tin user vào localStorage
      if (userData.token) {
        localStorage.setItem('access_token', userData.token);
        // Lưu thông tin user (bỏ token ra khỏi object user)
        const { token, ...userInfo } = userData;
        localStorage.setItem('user', JSON.stringify(userInfo));
      }
      
      return userData;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Đăng xuất
  logout: async () => {
    try {
      await axiosPrivate.post('/auth/logout');
    } finally {
      // Luôn xóa thông tin auth khỏi localStorage, kể cả khi API fail
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: async () => {
    try {
      const response = await axiosPrivate.post('/users/current');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Đăng ký
  register: async (userData) => {
    try {
      const response = await axiosPublic.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Kiểm tra đã đăng nhập chưa
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },

  // Lấy thông tin user từ localStorage
  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}; 