import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      {/* Phần dịch vụ ở trên cùng */}
      <div className="bg-blue-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <div className="mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">SETUP VĂN PHÒNG TRỌN GÓI</h3>
                <p className="text-xs text-gray-200">Thiết kế nhanh chóng theo ý tưởng sản phẩm của bạn</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">BẢO HÀNH LÊN TỚI 5 NĂM</h3>
                <p className="text-xs text-gray-200">Bảo hành lên tới 5 năm, bảo trì trọn đời</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">GIAO HÀNG TOÀN QUỐC</h3>
                <p className="text-xs text-gray-200">Chúng tôi nhận giao hàng toàn quốc</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">GIAO HÀNG TOÀN QUỐC</h3>
                <p className="text-xs text-gray-200">Chúng tôi nhận giao hàng toàn quốc</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin liên hệ */}
      <div className="border-t border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-800" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <div>
                <span className="text-sm text-gray-600">Tư vấn bán hàng: </span>
                <span className="text-red-600 font-bold">0909.11.1111</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-800" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <div>
                <span className="text-sm text-gray-600">Tổng đài (24/7): </span>
                <span className="text-red-600 font-bold">0909.11.1111</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-800" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <div>
                <span className="text-sm text-gray-600">Tel/Fax: </span>
                <span className="text-red-600 font-bold">0909.11.1111</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-800" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <div>
                <span className="text-sm text-gray-600">Email: </span>
                <span className="text-red-600 font-bold">info@demo.vn</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin địa chỉ */}
      <div className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <h3 className="font-bold text-blue-800">Miền Bắc</h3>
              </div>
              <div className="mb-3">
                <p className="text-sm"><strong>Showroom:</strong> Tầng 1, Tòa nhà N01, 259 Yên Hòa, Cầu Giấy, Hà Nội</p>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Xem bản đồ</a>
              </div>
              <div>
                <p className="text-sm"><strong>Tổng kho:</strong> Số 44-45, D4 KĐT mới Geleximco Lê Trọng Tấn, Dương Nội, Hà Đông, Hà Nội</p>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Xem bản đồ</a>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <h3 className="font-bold text-blue-800">Miền Bắc</h3>
              </div>
              <div className="mb-3">
                <p className="text-sm"><strong>Showroom:</strong> 53 Đình Thị Thi, KĐT Văn Phúc, Hiệp Bình Phước, Thủ Đức, Tp.HCM</p>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Xem bản đồ</a>
              </div>
              <div>
                <p className="text-sm"><strong>Tổng kho:</strong> Số 16 Đường 34, KĐT Văn Phúc, Hiệp Bình Phước, Thủ Đức, Tp.HCM</p>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Xem bản đồ</a>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <h3 className="font-bold text-blue-800">Miền Bắc</h3>
              </div>
              <div className="mb-3">
                <p className="text-sm"><strong>Showroom:</strong> Tầng 1, Tòa nhà N01, 259 Yên Hòa, Cầu Giấy, Hà Nội</p>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Xem bản đồ</a>
              </div>
              <div>
                <p className="text-sm"><strong>Tổng kho:</strong> Số 44-45, D4 KĐT mới Geleximco Lê Trọng Tấn, Dương Nội, Hà Đông, Hà Nội</p>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Xem bản đồ</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer menu
      <div className="border-t border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-4">
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-blue-800 flex items-center">
                  <span className="mr-2">•</span> Giới thiệu về Fami
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-blue-800 flex items-center">
                  <span className="mr-2">•</span> Hướng dẫn mua hàng
                </a>
              </li>
            </ul>
            
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-blue-800 flex items-center">
                  <span className="mr-2">•</span> Hướng dẫn thanh toán
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-blue-800 flex items-center">
                  <span className="mr-2">•</span> Hướng dẫn lắp đặt
                </a>
              </li>
            </ul>
            
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-blue-800 flex items-center">
                  <span className="mr-2">•</span> Chính sách bảo mật thông tin
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-blue-800 flex items-center">
                  <span className="mr-2">•</span> Chính sách giao hàng
                </a>
              </li>
            </ul>
            
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-blue-800 flex items-center">
                  <span className="mr-2">•</span> Chính sách đổi trả, hoàn tiền
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-blue-800 flex items-center">
                  <span className="mr-2">•</span> Chính sách bảo hành sản phẩm
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}

      {/* Copyright và Social */}
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="md:flex justify-between">
            <div className="md:w-2/3">
              <p className="text-xs text-gray-600 mb-4 md:mb-0">
                Copyright © ABC. All rights reserved - Mã số Doanh nghiệp: 11111111 do Sở KH và ĐT TP Hà Nội cấp 11/20154 - Sử dụng nội dung và dịch vụ tại ABC có nghĩa là bạn đồng ý với Thỏa thuật sử dụng và Chính sách bảo mật của chúng tôi.<br />
                Bản quyền về thiết kế sản phẩm và thương hiệu ABC được bảo hộ độc quyền ở Việt Nam.
              </p>
            </div>
            
            <div className="md:w-1/3">
              <div className="mb-3">
                <h4 className="font-semibold text-sm mb-2">Góp ý từ Khách hàng</h4>
                <p className="text-xs text-gray-600">demo luôn trân trọng và mong đợi nhận được mọi ý kiến và đóng góp từ khách hàng để có thể nâng cấp trải nghiệm ngày một tốt hơn.</p>
              </div>
              
              <div>
                <button className="bg-blue-800 text-white text-sm px-4 py-2 rounded flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                  </svg>
                  Gửi ý kiến
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-3">
            <a href="#" className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="py-2 bg-gray-100 text-center text-xs text-gray-600">
        <div className="max-w-7xl mx-auto px-4">
          Copyright 2025 © Tất cả nội dung và hình ảnh trên web chỉ dùng để làm Demo tham khảo
        </div>
      </div>
    </footer>
  )
}

export default Footer 