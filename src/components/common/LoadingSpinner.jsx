import React from 'react';
import { Spin } from 'antd';

export default function LoadingSpinner() {
  return (
    <div className="w-full h-full flex items-center justify-center py-8">
      <Spin size="large" />
    </div>
  );
} 