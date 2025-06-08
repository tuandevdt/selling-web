import { Modal, Form, Select, message } from 'antd';
import { useUpdateOrderStatusMutation } from '../../../services/order.service';
import { useEffect } from 'react';

const orderStatuses = [
  { value: 'PENDING', label: 'Chờ xử lý', color: 'orange' },
  { value: 'PROCESSING', label: 'Đang xử lý', color: 'blue' },
  { value: 'SHIPPED', label: 'Đã giao hàng', color: 'green' },
  { value: 'CANCELLED', label: 'Đã hủy', color: 'red' }
];

// Map status hiển thị
export const getOrderStatusInfo = (status) => {
  const statusInfo = orderStatuses.find(s => s.value === status) || {
    value: status,
    label: 'Không xác định',
    color: 'gray'
  };
  return statusInfo;
};

function UpdateStatusModal({ open, onClose, order, onSuccess }) {
  const [form] = Form.useForm();
  const [updateStatus, { isLoading }] = useUpdateOrderStatusMutation();

  // Reset form với status hiện tại mỗi khi order thay đổi
  useEffect(() => {
    if (order) {
      form.setFieldsValue({
        status: order.status
      });
    }
  }, [order, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await updateStatus({
        orderId: order.id,
        status: values.status // Gửi enum string trực tiếp lên API
      }).unwrap();
      
      message.success('Cập nhật trạng thái thành công');
      onSuccess?.();
      onClose();
    } catch (error) {
      message.error('Cập nhật trạng thái thất bại: ' + (error.data?.message || error.message));
    }
  };

  return (
    <Modal
      title="Cập nhật trạng thái đơn hàng"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={isLoading}
      okText="Cập nhật"
      cancelText="Hủy"
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Select
            options={orderStatuses}
            optionLabelProp="label"
            optionRender={(option) => (
              <span className={`text-${option.data.color}-600`}>
                {option.data.label}
              </span>
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateStatusModal; 