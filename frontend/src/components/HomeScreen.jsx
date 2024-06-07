import React, { useState, useEffect } from "react";
import paris from "../assets/images/paris.jpg";
import japan from "../assets/images/japan.jpg";
import tokyo from "../assets/images/tokyo.jpg";

const images = [
  { src: paris, title: "Paris", description: "City of Love" },
  { src: japan, title: "Japan", description: "Land of the Rising Sun" },
  { src: tokyo, title: "Tokyo", description: "City of Modernity" },
];

const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const handleNextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const { src, title, description } = images[currentIndex];
  return (
    <div className="overflow-x-hidden">
      {/* Banner */}
      <section className="h-screen relative">
        <div className="absolute inset-0">
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg md:text-xl mb-8">{description}</p>
          <button className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white font-bold py-2 px-5 rounded-lg transition-colors duration-300">
            Explore
          </button>
        </div>
      </section>
      <section className="bg-gray-900 py-8 md:py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <img
                src={tokyo}
                alt="Destination 2"
                className="w-full h-48 md:h-64 object-cover object-center rounded-lg shadow-lg"
              />
            </div>
            <div className="text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Tokyo</h3>
              <p className="mb-6">
                Tokyo is a vibrant metropolis that blends the old and the new.
                Explore the futuristic skyscrapers, ancient temples, and
                bustling streets for an unforgettable experience.
              </p>
              <a
                href="#"
                className="bg-blue-500 bg-opacity-50 hover:bg-opacity-75 text-white font-bold py-2 px-5 rounded-lg transition-colors duration-300"
              >
                Explore Tokyo
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
