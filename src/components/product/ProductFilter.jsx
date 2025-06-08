import React, { useState } from 'react';
import { Input, Select, Slider, Form, Button } from 'antd';

const { Option } = Select;

export default function ProductFilter({ onFilter, onReset, suppliers }) {
  const [form] = Form.useForm();
  const [priceRange, setPriceRange] = useState([0, 100000000]);

  const handleFilter = (values) => {
    const filters = {
      ...values,
      min_price: priceRange[0],
      max_price: priceRange[1]
    };

    // Chỉ gửi các giá trị đã được điền
    const cleanedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== '' && value !== 0) {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    onFilter(cleanedFilters);
  };

  const handleReset = () => {
    form.resetFields();
    setPriceRange([0, 100000000]);
    onReset();
  };

  const formatPrice = (value) => {
    return `${value.toLocaleString('vi-VN')}đ`;
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className="bg-white p-4 rounded-lg shadow-sm"
      onFinish={handleFilter}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Form.Item name="name" label="Tìm kiếm sản phẩm">
          <Input placeholder="Nhập tên sản phẩm..." />
        </Form.Item>

        <Form.Item name="supplier_id" label="Nhà cung cấp">
          <Select placeholder="Chọn nhà cung cấp" allowClear>
            {suppliers?.map((supplier) => (
              <Option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="sort" label="Sắp xếp theo giá">
          <Select placeholder="Sắp xếp" allowClear>
            <Option value="asc">Giá thấp đến cao</Option>
            <Option value="desc">Giá cao đến thấp</Option>
          </Select>
        </Form.Item>
      </div>

      <Form.Item label="Khoảng giá" className="mb-8">
        <Slider
          range
          min={0}
          max={100000000}
          step={100000}
          value={priceRange}
          onChange={setPriceRange}
          tooltip={{ formatter: formatPrice }}
          className="mt-2"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </Form.Item>

      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={handleReset}>Đặt lại</Button>
        <Button type="primary" htmlType="submit" className="bg-indigo-600">
          Áp dụng
        </Button>
      </div>
    </Form>
  );
} 