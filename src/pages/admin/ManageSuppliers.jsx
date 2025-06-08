import { useState } from 'react';
import { Table, Button, Space, Modal, message, Card, Form, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} from '../../services/category.service';

const { confirm } = Modal;

function ManageSuppliers() {
  // RTK Query hooks
  const { data: categories, isLoading, isError, error, refetch } = useGetCategoriesQuery();
  categories
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  
  // State cho form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();
  
  // Mở modal thêm/sửa danh mục
  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      form.setFieldsValue({
        name: category.name,
        description: category.description || '',
        slug: category.slug
      });
    } else {
      setEditingCategory(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };
  
  // Đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    form.resetFields();
  };
  
  // Tự động tạo slug từ tên
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };
  
  // Lưu danh mục
  const handleSaveCategory = async (values) => {
    try {
      if (editingCategory) {
        await updateCategory({ id: editingCategory.id, categoryData: values }).unwrap();
        message.success('Cập nhật danh mục thành công');
      } else {
        await createCategory(values).unwrap();
        message.success('Tạo danh mục thành công');
      }
      closeModal();
      refetch();
    } catch (error) {
      console.error('Error saving category:', error);
      message.error(error.data?.message || 'Đã có lỗi xảy ra khi lưu danh mục');
    }
  };
  
  // Xác nhận xóa danh mục
  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa danh mục này?',
      icon: <ExclamationCircleOutlined />,
      content: 'Hành động này không thể hoàn tác.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await deleteCategory(id).unwrap();
          message.success('Đã xóa danh mục thành công');
          refetch();
        } catch (error) {
          console.error('Error deleting category:', error);
          message.error(error.data?.message || 'Đã có lỗi xảy ra khi xóa danh mục');
        }
      },
    });
  };
  
  // Columns cho Table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      render: (text) => text || '-',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => openModal(record)}
            loading={isUpdating && editingCategory?.id === record.id}
          >
            Sửa
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record.id)}
            loading={isDeleting}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
        <p className="font-bold">Lỗi</p>
        <p>{error?.data?.message || 'Không thể tải danh mục'}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card 
        title="Quản lý danh mục"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => openModal()}
            loading={isCreating}
          >
            Thêm danh mục
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={categories}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} danh mục`,
          }}
        />
      </Card>

      <Modal
        title={editingCategory ? 'Sửa danh mục' : 'Thêm danh mục mới'}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveCategory}
          initialValues={{ name: '', description: '', slug: '' }}
        >
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
          >
            <Input 
              onChange={(e) => {
                const slug = generateSlug(e.target.value);
                form.setFieldsValue({ slug });
              }}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="slug"
            label="Slug"
            rules={[{ required: true, message: 'Vui lòng nhập slug' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Space>
              <Button onClick={closeModal}>
                Hủy
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                loading={isCreating || isUpdating}
              >
                {editingCategory ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageSuppliers; 