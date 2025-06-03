import { Link } from 'react-router-dom';

const ErgonomicChairBanner = () => {
  return (
    <div className="my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-lg overflow-hidden">
          {/* Background image */}
          <div className="relative h-[400px] md:h-[500px] bg-blue-900">
            <img 
              src="https://noithat52.mauthemewp.com/wp-content/uploads/2023/11/banner-ghe-cong-thai-hoc.jpg" 
              alt="Ghế công thái học" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content overlay - will be empty as the image already has the text */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="md:w-1/2 md:ml-auto">
                {/* This section is for additional content if needed */}
                <Link
                  to="/products/ergonomic-chairs"
                  className="mt-8 inline-block bg-white text-blue-800 px-6 py-3 rounded-full text-base font-medium hover:bg-blue-50 transition-colors"
                >
                  Khám phá ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErgonomicChairBanner; 