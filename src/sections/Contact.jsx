import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import ShinyText from "../common/ShinyText";
import SectionLayout from "../layout/SectionLayout";
import { CONTACT_INFO, INPUT_CLASS } from "../constants";

const ContactInfoCard = ({ icon, label, value, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="group relative cursor-pointer overflow-hidden p-5 flex items-center gap-4 text-left corner-card"
      style={{ borderRadius: "14px" }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, var(--primary), transparent)" }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
        style={{
          background: "rgba(var(--primary-rgb),0.07)",
          border: "1px solid rgba(var(--primary-rgb),0.15)",
          color: "var(--primary)",
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
      spotlightColor="rgba(var(--primary-rgb), 0.06)"
      textColorClass="text-primary"
    >
      <div className="w-full min-h-[78vh] flex flex-col gap-6 py-2">
        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none shrink-0">
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
        <div className="flex-1 flex flex-col lg:flex-row gap-6 items-stretch min-h-[350px] lg:min-h-0">
          {/* Map */}
          <motion.div
            className="w-full lg:w-1/2 overflow-hidden min-h-[350px] lg:min-h-0 relative corner-card"
            style={{ borderRadius: "16px" }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <iframe
              title="Google Maps"
              src={CONTACT_INFO.googleMapsUrl}
              className="w-full h-full absolute inset-0 border-none"
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
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
      </div >
    </SectionLayout >
  );
};

export default React.memo(Contact);
