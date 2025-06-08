import React from 'react';
import BlogSidebar from './BlogSideBar';
import BlogCard from './BlogCard';

const MOCK_POSTS = [
  {
    id: 1,
    title: "Chữ ký số là gì? Tất tần tật những điều cần biết về chữ ký số",
    excerpt: "Trong thời đại công nghệ phát triển như vũ bão, chữ ký số là một trong những công nghệ quan trọng...",
    image: "https://noithat52.mauthemewp.com/wp-content/uploads/2023/11/chu-ky-so-la-gi-tat-tan-tat-nhung-dieu-can-biet-ve-chu-ky-so_655ba5daad276-600x450.jpeg"
  },
  {
    id: 2,
    title: "Nhân viên phát triển mặt bằng là gì? Mô tả công việc chi tiết nhất",
    excerpt: "Nhân viên phát triển mặt bằng được đánh giá là một trong những công việc quan trọng...",
    image: "https://noithat52.mauthemewp.com/wp-content/uploads/2023/11/nhan-vien-phat-trien-mat-bang-la-gi-mo-ta-cong-viec-chi-tiet-nhat_655ba5d5970c6-600x450.jpeg"
  },
  // Thêm các bài viết mock khác
];

export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">
          LƯU TRỮ DANH MỤC: TIN TỨC
        </h1>
        <p className="text-gray-600">
          Những tư vấn mới những xu hướng nội thất văn phòng 2023
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <BlogSidebar />
        </div>

        {/* Blog Posts */}
        <div className="lg:w-3/4">
          {MOCK_POSTS.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
