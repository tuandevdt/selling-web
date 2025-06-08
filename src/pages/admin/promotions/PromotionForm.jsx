import { Form, Input, Select, DatePicker, InputNumber, Button, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const PromotionForm = ({ 
  form, 
  initialValues, 
  onFinish, 
  onCancel, 
  isLoading,
  categories = []
}) => {
  const dateFormat = 'HH:mm DD/MM/YYYY';

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => {
        const formattedValues = {
          ...values,
          start_date: values.date_range[0].format(dateFormat),
          end_date: values.date_range[1].format(dateFormat),
          category_ids: values.category_ids,
          is_active: true,
        };
        delete formattedValues.date_range;
        onFinish(formattedValues);
      }}
      initialValues={{
        ...initialValues,
        date_range: initialValues ? [
          dayjs(initialValues.start_date, dateFormat),
          dayjs(initialValues.end_date, dateFormat)
        ] : undefined,
        apply_to_subcategories: initialValues?.apply_to_subcategories ?? true,
      }}
    >
      <Form.Item
        name="title"
        label="Tiêu đề"
        rules={[
          { required: true, message: 'Vui lòng nhập tiêu đề' },
          { max: 255, message: 'Tiêu đề không được vượt quá 255 ký tự' }
        ]}
      >
        <Input placeholder="Nhập tiêu đề khuyến mãi" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô tả"
        rules={[
          { max: 1000, message: 'Mô tả không được vượt quá 1000 ký tự' }
        ]}
      >
        <TextArea 
          rows={4} 
          placeholder="Nhập mô tả khuyến mãi"
        />
      </Form.Item>

      <Form.Item
        name="category_ids"
        label="Danh mục áp dụng"
        rules={[
          { required: true, message: 'Vui lòng chọn ít nhất một danh mục' }
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Chọn danh mục"
          options={categories.map(cat => ({
            label: cat.name,
            value: cat.id
          }))}
        />
      </Form.Item>

      <Form.Item
        name="apply_to_subcategories"
        label="Áp dụng cho danh mục con"
        valuePropName="checked"
      >
        <Select>
          <Select.Option value={true}>Có</Select.Option>
          <Select.Option value={false}>Không</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="discount_value"
        label="Giá trị giảm giá"
        rules={[
          { required: true, message: 'Vui lòng nhập giá trị giảm giá' },
          { type: 'number', min: 0, max: 1, message: 'Giá trị từ 0 đến 1' }
        ]}
      >
        <InputNumber
          min={0}
          max={1}
          step={0.1}
          style={{ width: '100%' }}
          placeholder="Nhập giá trị giảm giá (0-1)"
        />
      </Form.Item>

      <Form.Item
        name="date_range"
        label="Thời gian áp dụng"
        rules={[
          { required: true, message: 'Vui lòng chọn thời gian áp dụng' }
        ]}
      >
        <RangePicker
          showTime
          format={dateFormat}
          style={{ width: '100%' }}
          okButtonProps={{ className: "bg-indigo-600 hover:bg-indigo-700" }}
        />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {initialValues ? 'Cập nhật' : 'Tạo mới'}
          </Button>
          <Button onClick={onCancel}>
            Hủy
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default PromotionForm; 