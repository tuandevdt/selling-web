import { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Card,
  Form,
  Input,
  Select,
  Avatar,
  Tag,
  Tooltip
} from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
  DeleteOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  useSearchUsersQuery,
  useUpdateUserMutation,
  useLockUserMutation,
  useUnlockUserMutation,
  useDeleteUserMutation
} from '../../../services/user.service';
import UserForm from './UserForm';
import { App } from 'antd'

const { Option } = Select;

// Delete User Modal Component
const DeleteUserModal = ({ open, onCancel, onConfirm, isLoading }) => {
  return (
    <Modal
      title="Xác nhận xóa người dùng"
      open={open}
      onCancel={onCancel}
      confirmLoading={isLoading}
      okText="Xóa"
      cancelText="Hủy"
      okType="danger"
      onOk={onConfirm}
    >
      <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
    </Modal>
  );
};

// Lock User Modal Component
const LockUserModal = ({ open, onCancel, onConfirm, isLoading }) => {
  return (
    <Modal
      title="Xác nhận khóa người dùng"
      open={open}
      onCancel={onCancel}
      confirmLoading={isLoading}
      okText="Khóa"
      cancelText="Hủy"
      okType="warning"
      onOk={onConfirm}
    >
      <p>Bạn có chắc chắn muốn khóa người dùng này?</p>
    </Modal>
  );
};

// Unlock User Modal Component
const UnlockUserModal = ({ open, onCancel, onConfirm, isLoading }) => {
  return (
    <Modal
      title="Xác nhận mở khóa người dùng"
      open={open}
      onCancel={onCancel}
      confirmLoading={isLoading}
      okText="Mở khóa"
      cancelText="Hủy"
      onOk={onConfirm}
      okButtonProps={{
        className: "bg-green-600 hover:bg-green-700",
        type: "primary"
      }}
    >
      <p>Bạn có chắc chắn muốn mở khóa người dùng này?</p>
    </Modal>
  );
};

export default function ManagerUser() {
      const { message } = App.useApp();

  // States
  const [searchForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    filters: {},
  });

  // RTK Query hooks
  const { data, isLoading, isFetching } = useSearchUsersQuery({
    page: tableParams.pagination.current - 1,
    size: tableParams.pagination.pageSize,
    ...tableParams.filters,
  });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [lockUser, { isLoading: isLocking }] = useLockUserMutation();
  const [unlockUser, { isLoading: isUnlocking }] = useUnlockUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

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
        phone: values.phone || undefined,
        email: values.email || undefined,
        fullname: values.fullname || undefined,
        address: values.address || undefined,
        isActive: values.status || undefined,
      },
    }));
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSave = async (formData) => {
    try {
      await updateUser({
        id: selectedUser.id,
        formData,
      }).unwrap();
      message.success('Cập nhật người dùng thành công');
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
      message.error(error.data?.message || 'Đã có lỗi xảy ra khi cập nhật người dùng');
    }
  };

  const handleLockClick = (user) => {
    setSelectedUser(user);
    setIsLockModalOpen(true);
  };

  const handleLockCancel = () => {
    setIsLockModalOpen(false);
    setSelectedUser(null);
  };

  const handleLockConfirm = async () => {
    try {
      const data = await lockUser(selectedUser.email).unwrap();      
      message.success('Đã khóa người dùng thành công');
      setIsLockModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      message.error('Không thể khóa người dùng');
    }
  };

  const handleUnlockClick = (user) => {
    setSelectedUser(user);
    setIsUnlockModalOpen(true);
  };

  const handleUnlockCancel = () => {
    setIsUnlockModalOpen(false);
    setSelectedUser(null);
  };

  const handleUnlockConfirm = async () => {
    try {
      const data = await unlockUser(selectedUser.email).unwrap();      
      message.success('Đã mở khóa người dùng thành công');
      setIsUnlockModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      message.error('Không thể mở khóa người dùng');
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(selectedUser.email).unwrap();
      message.success('Đã xóa người dùng thành công');
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      message.error('Không thể xóa người dùng');
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Người dùng',
      dataIndex: 'fullname',
      width: '25%',
      render: (fullname, record) => (
        <div className="flex items-center">
          <Avatar
            src={record.avatar}
            icon={<UserOutlined />}
            className="mr-3 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="font-medium truncate">{fullname}</div>
            <div className="text-gray-500 text-sm truncate">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      width: '15%',
      render: (phone) => (
        <div className="truncate">{phone || '-'}</div>
      ),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      width: '25%',
      render: (address) => (
        <Tooltip title={address}>
          <div className="truncate">{address || '-'}</div>
        </Tooltip>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'active',
      width: '15%',
      render: (active) => (
        <Tag color={active ? 'success' : 'error'}>
          {active ? 'Hoạt động' : 'Đã khóa'}
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
          {record.active ? (
            <Tooltip title="Khóa">
              <Button
                type="link"
                icon={<LockOutlined />}
                onClick={() => handleLockClick(record)}
                className="text-yellow-600 hover:text-yellow-700"
              />
            </Tooltip>
          ) : (
            <Tooltip title="Mở khóa">
              <Button
                type="primary"
                icon={<UnlockOutlined />}
                onClick={() => handleUnlockClick(record)}
                className="!bg-green-600 hover:!bg-green-700 border-none"
              />
            </Tooltip>
          )}
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
      <Card title="Quản lý người dùng" className="mb-4">
        <Form
          form={searchForm}
          layout="vertical"
          onFinish={handleSearch}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Form.Item name="fullname" label="Tên người dùng">
            <Input placeholder="Nhập tên người dùng" />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item name="phone" label="Số điện thoại">
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item name="status" label="Trạng thái">
            <Select allowClear placeholder="Chọn trạng thái">
              <Option value={true}>Hoạt động</Option>
              <Option value={false}>Đã khóa</Option>
            </Select>
          </Form.Item>

          <Form.Item name="address" label="Địa chỉ" className="md:col-span-3">
            <Input placeholder="Nhập địa chỉ" />
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
                showTotal: (total) => `Tổng ${total} người dùng`,
              }}
              onChange={handleTableChange}
              scroll={{ x: 'max-content' }}
              className="min-w-full"
            />
          </div>
        </div>
      </Card>

      <Modal
        title="Chỉnh sửa thông tin người dùng"
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={null}
        width={720}
      >
        <UserForm
          initialValues={selectedUser}
          onSubmit={handleSave}
          onCancel={handleModalCancel}
          isLoading={isUpdating}
        />
      </Modal>

      <DeleteUserModal
        open={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />

      <LockUserModal
        open={isLockModalOpen}
        onCancel={handleLockCancel}
        onConfirm={handleLockConfirm}
        isLoading={isLocking}
      />

      <UnlockUserModal
        open={isUnlockModalOpen}
        onCancel={handleUnlockCancel}
        onConfirm={handleUnlockConfirm}
        isLoading={isUnlocking}
      />
    </div>
  );
}
