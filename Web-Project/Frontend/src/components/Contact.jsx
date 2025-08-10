import React, { useEffect } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  return (
    <section className="relative bg-white">
      <div className="contact-us-container bg-white py-20 md:py-20 px-4 md:px-8 lg:px-24 relative overflow-hidden">
        {/* Hero Section */}
        <section className="hero-section text-center py-6 md:py-10 relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            Get in Touch
          </h1>
          <p className="text-md md:text-xl mt-4 text-gray-600 max-w-2xl mx-auto">
            I am  here to answer any questions you may have. Reach out to me,
            and i will respond as soon as i can.
          </p>
        </section>

        {/* Contact Information */}
        <section className="contact-info my-8 md:my-16 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="contact-card p-6 md:p-8 bg-white shadow-lg border border-[#1e181a] rounded-lg text-center transition-transform transform hover:-translate-y-2 hover:shadow-lg">
              <FaMapMarkerAlt className="text-[#1e181a] text-3xl md:text-4xl mx-auto mb-4" />
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                Our Office
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-4">
                SJB Institute of Technology, Bengaluru-560060
              </p>
            </div>

            <div className="contact-card p-6 md:p-8 bg-white shadow-lg border border-[#1e181a] rounded-lg text-center transition-transform transform hover:-translate-y-2 hover:shadow-lg z-10">
              <FaEnvelope className="text-[#1e181a] text-3xl md:text-4xl mx-auto mb-4" />
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                Email Us
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-4 break-words">
                <a
                  href="mailto:support@predictdisasters.com"
                  className="text-[#1e181a] hover:text-yellow-800 transition-colors"
                >
                  support@predictdisasters.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Contact;
