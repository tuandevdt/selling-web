import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ProductList({ 
  title, 
  products, 
  isLoading,
  showFilters = true,
  onFilterChange,
  suppliers
}) {
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    if (!isLoading && products) {
      setIsFiltering(false);
    }
  }, [isLoading, products]);

  const handleFilterChange = (filters) => {
    setIsFiltering(true);
    onFilterChange(filters);
  };

  const handleReset = () => {
    setIsFiltering(true);
    onFilterChange({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h1>
      </div>

      {showFilters && (
        <div className="mb-8">
          <ProductFilter 
            onFilter={handleFilterChange} 
            onReset={handleReset}
            suppliers={suppliers} 
          />
        </div>
      )}
      
      {(isLoading || isFiltering) ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {(!products || products.length === 0) && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">Không có sản phẩm nào</h3>
              <p className="mt-2 text-sm text-gray-500">
                Không tìm thấy sản phẩm phù hợp với điều kiện lọc.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
} 