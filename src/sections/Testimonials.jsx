import React, { useEffect, useRef, useState } from "react";
//eslint-disable-next-line
import { motion } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCodeBranch,
  FaLaptopCode,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";
import { TbSettingsAutomation } from "react-icons/tb";
import ShinyText from "../common/ShinyText";
import SpotlightCard from "../common/SpotlightCard";
import VariableProximity from "../common/VariableProximity";

export default function Honour() {
  const aboutRef = useRef(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  // Experience calculation
  const joiningDate = new Date(2022, 9); // October 2022
  const now = new Date();
  const yearsOfExperience =
    (now - joiningDate) / (1000 * 60 * 60 * 24 * 365.25); // as number

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "CEO, TechCorp",
      content: "This product revolutionized our workflow. Highly recommended!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Marketing Manager",
      content: "Incredible results in just a few weeks. Our team loves it!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Freelance Designer",
      content:
        "As a designer, I appreciate the intuitive interface and powerful features.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
  ];

  const serviceList = [
    {
      id: 1,
      title: "Web & Mobile Dev't",
      description: "Responsive and SEO-friendly full-stack apps.",
      icon: FaLaptopCode,
    },
    {
      id: 2,
      title: "API & DB Integration",
      description: "Secure APIs with seamless data handling.",
      icon: FaCodeBranch,
    },
    {
      id: 3,
      title: "Version Control & Deployment",
      description: "Streamlined code delivery with Git workflows.",
      icon: FaCodeBranch,
    },
    {
      id: 4,
      title: "Automation Testing",
      description: "Reliable, scalable test automation for projects.",
      icon: TbSettingsAutomation,
    },
  ];

  const summaryStats = [
    { value: 6, label: "Happy Clients" },
    {
      value: yearsOfExperience.toFixed(1),
      label: "Years of Experience",
      decimals: 1,
    },
    { value: 10, label: "Projects" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // eslint-disable-next-line no-unused-vars
  function ServiceCard({ title, description, Icon }) {
    return (
      <div className="bg-white/10 rounded-xl p-6 text-center hover:shadow-sm hover:shadow-sky-400  transition">
        <div className="flex justify-center items-center w-14 h-14 mx-auto bg-sky-400 rounded-full mb-4 text-black text-3xl">
          <Icon />
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-200">{description}</p>
      </div>
    );
  }

  return (
    <motion.section id="honour" className="min-h-screen pt-8">
      <div
        ref={aboutRef}
        className="text-5xl text-end mb-4 text-sky-400 border-b-4"
        style={{ position: "relative" }}
      >
        <VariableProximity
          label={"What they said ?"}
          className={"variable-proximity-demo"}
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={aboutRef}
          radius={100}
          falloff="linear"
        />
      </div>
      <SpotlightCard className="custom-spotlight-card flex justify-evenly p-8">
        {/* Stats */}
        <div className="flex flex-col justify-center items-center">
          <div className="flex sm:flex-col justify-center mt-4 sm:mt-0 sm:gap-8 gap-2 bg-gray-700/60 sm:bg-transparent p-4 rounded-lg z-10">
            {summaryStats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:items-end items-center"
              >
                <div className="inline-flex gap-1 items-center">
                  <h2 className="xl:text-8xl md:text-6xl sm:text-4xl text-3xl font-semibold">
                    {/* <CountUp
                        end={stat.value}
                        duration={1.5}
                        decimals={stat.decimals || 0}
                      /> */}
                    {stat.value}
                  </h2>
                  <h2 className="text-sky-400 text-8xl font-extrabold">+</h2>
                </div>
                <div>
                  <ShinyText
                    text={stat.label}
                    disabled={false}
                    speed={5}
                    className="custom-class"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-3/5">
          <div className="relative rounded-3xl p-6 border border-sky-400 select-none hover:shadow-lg hover:shadow-sky-400 backdrop-blur">
            <div className="flex gap-10">
              <FaQuoteLeft className="text-4xl text-sky-400 mb-4" />
              <p className="text-xl italic mb-4">
                {testimonials[currentTestimonial].content}
              </p>
            </div>

            <div className="flex items-center">
              <img
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-sm text-gray-600">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, index) => (
                    <FaStar key={index} className="text-sky-400" />
                  )
                )}
              </div>
              <div className="flex">
                <button
                  onClick={prevTestimonial}
                  className="bg-purple-500 text-white p-2 rounded-full mr-2 hover:bg-purple-600 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600 transition-colors"
                  aria-label="Next testimonial"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.section>
  );
}
