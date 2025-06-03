import { useState } from 'react';
import { Table, Button, Space, Modal, message, Card, Form, Input, Select, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { 
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductSoftMutation
} from '../../services/products.service';
import { useGetCategoriesQuery } from '../../services/category.service';
import { useGetMaterialsQuery } from '../../services/material.service';
import { useGetSuppliersQuery } from '../../services/supplier.service';
import ProductForm from './products/ProductForm';
import { Slider } from 'antd';


const { confirm } = Modal;

function ManageProducts() {  
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchForm] = Form.useForm();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sorter: {
      field: 'createdAt',
      order: 'desc'
    },
    filters: {}
  });

  // RTK Query hooks
  const { data, isLoading } = useGetProductsQuery({
    page: tableParams.pagination.current - 1,
    size: tableParams.pagination.pageSize,
    sort: tableParams.sorter.order === 'ascend' ? 'asc' : 'desc',
    ...tableParams.filters
  });

  const { data: categories } = useGetCategoriesQuery();
  const { data: materials } = useGetMaterialsQuery();
  const { data: suppliers } = useGetSuppliersQuery();

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProductSoft] = useDeleteProductSoftMutation();

  // Table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
      fixed: 'left'
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      width: 300,
      fixed: 'left',
      render: (name, record) => (
        <div className="flex items-center">
          {record.imageUrl && (
            <img 
              src={record.imageUrl} 
              alt={name}
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
          )}
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-gray-500 text-sm">{record.code}</div>
          </div>
        </div>
      ),
      sorter: true
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      width: 150,
      render: (price) => (
        <div>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
        </div>
      ),
      sorter: true
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: ['supplier_id', 'name'],
      width: 200
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_active',
      width: 120,
      render: (isActive) => (
        <span className={`px-2 py-1 rounded ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isActive ? 'Đang bán' : 'Ngừng bán'}
        </span>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Sửa
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record)}
            className="!text-red-600 hover:!text-red-700"
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // Handlers
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters: {
        ...tableParams.filters,
        categoryId: filters.categoryId?.[0]
      },
      sorter: {
        field: sorter.field || 'createdAt',
        order: sorter.order || 'desc'
      }
    });
  };

  const handleSearch = (values) => {
    setTableParams(prev => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1
      },
      filters: {
        ...values,
        minPrice: values.price?.[0],
        maxPrice: values.price?.[1]
      }
    }));
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const showDeleteConfirm = (product) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      icon: <ExclamationCircleOutlined />,
      content: 'Sản phẩm sẽ được chuyển vào thùng rác và có thể khôi phục sau.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        handleDelete(product.id);
      },
    });
  };

  const handleSave = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        tag: formData.tag,
        description: formData.description,
        size: formData.size,
        price: formData.price,
        stock: formData.stock,
        warranty: formData.warranty,
        material_ids: formData.materialIds,
        category_id: formData.categoryId,
        supplier_id: formData.supplierId,
        images: formData.images || []
      };

      if (selectedProduct) {
        await updateProduct({
          id: selectedProduct.id,
          productData: payload
        }).unwrap();
        message.success('Cập nhật sản phẩm thành công');
      } else {
        await createProduct({
          productData: payload
        }).unwrap();
        message.success('Tạo sản phẩm thành công');
      }
      setIsModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      message.error(error.data?.message || 'Đã có lỗi xảy ra khi lưu sản phẩm');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductSoft(id).unwrap();
      message.success('Đã xóa sản phẩm thành công');
    } catch (error) {
      console.error('Error deleting product:', error);
      message.error(error.data?.message || 'Đã có lỗi xảy ra khi xóa sản phẩm');
    }
  };

  return (
    <div className="p-6">
      <Card title="Quản lý sản phẩm" className="mb-4">
        <Form
          form={searchForm}
          layout="vertical"
          onFinish={handleSearch}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Form.Item name="keyword" label="Tìm kiếm">
            <Input placeholder="Tên sản phẩm, mã sản phẩm..." />
          </Form.Item>
          
          <Form.Item name="categoryId" label="Danh mục">
            <Select allowClear placeholder="Chọn danh mục">
              {categories?.body?.data?.map(category => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item name="price" label="Khoảng giá">
            <Slider
              range
              className="w-full"
              min={0}
              max={10000000}
              step={100000}
              tipFormatter={value => `${value.toLocaleString('vi-VN')}đ`}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button 
                type="primary" 
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
                className="hover:border-indigo-600 hover:text-indigo-600"
              >
                Đặt lại
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreate}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Thêm sản phẩm
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={data?.body?.data?.content}
          loading={isLoading}
          pagination={{
            ...tableParams.pagination,
            total: data?.body?.data?.totalElements,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Tổng ${total} sản phẩm`
          }}
          onChange={handleTableChange}
          scroll={{ x: 1000 }}
          rowKey="id"
        />
      </Card>

      {isModalOpen && categories && materials && suppliers && (
        <Modal
          title={selectedProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
          open={isModalOpen}
          onCancel={handleModalCancel}
          width={1000}
          footer={null}
          destroyOnClose
        >
          <ProductForm
            initialValues={selectedProduct}
            categories={categories?.body?.data || []}
            onSubmit={handleSave}
            onCancel={handleModalCancel}
            isEdit={!!selectedProduct}
          />
        </Modal>
      )}
    </div>
  );
}

export default ManageProducts; 