import { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Card,
  Form,
  Tag,
  Tooltip,
  Typography
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { 
  useGetActivePromotionsQuery,
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
  useSoftDeletePromotionMutation
} from '../../../services/promotion.service';
import { useGetCategoriesQuery } from '../../../services/category.service';
import PromotionForm from './PromotionForm';
import { App } from 'antd';
import dayjs from 'dayjs';

const { Text } = Typography;

// Delete Promotion Modal Component
const DeletePromotionModal = ({ open, onCancel, onConfirm, isLoading }) => {
  return (
    <Modal
      title="Xác nhận xóa khuyến mãi"
      open={open}
      onCancel={onCancel}
      confirmLoading={isLoading}
      okText="Xóa"
      cancelText="Hủy"
      okType="danger"
      okButtonProps={{
        className: "bg-red-500 hover:bg-red-600"
      }}
      onOk={onConfirm}
    >
      <p>Bạn có chắc chắn muốn xóa khuyến mãi này?</p>
    </Modal>
  );
};

export default function ManagePromotions() {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  // RTK Query hooks
  const { data: promotions, isLoading } = useGetActivePromotionsQuery();
  const {data: categories, isLoading: isLoadingCategories} = useGetCategoriesQuery();
  const [createPromotion, { isLoading: isCreating }] = useCreatePromotionMutation();
  const [updatePromotion, { isLoading: isUpdating }] = useUpdatePromotionMutation();
  const [deletePromotion, { isLoading: isDeleting }] = useSoftDeletePromotionMutation();
    
  // Handlers
  const handleAdd = () => {
    form.resetFields();
    setSelectedPromotion(null);
    setIsModalOpen(true);
  };

  const handleEdit = (promotion) => {
    setSelectedPromotion(promotion);
    form.setFieldsValue({
      ...promotion,
      date_range: [
        dayjs(promotion.start_date, 'HH:mm DD/MM/YYYY'),
        dayjs(promotion.end_date, 'HH:mm DD/MM/YYYY')
      ]
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (promotion) => {
    setSelectedPromotion(promotion);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedPromotion(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deletePromotion(selectedPromotion.id).unwrap();
      message.success('Đã xóa khuyến mãi thành công');
      setIsDeleteModalOpen(false);
      setSelectedPromotion(null);
    } catch (error) {
      message.error('Không thể xóa khuyến mãi');
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedPromotion(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (selectedPromotion) {
        await updatePromotion({
          id: selectedPromotion.id,
          data: values
        }).unwrap();
        message.success('Cập nhật khuyến mãi thành công');
      } else {
        await createPromotion(values).unwrap();
        message.success('Tạo khuyến mãi thành công');
      }
      setIsModalOpen(false);
      setSelectedPromotion(null);
      form.resetFields();
    } catch (error) {
      message.error(
        error.data?.message || 
        'Đã có lỗi xảy ra khi ' + (selectedPromotion ? 'cập nhật' : 'tạo') + ' khuyến mãi'
      );
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'code',
      width: '10%',
      render: (code) => <Text className="font-medium">{code}</Text>
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      width: '20%',
      render: (title, record) => (
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-gray-500 text-sm truncate">{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount_value',
      width: '10%',
      render: (value) => <Text>{(value * 100).toFixed(0)}%</Text>
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'start_date',
      width: '15%',
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'end_date',
      width: '15%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_active',
      width: '10%',
      render: (isActive) => (
        <Tag color={isActive ? 'success' : 'error'}>
          {isActive ? 'Đang hoạt động' : 'Đã dừng'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: '20%',
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              className="text-indigo-600 hover:text-indigo-700"
            />
          </Tooltip>
          <Tooltip title="Xóa">
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
      <Card 
        title="Quản lý khuyến mãi"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Thêm khuyến mãi
          </Button>
        }
      >
        <div className="overflow-x-auto">
          <div className={`relative ${isLoading ? 'opacity-60' : ''}`}>
            <Table
              columns={columns}
              dataSource={promotions}
              loading={isLoading}
              scroll={{ x: 'max-content' }}
              className="min-w-full"
            />
          </div>
        </div>
      </Card>

      <Modal
        title={selectedPromotion ? "Chỉnh sửa khuyến mãi" : "Thêm khuyến mãi mới"}
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={null}
        width={720}
      >
        <PromotionForm
          form={form}
          initialValues={selectedPromotion}
          onFinish={handleSubmit}
          onCancel={handleModalCancel}
          isLoading={isCreating || isUpdating}
          categories={categories}
        />
      </Modal>

      <DeletePromotionModal
        open={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
}
