import { useState, useEffect } from 'react';

const ServiceBanners = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const banners = [
    {
      id: 1,
      image: 'https://noithat52.mauthemewp.com/wp-content/uploads/2023/11/banner-phu-4.jpg',
      alt: 'Tư vấn thiết kế văn phòng miễn phí'
    },
    {
      id: 2,
      image: 'https://noithat52.mauthemewp.com/wp-content/uploads/2023/11/banner-phu-5-1.jpg',
      alt: 'Giao hàng toàn quốc'
    },
    {
      id: 3,
      image: 'https://noithat52.mauthemewp.com/wp-content/uploads/2023/11/banner-phu-6-1.jpg',
      alt: 'Dịch vụ nội thất'
    },
    {
      id: 4,
      image: 'https://noithat52.mauthemewp.com/wp-content/uploads/2023/11/banner-phu-6-1.jpg',
      alt: 'Sản phẩm nội thất'
    }
  ];

  // Calculate number of slides (showing 2 banners per slide)
  const totalSlides = Math.ceil(banners.length / 2);

  // Auto rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [totalSlides]);

  // Handle navigation
  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 rounded-full p-2 -ml-4 text-white"
            onClick={prevSlide}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 rounded-full p-2 -mr-4 text-white"
            onClick={nextSlide}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide container */}
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full flex gap-4">
                  {banners.slice(slideIndex * 2, slideIndex * 2 + 2).map((banner) => (
                    <div key={banner.id} className="w-1/2">
                      <img 
                        src={banner.image} 
                        alt={banner.alt} 
                        className="w-full h-auto rounded-lg" 
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBanners; 