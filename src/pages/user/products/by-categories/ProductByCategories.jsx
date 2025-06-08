import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsByCategoryQuery } from '../../../../services/products.service';
import ProductList from '../../../../components/product/ProductList';

export default function ProductByCategories() {
  const { id } = useParams();
  const { data: productData, isLoading } = useGetProductsByCategoryQuery(id, {skip: !id});
  return (
    <ProductList
      title="Sản phẩm theo danh mục"
      products={productData?.content}
      isLoading={isLoading}
    />
  );
}
