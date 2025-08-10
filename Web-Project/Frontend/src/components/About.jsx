import React from "react";
import Aarushi from "../assets/Aarushi.jpg";

const About = () => {
  return (
    <section className="bg-white mt-10">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
            About Me
          </h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl">
            I am passionate about technology and AI, dedicated to transforming disaster prediction through innovative machine learning techniques.
          </p>
        </div>

        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-1">
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex">
            <a href="#">
              <img
                className="w-[400px] h-[200px] rounded-lg sm:rounded-none sm:rounded-l-lg"
                src={Aarushi}
                alt="Sinchana Hegde Avatar"
              />
            </a>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900">
                <a href="#">Sinchana Hegde</a>
              </h3>
              <span className="text-gray-500">Project Developer</span>
              <p className="mt-3 mb-4 font-light text-gray-500">
                With a deep passion for technology and AI, I undertook this project to transform disaster prediction through machine learning.
              </p>
              {/* Social links here if needed */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
