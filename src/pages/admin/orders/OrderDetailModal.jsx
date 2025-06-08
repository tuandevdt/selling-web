import { Modal, Descriptions, Table } from 'antd';
import dayjs from 'dayjs';

function OrderDetailModal({ open, onClose, orderData }) {
  if (!orderData) return null;
  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image_url',
      width: 100,
      render: (image) => image ? <img src={image} alt="product" className="w-16 h-16 object-cover" /> : '-',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product_item_id',
      width: 200,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      width: 100,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      width: 120,
      render: (price) =>
        price
          ? (price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          : '-',
    },
    {
      title: 'Thành tiền',
      width: 120,
      render: (_, record) => {
        const total = record.price * record.quantity;
        return total
          ? (total).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          : '-';
      },
    },
  ];

  return (
    <Modal
      title="Chi tiết đơn hàng"
      open={open}
      onCancel={onClose}
      width={1000}
      footer={null}
    >
      <div className="space-y-6">
        <Descriptions title="Thông tin đơn hàng" bordered>
          <Descriptions.Item label="Mã đơn hàng">{orderData.code}</Descriptions.Item>
          <Descriptions.Item label="Ngày đặt">
            {dayjs(orderData.order_date).format('DD/MM/YYYY HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">{orderData.status}</Descriptions.Item>
          <Descriptions.Item label="Phương thức thanh toán">{orderData.payment_method}</Descriptions.Item>
        </Descriptions>

        <Descriptions title="Thông tin khách hàng" bordered>
          <Descriptions.Item label="Tên khách hàng">{orderData.user_name}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{orderData.phone || '-'}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{orderData.address || '-'}</Descriptions.Item>
          <Descriptions.Item label="Email">{orderData.email || '-'}</Descriptions.Item>
        </Descriptions>

        <div>
          <h3 className="font-medium mb-4">Chi tiết sản phẩm</h3>
          <Table
            columns={columns}
            dataSource={orderData.orderItems || []}
            pagination={false}
            rowKey="product_item_id"
          />
          <div className="text-right mt-4 text-lg font-medium">
            Tổng tiền: {(orderData.total_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default OrderDetailModal; 