import { Card, Statistic, Row, Col, Spin } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { analyticsService } from '../../../../services/analytics.service';

function OverviewStats() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await analyticsService.getOverviewStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return '0';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Row gutter={16}>
      <Col xs={24} sm={8}>
        <Card>
          <Statistic
            title="Doanh thu hôm nay"
            value={stats?.todayRevenue}
            formatter={formatCurrency}
            prefix={<ArrowUpOutlined className="text-green-500" />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card>
          <Statistic
            title="Doanh thu tuần này"
            value={stats?.weekRevenue}
            formatter={formatCurrency}
            prefix={<ArrowUpOutlined className="text-green-500" />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card>
          <Statistic
            title="Doanh thu tháng này"
            value={stats?.monthRevenue}
            formatter={formatCurrency}
            prefix={<ArrowUpOutlined className="text-green-500" />}
          />
        </Card>
      </Col>
    </Row>
  );
}

export default OverviewStats; 