import React from 'react';
import { useGetUserOrdersQuery } from '../../services/order.service';
import { Card, Table, Tag, Typography, Space, Image, Button, Descriptions } from 'antd';
import { formatCurrency } from '../../utils/format';
import { authService } from '../../services/authService';
import { DownOutlined, UpOutlined, ShoppingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const getStatusColor = (status) => {
  const colors = {
    PENDING: 'gold',
    PROCESSING: 'blue',
    COMPLETED: 'green',
    CANCELLED: 'red',
  };
  return colors[status] || 'default';
};

const OrderDetails = ({ order }) => {
  return (
    <div style={{ padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Descriptions title="Thông tin đơn hàng" bordered column={2}>
          <Descriptions.Item label="Mã đơn hàng">{order.code}</Descriptions.Item>
          <Descriptions.Item label="Ngày đặt">{order.order_date}</Descriptions.Item>
          <Descriptions.Item label="Khách hàng">{order.user_name}</Descriptions.Item>
          <Descriptions.Item label="Phương thức thanh toán">
            <Tag color="blue">{order.payment_method.toUpperCase()}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Tổng tiền">{formatCurrency(order.total_price)}</Descriptions.Item>
          <Descriptions.Item label="Giá cuối">{formatCurrency(order.final_price)}</Descriptions.Item>
        </Descriptions>

        <div>
          <Title level={5}>Sản phẩm trong đơn hàng</Title>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            {order.orderItems.map((item) => (
              <Card 
                key={item.id} 
                size="small" 
                style={{ 
                  background: '#fff',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Image
                    src={item.image_url}
                    alt={item.product_item_id}
                    width={80}
                    height={80}
                    style={{ objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <Text strong style={{ fontSize: '16px' }}>{item.product_item_id}</Text>
                    <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text type="secondary">Số lượng: {item.quantity}</Text>
                      <Text type="success" strong>{formatCurrency(item.price)}</Text>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Space>
    </div>
  );
};

export default function OrderPage() {
  const user = authService.getUser();
  const userId = user?.id;
  const { data: orderResponse, isLoading } = useGetUserOrdersQuery(userId);

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'code',
      key: 'code',
      render: (code) => <Text strong>{code}</Text>,
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'order_date',
      key: 'order_date',
      render: (date) => <Text>{date}</Text>,
    },
    {
      title: 'Tổng sản phẩm',
      dataIndex: 'orderItems',
      key: 'totalItems',
      render: (items) => <Text>{items.length} sản phẩm</Text>,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (price) => <Text type="success" strong>{formatCurrency(price)}</Text>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: 'Thanh toán',
      dataIndex: 'payment_method',
      key: 'payment_method',
      render: (method) => <Tag color="blue">{method.toUpperCase()}</Tag>,
    },
  ];

  const orders = orderResponse?.body?.data?.content || [];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShoppingOutlined style={{ fontSize: '24px' }} />
          <Title level={2} style={{ margin: 0 }}>Đơn hàng của tôi</Title>
        </div>
        
        <Card>
          <Table
            columns={columns}
            dataSource={orders}
            rowKey="id"
            loading={isLoading}
            expandable={{
              expandedRowRender: (record) => <OrderDetails order={record} />,
              expandIcon: ({ expanded, onExpand, record }) =>
                expanded ? (
                  <Button 
                    icon={<UpOutlined />} 
                    onClick={e => onExpand(record, e)}
                    type="link"
                    size="small"
                  >
                    Thu gọn
                  </Button>
                ) : (
                  <Button 
                    icon={<DownOutlined />} 
                    onClick={e => onExpand(record, e)}
                    type="link"
                    size="small"
                  >
                    Xem chi tiết
                  </Button>
                ),
            }}
            pagination={{
              total: orderResponse?.body?.data?.totalElements,
              pageSize: orderResponse?.body?.data?.pageable?.pageSize,
              current: orderResponse?.body?.data?.pageable?.pageNumber + 1,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} đơn hàng`,
            }}
          />
        </Card>
      </Space>
    </div>
  );
}
