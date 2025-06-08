import { Form, Input, InputNumber, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useGetMaterialsQuery } from '../../../services/material.service';
import { useGetSuppliersQuery } from '../../../services/supplier.service';

const { TextArea } = Input;

const ProductForm = ({ 
  initialValues = {}, 
  categories = [], 
  onSubmit, 
  onCancel,
  isEdit = false 
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Get materials and suppliers
  const { data: materialsData } = useGetMaterialsQuery();
  const { data: suppliersData } = useGetSuppliersQuery();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        categoryId: initialValues.category_id,
        supplierId: initialValues.supplier_id?.id,
        materialIds: initialValues.material_ids || [],
        price: initialValues.price || 0,
        stock: initialValues.stock || 1,
        tag: initialValues.tag || 'NEW'
      });
      
      // Set image previews if product has images
      if (initialValues.imageUrl) {
        const imageFile = {
          uid: '-1',
          name: 'current-image.jpg',
          status: 'done',
          url: initialValues.imageUrl,
          thumbUrl: initialValues.imageUrl
        };
        setFileList([imageFile]);
        setPreviewUrls([initialValues.imageUrl]);
      } else {
        setFileList([]);
        setPreviewUrls([]);
      }
    }
  }, [initialValues, form]);

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    
    // Create preview URLs for new files
    const newUrls = newFileList
      .filter(file => file.originFileObj)
      .map(file => URL.createObjectURL(file.originFileObj));
      
    // Keep existing URLs for files that are already uploaded
    const existingUrls = newFileList
      .filter(file => file.url)
      .map(file => file.url);
      
    setPreviewUrls([...existingUrls, ...newUrls]);
  };

  const onFinish = async (values) => {
    try {
      setSubmitting(true);
      const formData = {
        ...values,
        images: fileList
          .filter(file => file.originFileObj) // Chỉ lấy file mới upload
          .map(file => file.originFileObj),
        imageUrl: fileList.find(file => file.url)?.url // Giữ lại imageUrl cũ nếu không có file mới
      };    
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        name: '',
        description: '',
        price: 0,
        stock: 1,
        tag: 'NEW',
        warranty: '',
        size: '',
        materialIds: [],
        ...initialValues
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Thông tin cơ bản</h3>
          
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
          >
            <InputNumber
              className="w-full"
              min={0}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="categoryId"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
          >
            <Select>
              {categories?.map(category => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Nhà cung cấp"
            name="supplierId"
            rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp' }]}
          >
            <Select>
              {suppliersData?.body?.data?.map(supplier => (
                <Select.Option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        {/* Additional Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Thông tin bổ sung</h3>

          <Form.Item
            label="Tag"
            name="tag"
            rules={[{ required: true, message: 'Vui lòng chọn tag' }]}
          >
            <Select>
              <Select.Option value="NEW">Mới</Select.Option>
              <Select.Option value="HOT">Hot</Select.Option>
              <Select.Option value="SALE">Khuyến mãi</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Kích thước"
            name="size"
            rules={[{ required: true, message: 'Vui lòng nhập kích thước' }]}
          >
            <Input placeholder="VD: W70-L160-H70" />
          </Form.Item>

          <Form.Item
            label="Tồn kho"
            name="stock"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn kho' }]}
          >
            <InputNumber className="w-full" min={0} />
          </Form.Item>

          <Form.Item
            label="Bảo hành"
            name="warranty"
            rules={[{ required: true, message: 'Vui lòng nhập thời gian bảo hành' }]}
          >
            <Input placeholder="VD: 2 năm" />
          </Form.Item>

          <Form.Item
            label="Chất liệu"
            name="materialIds"
            rules={[{ required: true, message: 'Vui lòng chọn chất liệu' }]}
          >
            <Select mode="multiple">
              {materialsData?.body?.data?.map(material => (
                <Select.Option key={material.id} value={material.id}>
                  {material.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={e => e.fileList}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleImageChange}
              beforeUpload={() => false}
              multiple
            >
              <div>
                <UploadOutlined />
                <div className="mt-2">Tải ảnh</div>
              </div>
            </Upload>
          </Form.Item>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <Button 
          onClick={onCancel}
          disabled={submitting}
          className="hover:border-indigo-600 hover:text-indigo-600"
        >
          Hủy
        </Button>
        <Button 
          type="primary" 
          htmlType="submit"
          loading={submitting}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {isEdit ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      </div>
    </Form>
  );
};

export default ProductForm; 