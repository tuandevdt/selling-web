import { Typography } from 'antd';
import OverviewStats from './components/OverviewStats';
import RevenueChart from './components/RevenueChart';
import LatestOrders from './components/LatestOrders';

const { Title } = Typography;

function Dashboard() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2}>Tổng quan</Title>
      </div>

      {/* Thống kê tổng quan */}
      <div className="mb-8">
        <OverviewStats />
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="mb-8">
        <RevenueChart />
      </div>

      {/* Đơn hàng mới nhất */}
      <div className="mb-8">
        <LatestOrders />
      </div>
    </div>
  );
}

export default Dashboard; 