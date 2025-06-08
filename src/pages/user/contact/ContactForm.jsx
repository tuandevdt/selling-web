import React from 'react';
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

export default function ContactForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
    // Xử lý gửi form ở đây
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Góp ý từ Khách hàng</h3>
      <p className="text-gray-600 mb-6">
        Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp từ khách hàng để có thể nâng cấp trải nghiệm ngày một tốt hơn.
      </p>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          <Input placeholder="Họ và tên *" size="large" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input placeholder="Email *" size="large" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
          <Input placeholder="Số điện thoại *" size="large" />
        </Form.Item>

        <Form.Item
          name="message"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
        >
          <TextArea 
            placeholder="Nội dung *" 
            rows={4}
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit"
            size="large"
            className="bg-blue-600 hover:bg-blue-700 w-full"
          >
            Gửi liên hệ
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
