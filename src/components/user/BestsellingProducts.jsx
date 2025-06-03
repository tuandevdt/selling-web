import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../services/products.service';

const BestsellingProducts = () => {
  const { data: productData, isLoading } = useGetProductsQuery({
    page: 0,
    size: 8, // Lấy 8 sản phẩm cho trang chủ
    sort: 'desc'
  });

  const [activeCategory, setActiveCategory] = useState(null);
  
  // Lấy danh sách sản phẩm từ API response
  const products = useMemo(() => {
    if (!productData?.body?.data?.content) return [];
    return productData.body.data.content;
  }, [productData]);

  // Lấy danh sách categories từ sản phẩm
  const categories = useMemo(() => {
    if (!products.length) return [];
    const uniqueCategories = [...new Set(products.map(product => product.category_id))];
    return uniqueCategories;
  }, [products]);

  // Filter products by active category
  const filteredProducts = useMemo(() => {
    if (!activeCategory) return products;
    return products.filter(product => product.category_id === activeCategory);
  }, [products, activeCategory]);

  if (isLoading) {
    return (
      <div className="bg-indigo-900 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(index => (
                <div key={index} className="bg-white rounded-lg h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-900 py-10 px-4">
      {/* Header */}
      <div className="relative mb-6">
        <div className="bg-orange-400 text-center text-white font-bold text-3xl py-3 px-8 max-w-4xl mx-auto transform skew-x-[-12deg]">
          <span className="inline-block transform skew-x-12">SẢN PHẨM BÁN CHẠY</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded transition-colors ${
            !activeCategory
              ? 'bg-orange-400 text-white'
              : 'bg-white text-gray-800 border border-gray-300'
          }`}
          onClick={() => setActiveCategory(null)}
        >
          Tất cả
        </button>
        {categories.map(categoryId => (
          <button
            key={categoryId}
            className={`px-4 py-2 rounded transition-colors ${
              activeCategory === categoryId
                ? 'bg-orange-400 text-white'
                : 'bg-white text-gray-800 border border-gray-300'
            }`}
            onClick={() => setActiveCategory(categoryId)}
          >
            {categoryId}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Navigation Arrows */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 rounded-full p-2 -ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 rounded-full p-2 -mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
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
                <Link to={`/san-pham/${product.id}`}>
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
        </div>
      </div>
    </div>
  );
};

export default BestsellingProducts; 