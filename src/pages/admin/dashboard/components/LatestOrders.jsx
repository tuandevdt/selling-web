import { Card, Table, Spin, Button } from 'antd';
import { useMemo } from 'react';
import { useGetLatestOrdersQuery } from '../../../../services/order.service';
import dayjs from 'dayjs';
import { getOrderStatusInfo } from '../../orders/UpdateStatusModal';
import { useNavigate } from 'react-router-dom';

function LatestOrders() {
  const { data, isLoading, isFetching } = useGetLatestOrdersQuery();
  const navigate = useNavigate();

  // Mapping dữ liệu với useMemo
  const orders = useMemo(() => {
    return Array.isArray(data?.content) ? data.content : [];
  }, [data]);

  // Định nghĩa cột bảng với useMemo
  const columns = useMemo(() => [
    {
      title: 'Mã đơn',
      dataIndex: 'code',
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'user_name',
      width: '25%',
      ellipsis: true,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_price',
      width: '20%',
      ellipsis: true,
      render: (amount) =>
        amount
          ? amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          : '-',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: '15%',
      ellipsis: true,
      render: (status) => {
        const statusInfo = getOrderStatusInfo(status);
        return (
          <span className={`px-2 py-1 rounded bg-${statusInfo.color}-100 text-${statusInfo.color}-800`}>
            {statusInfo.label}
          </span>
        );
      },
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'order_date',
      width: '20%',
      ellipsis: true,
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY HH:mm') : '-',
    }
  ], []);

  const handleViewAll = () => {
    navigate('/admin/orders');
  };

  return (
    <Card 
      title="Đơn hàng mới nhất"
      extra={
        <Button type="link" onClick={handleViewAll}>
          Xem tất cả
        </Button>
      }
    >
      <Spin spinning={isLoading || isFetching}>
        <Table
          dataSource={orders}
          columns={columns}
          pagination={false}
          rowKey={record => record.id || record.code}
          size="small"
        />
      </Spin>
    </Card>
  );
}

export default LatestOrders; 