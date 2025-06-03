import { Link } from "react-router-dom";
import HomeSlider from "../../components/user/HomeSlider";
import BestsellingProducts from "../../components/user/BestsellingProducts";
import ServiceBanners from "../../components/user/ServiceBanners";
import FeaturedProjects from "../../components/user/FeaturedProjects";
import ErgonomicChairBanner from "../../components/user/ErgonomicChairBanner";
import { useGetCategoriesQuery } from "../../services/category.service";
import { useGetProductsQuery } from "../../services/products.service";
import { useMemo } from "react";

function Home() {
  const { data: categoryData } = useGetCategoriesQuery();
  const { data: productData, isLoading } = useGetProductsQuery({
    page: 0,
    size: 8,
    sort: 'desc'
  });

  // Lấy danh sách sản phẩm từ API response
  const products = useMemo(() => {
    if (!productData?.body?.data?.content) return [];
    return productData.body.data.content;
  }, [productData]);

  return (
    <div>
      <div className="relative">
        {/* Slider */}
        <HomeSlider />

        {/* Bestselling Products */}
        <BestsellingProducts />

        {/* Service Banners */}
        <ServiceBanners />

        {/* Featured Projects */}
        <FeaturedProjects />

        {/* Ergonomic Chair Banner */}
        <ErgonomicChairBanner />

        {/* Danh mục sản phẩm */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Danh Mục Sản Phẩm
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Ghế sofa</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Bàn</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Tủ</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4m8-8v16"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Giường</h3>
            </div>
          </div>
        </div>

        {/* Sản phẩm nổi bật */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Sản Phẩm Nổi Bật
          </h2>
          
          {isLoading ? (
            <div className="animate-pulse">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(index => (
                  <div key={index} className="bg-white rounded-lg h-96"></div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden relative">
                  {/* Tag */}
                  {product.tag && (
                    <div className="absolute top-2 right-2 bg-white/80 rounded px-2 py-1 z-10">
                      <span className={`text-xs font-bold ${
                        product.tag === 'NEW' ? 'text-green-600' :
                        product.tag === 'HOT' ? 'text-red-600' :
                        'text-blue-600'
                      }`}>
                        {product.tag}
                      </span>
                    </div>
                  )}
                  
                  {/* Product Image */}
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.imageUrl || `https://placehold.co/300x300/eee/ccc?text=${product.name}`} 
                      alt={product.name}
                      className="w-full h-56 object-contain p-4"
                    />
                  </Link>
                  
                  {/* Product Info */}
                  <div className="p-4">
                    <Link to={`/product/${product.id}`} className="block text-center font-medium text-gray-800 hover:text-blue-700 mb-2">
                      {product.name}
                    </Link>
                    
                    {/* Supplier */}
                    {product.supplier_id && (
                      <div className="text-center text-sm text-gray-500 mb-2">
                        {product.supplier_id.name}
                      </div>
                    )}
                    
                    {/* Price */}
                    <div className="text-center">
                      <span className="text-red-600 font-bold">
                        {product.price.toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                    
                    {/* Add to Cart */}
                    <div className="mt-4">
                      <button className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900 transition">
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
