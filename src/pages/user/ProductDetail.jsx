import { useParams } from 'react-router-dom'
import { useGetProductByIdQuery, useGetProductImagesQuery } from '../../services/products.service'
import { cartService } from '../../services/cartService'
import { useState } from 'react'
import { App } from 'antd'

function ProductDetail() {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const { data: response, isLoading: productLoading, error: productError } = useGetProductByIdQuery(id)
  const { data: imageUrls, isLoading: imagesLoading } = useGetProductImagesQuery(id)
  const { message } = App.useApp();

  if (productLoading || imagesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Đang tải...</div>
      </div>
    )
  }

  if (productError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Có lỗi xảy ra khi tải thông tin sản phẩm</div>
      </div>
    )
  }

  const product = response?.data

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    try {
      cartService.addToCart(product, quantity);
      message.success('Đã thêm sản phẩm vào giỏ hàng');
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm vào giỏ hàng');
    }
  };

  const handleBuyNow = () => {
    try {
      cartService.addToCart(product, quantity);
      // Chuyển đến trang giỏ hàng
      window.location.href = '/cart';
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm vào giỏ hàng');
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Hình ảnh sản phẩm */}
          <div className="flex flex-col">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={imageUrls?.[0] || ''}
                alt={product.name}
                className="w-full h-full object-center object-cover"
              />
            </div>
            {/* Thư viện ảnh */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              {imageUrls?.map((imageUrl, index) => (
                <div key={index} className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-center object-cover cursor-pointer hover:opacity-75"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
            
            <div className="mt-3">
              <h2 className="sr-only">Thông tin sản phẩm</h2>
              <p className="text-3xl text-gray-900">{product.price.toLocaleString('vi-VN')}₫</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Mô tả</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <h4 className="text-sm text-gray-900 font-medium">Mã sản phẩm:</h4>
                <p className="ml-2 text-sm text-gray-500">{product.code}</p>
              </div>
              <div className="flex items-center mt-4">
                <h4 className="text-sm text-gray-900 font-medium">Danh mục:</h4>
                <p className="ml-2 text-sm text-gray-500">{product.category_id.name}</p>
              </div>
              <div className="mt-4 flex items-center">
                <h4 className="text-sm text-gray-900 font-medium">Kích thước:</h4>
                <p className="ml-2 text-sm text-gray-500">{product.size}</p>
              </div>
              <div className="mt-4 flex items-center">
                <h4 className="text-sm text-gray-900 font-medium">Chất liệu:</h4>
                <p className="ml-2 text-sm text-gray-500">
                  {product.material_ids.map(material => material.name).join(', ')}
                </p>
              </div>
              <div className="mt-4 flex items-center">
                <h4 className="text-sm text-gray-900 font-medium">Bảo hành:</h4>
                <p className="ml-2 text-sm text-gray-500">{product.warranty} năm</p>
              </div>
              <div className="mt-4 flex items-center">
                <h4 className="text-sm text-gray-900 font-medium">Nhà cung cấp:</h4>
                <p className="ml-2 text-sm text-gray-500">{product.supplier_id.name}</p>
              </div>
            </div>

            {/* Số lượng */}
            <div className="mt-8">
              <div className="flex items-center">
                <h4 className="text-sm text-gray-900 font-medium mr-3">Số lượng:</h4>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    className="px-3 py-1 text-gray-600 hover:text-gray-700"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="w-12 text-center border-0 focus:ring-0"
                    value={quantity}
                    readOnly
                  />
                  <button 
                    className="px-3 py-1 text-gray-600 hover:text-gray-700"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                <span className="ml-3 text-sm text-gray-500">
                  Còn lại: {product.stock} sản phẩm
                </span>
              </div>
            </div>

            <div className="mt-10 flex space-x-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Thêm vào giỏ hàng
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 bg-gray-100 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 