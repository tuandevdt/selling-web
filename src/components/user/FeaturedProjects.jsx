import { Link } from 'react-router-dom';

const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      title: 'Chữ ký số là gì? Tất tần tật những điều cần biết về chữ ký số',
      image: 'https://noithat52.mauthemewp.com/wp-content/uploads/2023/11/dich-vu-chu-ky-so-600x313.jpg',
      url: '/projects/chu-ky-so'
    },
    {
      id: 2,
      title: 'Dự án cung cấp, lắp đặt nội thất văn phòng cho Lumina Academy',
      image: 'https://noithat52.mauthemewp.com/wp-content/uploads/2023/11/lumina-600x313.jpg',
      url: '/projects/lumina-academy'
    },
    {
      id: 3,
      title: 'Fami cung cấp lắp đặt nội thất văn phòng cho MBBank',
      image: 'https://noithat52.mauthemewp.com/wp-content/uploads/2023/11/mbbank-600x313.jpg',
      url: '/projects/mbbank'
    },
    {
      id: 4,
      title: 'Fami cung cấp nội thất văn phòng cho tập đoàn Tân Hoàng Minh khắp cả nước',
      image: 'https://noithat52.mauthemewp.com/wp-content/uploads/2023/11/tan-hoang-minh-600x313.jpg',
      url: '/projects/tan-hoang-minh'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-600 py-16 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
      
      {/* Decorative elements */}
      <div className="absolute -left-20 -top-20 w-40 h-40 rounded-full bg-blue-400 opacity-10"></div>
      <div className="absolute -right-10 bottom-10 w-40 h-40 rounded-full bg-blue-300 opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <h2 className="text-4xl font-bold text-white text-center mb-6">DỰ ÁN TIÊU BIỂU</h2>
        
        {/* Description */}
        <div className="max-w-5xl mx-auto text-center mb-12">
          <p className="text-white text-lg leading-relaxed">
            Fami Furniture – Nơi hội tụ nét tinh hoa nội thất văn phòng, một hệ sinh thái đa dạng với nhiều sản phẩm độc đáo mang phong cách 
            hiện đại và thực sự đẳng cấp. Những sản phẩm của chúng tôi được sản xuất dựa trên tiêu chuẩn quốc tế, an toàn cho người dùng, 
            bền đẹp với thời gian và nâng tầm phong cách làm việc chuyên nghiệp của người lao động trí thức.
          </p>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image || `https://placehold.co/600x400/e2e8f0/64748b?text=Project+${project.id}`} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-medium text-gray-900 mb-4">{project.title}</h3>
                <Link 
                  to={project.url} 
                  className="inline-block bg-blue-800 text-white px-6 py-2 rounded text-sm font-medium hover:bg-blue-700 transition"
                >
                  Chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-10">
          <Link 
            to="/projects" 
            className="inline-flex items-center text-white border border-white px-6 py-2 rounded hover:bg-white hover:text-blue-800 transition-colors"
          >
            Xem tất cả
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects; 