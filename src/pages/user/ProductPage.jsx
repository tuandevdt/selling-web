import { useGetProductsQuery } from '../../services/products.service'
import ProductCard from '../../components/product/ProductCard'
import { Spin, Button } from 'antd'

export default function ProductPage() {
  const { data: productData, isLoading } = useGetProductsQuery();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Tất cả sản phẩm
        </h1>
        
        <div className="flex gap-4">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white border-none">
            Lọc sản phẩm
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white border-none">
            Sắp xếp
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {productData?.body?.data?.content.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {productData?.body?.data?.content.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Không có sản phẩm nào</h3>
          <p className="mt-2 text-sm text-gray-500">
            Hiện tại chưa có sản phẩm nào được đăng bán.
          </p>
        </div>
      )}
    </div>
  )
}
