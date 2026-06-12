import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import ShinyText from "../common/ShinyText";
import SectionLayout from "../layout/SectionLayout";
import { CONTACT_INFO } from "../const";

const ContactInfoCard = ({ icon, label, value, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="group relative cursor-pointer overflow-hidden p-5 flex items-center gap-4 text-left corner-card"
      style={{ borderRadius: "14px" }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, #00D5D5, transparent)" }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
        style={{
          background: "rgba(0,213,213,0.07)",
          border: "1px solid rgba(0,213,213,0.15)",
          color: "#00D5D5",
        }}
      >
        {icon}
      </div>

      {/* Info */}
      <div className="flex flex-col min-w-0">
        <span className="section-number mb-0.5">{label}</span>
        <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-primary transition-colors duration-300 break-words">
          {value}
        </span>
      </div>
    </motion.div>
  );
};

const INPUT_CLASS =
  "w-full border px-4 py-3 text-xs sm:text-sm text-white placeholder-stone-600 outline-none transition-all duration-300 font-medium"
  + " focus:border-primary focus:shadow-[0_0_0_1px_rgba(0,213,213,0.2)]";

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
    const mailtoLink = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
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
      spotlightColor="rgba(0, 213, 213, 0.06)"
      textColorClass="text-[#00D5D5]"
    >
      <div className="w-full space-y-8 py-2">
        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none">
          <ContactInfoCard
            label="Location"
            value={CONTACT_INFO.address}
            delay={0.1}
            icon={<CiLocationOn className="text-2xl sm:text-3xl" />}
          />
          <ContactInfoCard
            label="Phone"
            value={CONTACT_INFO.phone}
            delay={0.2}
            icon={<CiPhone className="text-2xl sm:text-3xl" />}
          />
          <ContactInfoCard
            label="Email"
            value={CONTACT_INFO.email}
            delay={0.3}
            icon={<CiMail className="text-2xl sm:text-3xl" />}
          />
        </div>

        {/* Map & Form */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Map */}
          <motion.div
            className="w-full lg:w-1/2 overflow-hidden min-h-[280px] lg:min-h-0 relative corner-card"
            style={{ borderRadius: "16px" }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Map label */}
            <div
              className="absolute top-3 left-3 z-10 tag-primary text-[9px]"
              style={{ pointerEvents: "none" }}
            >
              📍 Location
            </div>
            <iframe
              title="Google Maps"
              src={CONTACT_INFO.googleMapsUrl}
              className="w-full h-full min-h-[280px] absolute inset-0 border-none opacity-75 grayscale contrast-125"
              allowFullScreen=""
              loading="lazy"
            />
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="w-full lg:w-1/2 flex flex-col gap-4 text-left corner-card"
            style={{ borderRadius: "16px", padding: "28px 24px" }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {/* Form header */}
            <div className="mb-1">
              <ShinyText
                text="Send a Message"
                disabled={false}
                speed={5}
                className="text-xl sm:text-2xl font-black text-primary select-none"
              />
              <p className="text-xs text-stone-600 mt-1 select-none">
                For custom projects, consulting, or new opportunities.
              </p>
            </div>

            {/* Name & Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name"
                className={INPUT_CLASS}
                style={{
                  background: "rgba(0,0,0,0.5)",
                  borderColor: "rgba(255,255,255,0.07)",
                  borderRadius: "8px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className={INPUT_CLASS}
                style={{
                  background: "rgba(0,0,0,0.5)",
                  borderColor: "rgba(255,255,255,0.07)",
                  borderRadius: "8px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            {/* Subject */}
            <input
              type="text"
              placeholder="Subject"
              className={INPUT_CLASS}
              style={{
                background: "rgba(0,0,0,0.5)",
                borderColor: "rgba(255,255,255,0.07)",
                borderRadius: "8px",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />

            {/* Message */}
            <textarea
              placeholder="Your message..."
              className={INPUT_CLASS + " h-28 resize-none"}
              style={{
                background: "rgba(0,0,0,0.5)",
                borderColor: "rgba(255,255,255,0.07)",
                borderRadius: "8px",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />

            {/* Submit */}
            <button
              type="submit"
              className="primary_button self-start cursor-pointer"
            >
              Send Message →
            </button>
          </motion.form>
        </div>
      </div>
    </SectionLayout>
  );
};

export default React.memo(Contact);
