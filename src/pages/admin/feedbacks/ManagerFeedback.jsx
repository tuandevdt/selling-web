import { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  message,
  Card,
  Form,
  Input,
  Rate,
  Tag,
  Tooltip,
  Typography
} from 'antd';
import {
  SearchOutlined,
  DeleteOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useGetFeedbacksQuery, useDisableFeedbackMutation } from '../../../services/feedback.service';

const { Text } = Typography;

// Delete Feedback Modal Component
const DeleteFeedbackModal = ({ open, onCancel, onConfirm, isLoading }) => {
  return (
    <Modal
      title="Xác nhận ẩn đánh giá"
      open={open}
      onCancel={onCancel}
      confirmLoading={isLoading}
      okText="Ẩn"
      cancelText="Hủy"
      okType="danger"
      onOk={onConfirm}
    >
      <p>Bạn có chắc chắn muốn ẩn đánh giá này?</p>
    </Modal>
  );
};

export default function ManagerFeedback() {
  // States
  const [searchForm] = Form.useForm();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    filters: {},
  });

  // RTK Query hooks
  const { data, isLoading, isFetching } = useGetFeedbacksQuery({
    page: tableParams.pagination.current - 1,
    size: tableParams.pagination.pageSize,
    ...tableParams.filters,
  });

  const [disableFeedback, { isLoading: isDeleting }] = useDisableFeedbackMutation();

  // Handlers
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters: {
        ...tableParams.filters,
      },
    });
  };

  const handleSearch = (values) => {
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
      },
      filters: {
        product_id: values.productId || undefined,
        user_id: values.userId || undefined,
        comment: values.comment || undefined,
      },
    }));
  };

  const handleDeleteClick = (feedback) => {
    setSelectedFeedback(feedback);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedFeedback(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await disableFeedback(selectedFeedback.id).unwrap();
      message.success('Đã ẩn đánh giá thành công');
      setIsDeleteModalOpen(false);
      setSelectedFeedback(null);
    } catch (error) {
      message.error('Không thể ẩn đánh giá');
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Người dùng',
      dataIndex: 'userId',
      width: '15%',
      render: (userId) => (
        <div className="truncate">{userId}</div>
      ),
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productId',
      width: '15%',
      render: (productId) => (
        <div className="truncate">{productId}</div>
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      width: '15%',
      render: (rating) => (
        <Rate disabled defaultValue={rating} />
      ),
    },
    {
      title: 'Bình luận',
      dataIndex: 'comment',
      width: '35%',
      render: (comment) => (
        <Tooltip title={comment}>
          <div className="truncate">{comment || '-'}</div>
        </Tooltip>
      ),
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdAt',
      width: '15%',
      render: (createdAt) => (
        <Text>{new Date(createdAt).toLocaleString('vi-VN')}</Text>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: '5%',
      render: (_, record) => (
        <Space>
          <Tooltip title="Ẩn đánh giá">
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteClick(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card title="Quản lý đánh giá" className="mb-4">
        <Form
          form={searchForm}
          layout="vertical"
          onFinish={handleSearch}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Form.Item name="productId" label="Mã sản phẩm">
            <Input placeholder="Nhập mã sản phẩm" />
          </Form.Item>

          <Form.Item name="userId" label="Mã người dùng">
            <Input placeholder="Nhập mã người dùng" />
          </Form.Item>

          <Form.Item name="comment" label="Nội dung">
            <Input placeholder="Tìm kiếm trong nội dung" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                htmlType="submit"
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Tìm kiếm
              </Button>
              <Button
                onClick={() => {
                  searchForm.resetFields();
                  handleSearch({});
                }}
              >
                Đặt lại
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card bodyStyle={{ padding: 0 }}>
        <div className="overflow-x-auto">
          <div className={`relative ${(isLoading || isFetching) ? 'opacity-60' : ''}`}>
            <Table
              columns={columns}
              dataSource={data?.content}
              loading={isLoading}
              pagination={{
                ...tableParams.pagination,
                total: data?.totalElements,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Tổng ${total} đánh giá`,
              }}
              onChange={handleTableChange}
              scroll={{ x: 'max-content' }}
              className="min-w-full"
            />
          </div>
        </div>
      </Card>

      <DeleteFeedbackModal
        open={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
} 