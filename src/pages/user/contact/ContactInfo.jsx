import React from 'react';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';

export default function ContactInfo() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Công ty Cổ phần FAMI</h3>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <PhoneOutlined className="text-blue-600 text-xl mt-1" />
          <div>
            <p className="font-medium">Tư vấn bán hàng:</p>
            <p className="text-lg font-bold text-blue-600">0909.11.1111</p>
            <p className="font-medium mt-2">Tổng đài (24/7):</p>
            <p className="text-lg font-bold text-blue-600">1900 4752</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <MailOutlined className="text-blue-600 text-xl mt-1" />
          <div>
            <p className="font-medium">Email:</p>
            <p className="text-blue-600">info@demo.vn</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-bold text-lg mb-4">Miền Bắc</h4>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <EnvironmentOutlined className="text-blue-600 text-xl mt-1" />
              <div>
                <p className="font-medium">Showroom:</p>
                <p>Tầng 1, Tòa nhà N01, 259 Yên Hòa, Cầu Giấy, Hà Nội</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <EnvironmentOutlined className="text-blue-600 text-xl mt-1" />
              <div>
                <p className="font-medium">Tổng kho:</p>
                <p>Số 44-45, D4 KĐT mới Geleximco Lê Trọng Tấn, Dương Nội, Hà Đông, Hà Nội</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-bold text-lg mb-4">Miền Nam</h4>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <EnvironmentOutlined className="text-blue-600 text-xl mt-1" />
              <div>
                <p className="font-medium">Showroom:</p>
                <p>53 Đinh Thị Thi, KĐT Vạn Phúc, Hiệp Bình Phước, Thủ Đức, Tp.HCM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
