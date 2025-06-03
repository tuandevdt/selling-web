import axios from 'axios';

const BASE_URL = '/api/v1';

// Public instance - không cần token
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Private instance - cần token
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor cho private instance
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý refresh token khi token hết hạn
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Lấy refresh token từ localStorage
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (!refreshToken) {
          // Nếu không có refresh token, chuyển về trang login
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Gọi API refresh token
        const response = await axiosPublic.post('/auth/refresh', {
          refresh_token: refreshToken
        });

        const { access_token } = response.data;
        
        // Lưu token mới
        localStorage.setItem('access_token', access_token);
        
        // Cập nhật token trong header của request gốc
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        
        // Thực hiện lại request gốc
        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token cũng hết hạn, xóa toàn bộ thông tin auth và chuyển về trang login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
); 