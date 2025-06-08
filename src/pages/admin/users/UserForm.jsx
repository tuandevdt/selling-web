import { Form, Input, Button, Upload, Space, Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UserForm = ({ initialValues, onSubmit, onCancel, isLoading }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    const userRequest = {
      fullname: values.fullname,
      phone: values.phone,
      address: values.address,
      isActive: values.isActive
    };
    
    formData.append('userRequest', new Blob([JSON.stringify(userRequest)], { type: 'application/json' }));
    
    if (values.avatar?.[0]?.originFileObj) {
      formData.append('multipartFile', values.avatar[0].originFileObj);
    }
    
    await onSubmit(formData);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        fullname: initialValues?.fullname || '',
        email: initialValues?.email || '',
        phone: initialValues?.phone || '',
        address: initialValues?.address || '',
        isActive: initialValues?.isActive ?? true,
        avatar: initialValues?.avatar ? [{ url: initialValues.avatar }] : []
      }}
    >
      <Form.Item
        name="fullname"
        label="Họ và tên"
        rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[
          { required: true, message: 'Vui lòng nhập số điện thoại' },
          { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Địa chỉ"
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item
        name="avatar"
        label="Ảnh đại diện"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          accept="image/*"
          listType="picture"
          maxCount={1}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="isActive"
        label="Trạng thái"
        valuePropName="checked"
      >
        <Switch checkedChildren="Hoạt động" unCheckedChildren="Khóa" />
      </Form.Item>

      <Form.Item className="mb-0 text-right">
        <Space>
          <Button onClick={onCancel}>
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Lưu
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UserForm; 