import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

/**
 * Middleware để bảo vệ các route cần xác thực
 * @param {Object} props
 * @param {React.ReactNode} props.children - Component con được render nếu đã xác thực
 * @param {string} [props.redirectTo='/login'] - Đường dẫn chuyển hướng nếu chưa xác thực
 * @param {number} [props.requiredRole] - Role yêu cầu để truy cập, nếu không cung cấp thì chỉ cần xác thực
 */
const AuthMiddleware = ({ children, redirectTo = '/login', requiredRole }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          // Lấy thông tin user hiện tại từ API
          const user = localStorage.getItem('user');
          if (user) {
            setCurrentUser(JSON.parse(user));
          }
        }
      } catch (err) {
        console.error('Lỗi khi lấy thông tin user:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Nếu đang tải, hiển thị loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Nếu chưa xác thực, chuyển hướng đến trang đăng nhập
  if (!authService.isAuthenticated()) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  const user = currentUser || authService.getUser();
  const userRole = user?.role;

  // Hiển thị thông tin debug trong môi trường development
  if (process.env.NODE_ENV !== 'production') {
    console.log('AuthMiddleware Debug:', {
      authenticated: authService.isAuthenticated(),
      userRole,
      requiredRole,
      user
    });
  }

  // Kiểm tra quyền truy cập theo role nếu có yêu cầu
  if (requiredRole !== undefined && userRole !== undefined && userRole !== requiredRole) {
    // Nếu là role user thông thường mà cố truy cập trang admin
    if (userRole === 1 && requiredRole === 2) {
      console.log("Chuyển hướng user thường từ trang admin về trang chủ");
      return <Navigate to="/" replace />;
    }
    // Nếu là role admin mà cố truy cập các trang chỉ dành cho user thông thường
    if (userRole === 2 && requiredRole === 1) {
      console.log("Chuyển hướng admin từ trang user về trang admin");
      return <Navigate to="/admin" replace />;
    }
  }

  // Hiển thị debug thông tin nếu trong môi trường development
  if (process.env.NODE_ENV !== 'production') {
    return (
      <>
        {error ? (
          <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <h2 className="font-bold">Lỗi xác thực</h2>
            <p>{error}</p>
          </div>
        ) : (
          children
        )}
      </>
    );
  }

  return children;
};

export default AuthMiddleware; 