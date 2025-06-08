import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8 bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
      <div className="md:w-1/3">
        <Link to={`/blog/${post.id}`}>
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-[200px] object-cover rounded-lg"
          />
        </Link>
      </div>
      <div className="md:w-2/3">
        <Link to={`/blog/${post.id}`}>
          <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 mb-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <Link 
          to={`/blog/${post.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Xem thêm →
        </Link>
      </div>
    </div>
  );
}
