import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">LIÊN HỆ</h1>
        <p className="text-gray-600">
          Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <ContactInfo />
        
        {/* Contact Form */}
        <ContactForm />
      </div>

      {/* Map */}
      <div className="mt-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6963246223586!2d105.7924!3d21.0286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAxJzQzLjAiTiAxMDXCsDQ3JzMyLjYiRQ!5e0!3m2!1svi!2s!4v1629789345678!5m2!1svi!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  );
}

