import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

/**
 * Middleware để bảo vệ các route cần xác thực
 * @param {Object} props
 * @param {React.ReactNode} props.children - Component con được render nếu đã xác thực
 * @param {number} [props.requiredRole] - Role yêu cầu để truy cập (1: user, 2: admin)
 */
const AuthMiddleware = ({ children }) => {  
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const user = localStorage.getItem('user');
          if (user) {
            setCurrentUser(JSON.parse(user));
          }
        }
      } catch (err) {
        console.error('Lỗi khi lấy thông tin user:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Nếu chưa đăng nhập, chuyển về trang login
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const user = currentUser || authService.getUser();
  
  // Nếu không có quyền truy cập, chuyển đến trang forbidden
  if (user?.role !== 'admin') {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default AuthMiddleware; 