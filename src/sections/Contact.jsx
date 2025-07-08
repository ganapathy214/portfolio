//eslint-disable-next-line
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import ShinyText from "../common/ShinyText";
import SectionLayout from "../layout/SectionLayout";

const ContactInfoCard = ({ icon, label, value, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group relative cursor-pointer overflow-hidden bg-white/10 px-6 pt-10 pb-8 shadow-xl ring-1 ring-sky-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl rounded-lg"
    >
      <span className="absolute top-12 z-0 h-20 w-20 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10]" />
      <div className="relative z-10 mx-auto max-w-md">
        <div className="flex gap-10 items-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-white group-hover:text-sky-500">
            {icon}
          </span>
          <div className="space-y-4 pt-5 leading-7 transition-all duration-300 group-hover:text-black">
            <div className="text-2xl font-semibold">{label}</div>
            <div>{value}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const contactRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:info@example.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <SectionLayout
      id="contact"
      label="Where to find me ?"
      headerRef={contactRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <ContactInfoCard
          label="Address"
          value="Coimbatore, Tamil Nadu, India"
          delay={0.1}
          icon={<CiLocationOn size={40} />}
        />
        <ContactInfoCard
          label="Phone"
          value="+91 8778144579"
          delay={0.2}
          icon={<CiPhone size={40} />}
        />
        <ContactInfoCard
          label="Email"
          value="info@example.com"
          delay={0.3}
          icon={<CiMail size={40} />}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <motion.iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.50873824842!2d76.967235!3d11.013968899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1750425272393!5m2!1sen!2sin"
          className="w-full md:w-1/2 rounded border"
          allowFullScreen=""
          loading="lazy"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        />

        <motion.form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 p-8 rounded-lg shadow-lg flex flex-col gap-4 bg-white/5 backdrop-blur-md border border-sky-500"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <ShinyText
            text="Contact Form"
            disabled={false}
            speed={5}
            className="text-2xl text-center text-sky-400 mb-4"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 border rounded w-full border-gray-700 bg-black/30 text-white"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 border rounded w-full border-gray-700 bg-black/30 text-white"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="p-3 border rounded w-full border-gray-700 bg-black/30 text-white"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Message"
            className="p-3 border rounded w-full border-gray-700 bg-black/30 text-white h-32 resize-none"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          ></textarea>
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded transition self-end"
          >
            Send via Email
          </button>
        </motion.form>
      </div>
    </SectionLayout>
  );
};

export default Contact;
