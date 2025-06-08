import React, { useState, useEffect } from 'react';
import { Card, Tabs, Form, Input, Button, message, Upload, Spin } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, HomeOutlined, UploadOutlined } from '@ant-design/icons';
import { authService } from '../../../services/authService';
import { useGetUserbyEmailQuery, useUpdateUserMutation } from '../../../services/user.service';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('1');
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const user = authService.getUser();
  
  const { data: userData, isLoading, refetch } = useGetUserbyEmailQuery(user.email, {
    skip: !user.email,
  });
  const [updateUser] = useUpdateUserMutation();
  
  // Khởi tạo form với dữ liệu user từ API
  useEffect(() => {
    if (userData?.body?.data) {
      const currentUser = userData.body.data;
      form.setFieldsValue({
        fullname: currentUser.fullname,
        email: currentUser.email,
        phoneNumber: currentUser.phone,
        address: currentUser.address,
      });
      if (currentUser.image_url) {
        setImageUrl(currentUser.image_url);
        setFileList([
          {
            uid: '-1',
            name: 'avatar.png',
            status: 'done',
            url: currentUser.image_url,
          },
        ]);
      }
    }
  }, [userData, form]);

  // Cleanup URLs khi component unmount
  useEffect(() => {
    return () => {
      fileList.forEach(file => {
        if (file.url && file.url.startsWith('blob:')) {
          URL.revokeObjectURL(file.url);
        }
      });
    };
  }, [fileList]);

  const handleUpdateProfile = async (values) => {
    try {
      setUploading(true);
      
      const formData = new FormData();
      const userRequest = {
        fullname: values.fullname,
        email: values.email,
        phone: values.phoneNumber,
        address: values.address,
      };
      
      formData.append('userRequest', new Blob([JSON.stringify(userRequest)], {
        type: 'application/json'
      }));

      if (fileList[0]?.originFileObj) {
        formData.append('multipartFile', fileList[0].originFileObj);
      }

      const result = await updateUser({
        id: userData.body.data.id,
        formData
      }).unwrap();
      
      // Cập nhật lại data từ API
      await refetch();

      message.success('Cập nhật thông tin thành công!');
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error(error.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin!');
    } finally {
      setUploading(false);
    }
  };

  const handleChangePassword = async (values) => {
    try {
      // TODO: Implement change password API call
      message.success('Đổi mật khẩu thành công!');
      form.resetFields(['oldPassword', 'newPassword', 'confirmPassword']);
    } catch (error) {
      message.error('Có lỗi xảy ra khi đổi mật khẩu!');
    }
  };

  const uploadProps = {
    onRemove: () => {
      setFileList([]);
      setImageUrl('');
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Bạn chỉ có thể tải lên file ảnh!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Ảnh phải nhỏ hơn 2MB!');
        return false;
      }

      // Tạo URL tạm thời để preview ảnh
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
      setFileList([
        {
          uid: '-1',
          name: file.name,
          status: 'done',
          url: previewUrl,
          originFileObj: file
        }
      ]);
      return false;
    },
    fileList,
  };

  const items = [
    {
      key: '1',
      label: 'Thông tin cá nhân',
      children: (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
          className="max-w-lg"
        >
          <div className="mb-6">
            <Upload
              {...uploadProps}
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={true}
            >
              {fileList.length >= 1 ? null : (
                <div className="flex flex-col items-center justify-center">
                  <UploadOutlined />
                  <div className="mt-2">Tải ảnh lên</div>
                </div>
              )}
            </Upload>
          </div>

          <Form.Item
            label="Họ và tên"
            name="fullname"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input 
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Nhập họ và tên"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Nhập email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
            ]}
          >
            <Input 
              prefix={<PhoneOutlined className="text-gray-400" />}
              placeholder="Nhập số điện thoại"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input.TextArea 
              placeholder="Nhập địa chỉ"
              size="large"
              rows={3}
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              size="large"
              className="bg-blue-600 hover:bg-blue-700"
              loading={uploading}
            >
              Cập nhật thông tin
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '2',
      label: 'Đổi mật khẩu',
      children: (
        <Form
          layout="vertical"
          onFinish={handleChangePassword}
          className="max-w-lg"
        >
          <Form.Item
            label="Mật khẩu hiện tại"
            name="oldPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Nhập mật khẩu hiện tại"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Nhập mật khẩu mới"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Xác nhận mật khẩu mới"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              size="large"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const currentUser = userData?.body?.data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Thông tin tài khoản</h1>
        <p className="text-gray-600 mt-1">
          Quản lý thông tin cá nhân và bảo mật tài khoản của bạn
        </p>
      </div>

      <Card>
        <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {currentUser?.fullname?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-semibold text-gray-900">{currentUser?.fullname}</h2>
            <p className="text-gray-600">{currentUser?.email}</p>
            <div className="mt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                {currentUser?.role}
              </span>
            </div>
          </div>
        </div>

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={items}
          className="profile-tabs"
        />
      </Card>
    </div>
  );
}
