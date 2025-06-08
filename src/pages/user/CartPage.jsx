import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cartService } from '../../services/cartService'
import { message } from 'antd'
import { useGetProductImagesQuery } from '../../services/products.service'

// Component con cho mỗi item trong giỏ hàng
function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { data: images } = useGetProductImagesQuery(item.product_item_id);

  return (
    <li className="py-6 flex">
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <img
          src={images?.[0] || ''}
          alt={item.product.name}
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link to={`/products/${item.product_item_id}`}>
                {item.product.name}
              </Link>
            </h3>
            <p className="ml-4">{item.product.price.toLocaleString('vi-VN')}₫</p>
          </div>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex items-center">
            <span className="mr-3">Số lượng</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                className="px-3 py-1 text-gray-600 hover:text-gray-700"
                onClick={() => onUpdateQuantity(item.product_item_id, item.quantity - 1, item.product.stock)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <input
                type="text"
                className="w-12 text-center border-0 focus:ring-0"
                value={item.quantity}
                readOnly
              />
              <button
                className="px-3 py-1 text-gray-600 hover:text-gray-700"
                onClick={() => onUpdateQuantity(item.product_item_id, item.quantity + 1, item.product.stock)}
                disabled={item.quantity >= item.product.stock}
              >
                +
              </button>
            </div>
            <span className="ml-3 text-gray-500">
              Còn lại: {item.product.stock}
            </span>
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={() => onRemove(item.product_item_id)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

function CartPage() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Lấy danh sách cart items từ localStorage
  useEffect(() => {
    const items = cartService.getCart()
    setCartItems(items)
    setLoading(false)
  }, [])

  // Sử dụng một ID duy nhất để lấy ảnh cho sản phẩm đầu tiên (nếu có)
  const firstProductId = cartItems[0]?.product_item_id;
  const { data: productImages, isLoading: imagesLoading } = useGetProductImagesQuery(
    firstProductId,
    { skip: !firstProductId } // Bỏ qua query nếu không có sản phẩm
  );

  const handleUpdateQuantity = (productId, newQuantity, stock) => {
    if (newQuantity < 1 || newQuantity > stock) return;
    
    try {
      const updatedCart = cartService.updateQuantity(productId, newQuantity);
      setCartItems(updatedCart);
      message.success('Đã cập nhật số lượng');
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật số lượng');
    }
  };

  const handleRemoveItem = (productId) => {
    try {
      const updatedCart = cartService.removeFromCart(productId);
      setCartItems(updatedCart);
      message.success('Đã xóa sản phẩm khỏi giỏ hàng');
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa sản phẩm');
    }
  };

  if (loading || imagesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Đang tải...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Giỏ hàng trống
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Bạn chưa có sản phẩm nào trong giỏ hàng.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = cartService.getTotalPrice();

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Giỏ hàng
      </h1>

      <div className="mt-12">
        <div className="flow-root">
          <ul className="-my-6 divide-y divide-gray-200">
            {cartItems.map((item) => (
              <CartItem
                key={item.product_item_id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Tổng tiền</p>
          <p>{totalPrice.toLocaleString('vi-VN')}₫</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Phí vận chuyển sẽ được tính ở bước tiếp theo.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Thanh toán
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
          <p>
            hoặc{' '}
            <Link to="/" className="text-indigo-600 font-medium hover:text-indigo-500">
              Tiếp tục mua sắm<span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartPage; 