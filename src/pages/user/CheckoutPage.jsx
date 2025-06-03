import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cartService } from '../../services/cartService'
import { Radio, App, Card } from 'antd'
import { authService } from '../../services/authService'
import { useGetProductImagesQuery } from '../../services/products.service'

// Component con cho mỗi item trong đơn hàng
function OrderItem({ item }) {
  const { data: images } = useGetProductImagesQuery(item.product_item_id);

  return (
    <li className="p-4 flex">
      <div className="flex-shrink-0 w-20 h-20">
        <img
          src={images?.[0] || ''}
          alt={item.product.name}
          className="w-full h-full object-center object-cover rounded"
        />
      </div>
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h3 className="text-base font-medium text-gray-900">
            {item.product.name}
          </h3>
          <p className="text-base font-medium text-gray-900">
            {(item.product.price * item.quantity).toLocaleString('vi-VN')}₫
          </p>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Số lượng: {item.quantity}
        </p>
      </div>
    </li>
  );
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([])
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { message } = App.useApp()
  const user = authService.getUser()

  useEffect(() => {
    const items = cartService.getCart()
    if (items.length === 0) {
      navigate('/cart')
      return
    }
    setCartItems(items)
  }, [navigate])

  const totalPrice = cartService.getTotalPrice()

  const handleCreateOrder = async () => {
    try {
      setLoading(true)
      
      if (!user) {
        message.error('Vui lòng đăng nhập để tiếp tục')
        navigate('/login')
        return
      }

      const orderData = {
        orderDetails: cartItems.map(item => ({
          product_item_id: item.product_item_id,
          quantity: item.quantity
        })),
        user_id: user.id,
        status: "PENDING",
        payment_method: paymentMethod
      }

      // Call API tạo đơn hàng
      const response = await fetch('http://localhost:8080/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(orderData)
      })

      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi tạo đơn hàng')
      }

      // Xóa giỏ hàng sau khi đặt hàng thành công
      cartService.clearCart()
      message.success('Đặt hàng thành công')
      navigate('/orders') // Chuyển đến trang đơn hàng
    } catch (error) {
      message.error(error.message || 'Có lỗi xảy ra khi tạo đơn hàng')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Vui lòng đăng nhập để tiếp tục</h2>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
        {/* Thông tin đơn hàng */}
        <div className="space-y-6">

          <div>
            <h2 className="text-2xl font-bold mb-6">Thông tin đơn hàng</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <OrderItem key={item.product_item_id} item={item} />
                ))}
              </ul>
              <div className="border-t border-gray-200 px-4 py-5">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Tổng tiền</p>
                  <p>{totalPrice.toLocaleString('vi-VN')}₫</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phương thức thanh toán */}
        <div>
        <Card title="Thông tin người đặt" className="bg-white shadow mb-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Họ tên:</span>
                <span className="font-medium">{user.fullname}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Số điện thoại:</span>
                <span className="font-medium">{user.phoneNumber || 'Chưa cập nhật'}</span>
              </div>
            </div>
          </Card>
          <h2 className="text-2xl font-bold mb-6">Phương thức thanh toán</h2>
          <div className="bg-white shadow sm:rounded-lg p-6">
            <Radio.Group 
              onChange={e => setPaymentMethod(e.target.value)} 
              value={paymentMethod}
              className="flex flex-col space-y-4"
            >
              <Radio value="cod" className="text-base">
                <div className="ml-2">
                  <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
                  <p className="text-sm text-gray-500">Thanh toán bằng tiền mặt khi nhận hàng</p>
                </div>
              </Radio>
              <Radio value="vnpay" className="text-base">
                <div className="ml-2">
                  <span className="font-medium">Thanh toán qua VN Pay</span>
                  <p className="text-sm text-gray-500">Thanh toán bằng thẻ ATM/Visa/Master/JCB qua cổng VN Pay</p>
                </div>
              </Radio>
            </Radio.Group>

            <div className="mt-8">
              <button
                type="button"
                onClick={handleCreateOrder}
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang xử lý...' : 'Đặt hàng'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
