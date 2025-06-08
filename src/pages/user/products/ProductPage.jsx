import { useState } from 'react';
import { useGetProductsQuery } from '../../../services/products.service';
import { useGetSuppliersQuery } from '../../../services/suppliers.service';
import ProductList from '../../../components/product/ProductList';

export default function ProductPage() {
  const [filterParams, setFilterParams] = useState({});
  const { data: productData, isLoading: isLoadingProducts } = useGetProductsQuery(filterParams);
  const { data: suppliers, isLoading: isLoadingSuppliers } = useGetSuppliersQuery();

  const handleFilterChange = (filters) => {
    setFilterParams(filters);    
  };

  const isLoading = isLoadingProducts || isLoadingSuppliers;

  return (
    <ProductList
      title="Tất cả sản phẩm"
      products={productData?.content}
      isLoading={isLoading}
      showFilters={true}
      onFilterChange={handleFilterChange}
      suppliers={suppliers}
    />
  );
}
