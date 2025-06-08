import { useState, useMemo } from 'react';
import { Table, Button, Card, Form, Input, DatePicker, Spin, Space, Row, Col } from 'antd';
import { EyeOutlined, EditOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useGetOrdersQuery } from '../../../services/order.service';
import dayjs from 'dayjs';
import OrderDetailModal from './OrderDetailModal';
import UpdateStatusModal, { getOrderStatusInfo } from './UpdateStatusModal';

const { RangePicker } = DatePicker;

function ManageOrders() {
  const [searchForm] = Form.useForm();
  const [params, setParams] = useState({
    page: 0,
    size: 10,
  });

  // State cho modals
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  // Gọi API lấy danh sách đơn hàng
  const { data, isLoading, isFetching, isError, error, refetch } = useGetOrdersQuery(params);

  // Reset form
  const handleReset = () => {
    searchForm.resetFields();
    setParams({
      page: 0,
      size: 10,
    });
  };

  // Xử lý submit form tìm kiếm
  const handleSearch = (values) => {
    const searchParams = {
      ...params,
      page: 0,
      keyword: values.keyword?.trim(),
      fullName: values.fullName?.trim(),
      productName: values.productName?.trim(),
      orderCode: values.orderCode?.trim(),
    };

    if (values.dateRange?.length === 2) {
      searchParams.startDateTime = dayjs(values.dateRange[0]).format('YYYY-MM-DDTHH:mm:ss');
      searchParams.endDateTime = dayjs(values.dateRange[1]).format('YYYY-MM-DDTHH:mm:ss');
    }

    // Loại bỏ các params undefined/null/empty string
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key] === undefined || searchParams[key] === null || searchParams[key] === '') {
        delete searchParams[key];
      }
    });

    setParams(searchParams);
  };

  // Xử lý chuyển trang
  const handleTableChange = (pagination) => {
    setParams(prev => ({
      ...prev,
      page: pagination.current - 1,
      size: pagination.pageSize,
    }));
  };

  // Mapping dữ liệu với useMemo
  const orders = useMemo(() => {
    return Array.isArray(data?.content) ? data.content : [];
  }, [data]);

  const total = useMemo(() => data?.totalElements, [data]);

  // Định nghĩa cột bảng với useMemo
  const columns = useMemo(() => [
    {
      title: 'Mã đơn',
      dataIndex: 'code',
      width: '10%',
      ellipsis: true,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'user_name',
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_price',
      width: '15%',
      ellipsis: true,
      render: (amount) =>
        amount
          ? (amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          : '-',
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'order_date',
      width: '15%',
      ellipsis: true,
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY HH:mm') : '-',
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
      title: 'Phương thức',
      dataIndex: 'payment_method',
      width: '15%',
      ellipsis: true,
      render: (method) => (
        <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
          {method === 'cod' ? 'Thanh toán khi nhận hàng' : method}
        </span>
      )
    },
    {
      title: 'Thao tác',
      width: '10%',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedOrder(record);
              setDetailModalOpen(true);
            }}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedOrder(record);
              setStatusModalOpen(true);
            }}
          />
        </Space>
      ),
    }
  ], []);

  // Error state
  if (isError) {
    return (
      <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
        <p className="font-bold">Lỗi</p>
        <p>{error?.data?.message || 'Không thể tải đơn hàng'}</p>
        <Button onClick={refetch} type="primary" className="mt-2">Thử lại</Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card title="Quản lý đơn hàng" className="mb-4">
        <Form
          form={searchForm}
          onFinish={handleSearch}
          className="bg-white p-4 rounded-lg"
        >
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="keyword" label="Từ khóa tìm kiếm">
                <Input 
                  placeholder="Tìm kiếm..." 
                  allowClear
                  prefix={<SearchOutlined className="text-gray-400" />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="orderCode" label="Mã đơn hàng">
                <Input placeholder="Nhập mã đơn" allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="fullName" label="Tên khách hàng">
                <Input placeholder="Nhập tên khách hàng" allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="productName" label="Tên sản phẩm">
                <Input placeholder="Nhập tên sản phẩm" allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8}>
              <Form.Item name="dateRange" label="Khoảng thời gian">
                <RangePicker 
                  showTime 
                  format="DD/MM/YYYY HH:mm"
                  className="w-full"
                  placeholder={['Từ ngày', 'Đến ngày']}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={16} className="flex items-end justify-end">
              <Space>
                <Button onClick={handleReset} icon={<ReloadOutlined />}>
                  Đặt lại
                </Button>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                  Tìm kiếm
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card>
        <Spin spinning={isLoading || isFetching}>
          <Table
            columns={columns}
            dataSource={orders}
            rowKey={record => record.id || record.code}
            pagination={{
              current: params.page + 1,
              pageSize: params.size,
              total,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} đơn hàng`,
            }}
            onChange={handleTableChange}
            scroll={{ x: { sm: 1200 } }}
          />
        </Spin>
      </Card>

      <OrderDetailModal
        open={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
          setSelectedOrder(null);
        }}
        orderData={selectedOrder}
      />

      <UpdateStatusModal
        open={statusModalOpen}
        onClose={() => {
          setStatusModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
        onSuccess={refetch}
      />
    </div>
  );
}

export default ManageOrders;