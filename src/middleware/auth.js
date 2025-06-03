import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

/**
 * Middleware bảo vệ route yêu cầu đăng nhập, không phân biệt role
 * @returns {JSX.Element} - Component con hoặc chuyển hướng đến trang đăng nhập
 */
export const RequireAuth = () => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  
  console.log('RequireAuth - isAuthenticated:', isAuthenticated);
  
  if (!isAuthenticated) {
    // Lưu lại đường dẫn hiện tại để chuyển hướng sau khi đăng nhập
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <Outlet />;
};

/**
 * Middleware bảo vệ route yêu cầu quyền Admin
 * @returns {JSX.Element} - Component con hoặc chuyển hướng đến trang không có quyền
 */
export const RequireAdmin = () => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getUser();
  const role = user?.role;
  
  console.log('RequireAdmin - Auth State:', { isAuthenticated, role });
  
  if (!isAuthenticated) {
    // Chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (role !== 2) { // Role admin = 2
    // Chuyển hướng đến trang không có quyền
    return <Navigate to="/unauthorized" state={{ 
      message: 'Bạn không có quyền truy cập trang này',
      requiredRole: 'Admin',
      currentRole: role
    }} replace />;
  }
  
  return <Outlet />;
};

/**
 * Middleware bảo vệ route yêu cầu quyền cụ thể
 * @param {Object} props 
 * @param {string|Array} props.requiredPermission - Quyền yêu cầu ('read', 'create', 'update', 'delete', 'admin')
 * @returns {JSX.Element} - Component con hoặc chuyển hướng đến trang không có quyền
 */
export const RequirePermission = ({ requiredPermission }) => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getUser();
  const permissions = user?.permissions || [];
  
  console.log('RequirePermission - Auth State:', { 
    isAuthenticated, 
    permissions, 
    requiredPermission 
  });
  
  if (!isAuthenticated) {
    // Chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Kiểm tra quyền (có thể là một quyền hoặc mảng quyền)
  const hasPermission = Array.isArray(requiredPermission) 
    ? requiredPermission.some(perm => permissions.includes(perm))
    : permissions.includes(requiredPermission);
  
  if (!hasPermission) {
    // Chuyển hướng đến trang không có quyền
    return <Navigate to="/unauthorized" state={{ 
      message: 'Bạn không có quyền thực hiện thao tác này',
      requiredPermission
    }} replace />;
  }
  
  return <Outlet />;
};

/**
 * HOC bảo vệ component riêng lẻ yêu cầu quyền cụ thể
 * @param {React.FC} Component - Component cần bảo vệ 
 * @param {string|Array} requiredPermission - Quyền yêu cầu
 * @returns {React.FC} - Component được bảo vệ
 */
export const withPermission = (Component, requiredPermission) => {
  return (props) => {
    const isAuthenticated = authService.isAuthenticated();
    const user = authService.getUser();
    const permissions = user?.permissions || [];
    
    const hasPermission = Array.isArray(requiredPermission) 
      ? requiredPermission.some(perm => permissions.includes(perm))
      : permissions.includes(requiredPermission);
      
    if (!isAuthenticated || !hasPermission) {
      return (
        <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p className="font-bold">Không có quyền</p>
          <p>Bạn cần có quyền {requiredPermission} để xem nội dung này.</p>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
}; 