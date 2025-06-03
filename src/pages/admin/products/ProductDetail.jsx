import { Descriptions, Image, Tag, Card } from 'antd';

const ProductDetail = ({ product }) => {
  if (!product) return null;

  return (
    <div className="space-y-6">
      <Card title="Thông tin cơ bản">
        <Descriptions column={2}>
          <Descriptions.Item label="Tên sản phẩm">{product.name}</Descriptions.Item>
          <Descriptions.Item label="Mã sản phẩm">{product.code}</Descriptions.Item>
          <Descriptions.Item label="Giá">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
          </Descriptions.Item>
          <Descriptions.Item label="Danh mục">{product.category?.name}</Descriptions.Item>
          <Descriptions.Item label="Tồn kho">{product.stock}</Descriptions.Item>
          <Descriptions.Item label="Giảm giá">
            {product.discountPercent > 0 ? `${product.discountPercent}%` : 'Không có'}
          </Descriptions.Item>
          <Descriptions.Item label="Slug">{product.slug}</Descriptions.Item>
          <Descriptions.Item label="Tags">
            {product.tag ? product.tag.split(',').map(tag => (
              <Tag key={tag} color="blue">{tag.trim()}</Tag>
            )) : 'Không có'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Mô tả">
        <div className="whitespace-pre-wrap">{product.description || 'Không có mô tả'}</div>
      </Card>

      <Card title="Hình ảnh">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product.images?.map((image, index) => (
            <div key={index} className="aspect-square">
              <Image
                src={image.url}
                alt={`${product.name} - ${index + 1}`}
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail; 