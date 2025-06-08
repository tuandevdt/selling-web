import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../services/products.service';
import logoFami from '../../../public/logo/Fami__1_-removebg.png';

const BestsellingProducts = () => {
  const { data: productData, isLoading } = useGetProductsQuery({
    size: 8, 
    sort: 'desc'
  });
  const [activeCategory, setActiveCategory] = useState(null);
  
  const products = useMemo(() => productData?.content, [productData]);

  const categories = useMemo(() => {
    if (!products?.length) return [];
  const uniqueCategories = [
    ...new Map(products.map(product => [product.category_id, product.category_name])).entries()
  ].map(([id, name]) => ({ id, name }));
    return uniqueCategories;
  }, [products]);

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
          {categories.map(({ id, name }) => (
          <button
            key={id}
            className={`px-4 py-2 rounded transition-colors ${
              activeCategory === id
                ? 'bg-orange-400 text-white'
                : 'bg-white text-gray-800 border border-gray-300'
            }`}
            onClick={() => setActiveCategory(id)}
          >
            {name}
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
                      'text-blue-900'
                    }`}>
                      {product.tag}
                    </span>
                  </div>
                )}
                
                {/* Product Image */}
                <Link to={`/san-pham/${product.id}`} className="relative block">
                  <img 
                    src={product.imageUrl || `https://placehold.co/300x300/eee/ccc?text=${product.name}`} 
                    alt={product.name}
                    className="w-full h-56 object-contain p-4"
                  />
                  <img
                    src={logoFami}
                    alt="Logo"
                    className="absolute top-3 left-3 w-16 h-16 object-contain bg-white rounded shadow"                    style={{ zIndex: 2 }}
                  />
                </Link>
                
                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/product/${product.id}`} className="block text-center font-medium text-gray-800 hover:text-blue-700 mb-2">
                    {product.name}
                  </Link>
                  
                  {/* Supplier */}
                  {/* {product.supplier_id && (
                    <div className="text-center text-sm text-gray-500 mb-2">
                      {product.supplier_id.name}
                    </div>
                  )} */}
                  <div className="mt-1 flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                      </svg>
                    ))}
                  </div>
                  {/* Price */}
                  <div className="text-center">
                    <div className="mt-auto pt-4 ">
                      <div className="flex items-center justify-center gap-4">
                        <span className="text-base font-medium text-red-500 line-through">
                          {product.price.toLocaleString('vi-VN')}₫
                        </span>
                        <span className="text-base font-medium text-gray-900">
                          {(() => {
                            let discount = 0;
                            if (product.tag === 'NEW') discount = 100000;
                            else if (product.tag === 'SALE') discount = 500000;
                            else if (product.tag === 'HOT') discount = 700000;
                            return (product.price - discount).toLocaleString('vi-VN') + '₫';
                          })()}
                        </span>
                      </div>
                    </div>
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