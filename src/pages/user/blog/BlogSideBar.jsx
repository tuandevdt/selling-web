import React from 'react';
import { Menu } from 'antd';

export default function BlogSidebar() {
  const categories = [
    { key: 'du-an', label: 'Dự án' },
    { key: 'thong-tin', label: 'Thông tin hữu ích' },
    { key: 'khuyen-mai', label: 'Tin khuyến mãi' },
    { key: 'tin-tuc', label: 'Tin tức' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold text-blue-800 mb-4">CHUYÊN MỤC</h2>
      <Menu
        mode="vertical"
        className="border-none"
        items={categories}
        defaultSelectedKeys={['tin-tuc']}
      />
    </div>
  );
}
