import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import ShinyText from "../components/common/ShinyText";
import SectionLayout from "../layouts/SectionLayout";
import { CONTACT_INFO, INPUT_CLASS } from "../constants";
import { usePortfolio } from "../context/PortfolioContext";

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

const Contact = ({ contactInfo, title, sectionNum, design = "design1" }) => {
  const contactRef = useRef(null);
  const info = contactInfo || CONTACT_INFO;
  
  const { sectionLayouts } = usePortfolio();
  const activeDesign = design || sectionLayouts?.Contact || "design1";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:${info.email}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const renderForm = (compact = false) => (
    <div className="flex flex-col gap-4 text-left w-full">
      <div className="mb-1 select-none">
        <ShinyText
          text={info.formTitle || "Send a Message"}
          disabled={false}
          speed={5}
          className="text-xl sm:text-2xl font-black text-primary"
        />
        <p className="text-xs text-stone-600 mt-1">
          {info.formSubtitle || "For custom projects, consulting, or new opportunities."}
        </p>
      </div>

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

      <textarea
        placeholder="Your message..."
        className={INPUT_CLASS + (compact ? " h-24 resize-none" : " h-28 resize-none")}
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

      <button
        type="submit"
        className="primary_button self-start cursor-pointer"
      >
        Send Message →
      </button>
    </div>
  );

  return (
    <SectionLayout
      id="contact"
      label={title || "Where to find me ?"}
      headerRef={contactRef}
      spotlightColor="rgba(var(--primary-rgb), 0.06)"
      textColorClass="text-primary"
      sectionNum={sectionNum}
    >
      <div className="w-full py-2">
        {/* DESIGN 1: Original Split Screen Layout (Info Cards Top + Map/Form split) */}
        {activeDesign === "design1" && (
          <div className="w-full flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none shrink-0">
              <ContactInfoCard
                label="Location"
                value={info.address}
                delay={0.1}
                icon={<CiLocationOn className="text-2xl sm:text-3xl" />}
              />
              <ContactInfoCard
                label="Phone"
                value={info.phone}
                delay={0.2}
                icon={<CiPhone className="text-2xl sm:text-3xl" />}
              />
              <ContactInfoCard
                label="Email"
                value={info.email}
                delay={0.3}
                icon={<CiMail className="text-2xl sm:text-3xl" />}
              />
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-6 items-stretch min-h-[350px]">
              <motion.div
                className="w-full lg:w-1/2 overflow-hidden min-h-[350px] relative corner-card flex flex-col justify-center items-center p-6 text-center select-none"
                style={{ borderRadius: "16px" }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {info.googleMapsUrl ? (
                  <iframe
                    title="Google Maps"
                    src={info.googleMapsUrl}
                    className="w-full h-full absolute inset-0 border-none"
                    allowFullScreen=""
                    loading="lazy"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 opacity-20 pointer-events-none filter blur-3xl" style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 65%)" }} />
                    <motion.div 
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6 relative z-10 border"
                      style={{ background: "rgba(var(--primary-rgb), 0.08)", borderColor: "rgba(var(--primary-rgb), 0.25)", color: "var(--primary)" }}
                      animate={{ boxShadow: ["0 0 0 0 rgba(var(--primary-rgb), 0)", "0 0 0 15px rgba(var(--primary-rgb), 0.15)", "0 0 0 30px rgba(var(--primary-rgb), 0)"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    >
                      <CiLocationOn className="text-4xl" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-2 relative z-10">Current Headquarters</h3>
                    <p className="text-sm text-stone-300 font-semibold mb-4 max-w-sm relative z-10 leading-relaxed">{info.address || "Coimbatore, Tamil Nadu, India"}</p>
                    <div className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider relative z-10 border" style={{ background: "rgba(var(--primary-rgb), 0.05)", borderColor: "rgba(var(--primary-rgb), 0.15)", color: "var(--primary)" }}>
                      🌍 Open to Remote & Relocation
                    </div>
                  </>
                )}
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="w-full lg:w-1/2 flex flex-col gap-4 text-left corner-card"
                style={{ borderRadius: "16px", padding: "28px 24px" }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                {renderForm(false)}
              </motion.form>
            </div>
          </div>
        )}

        {/* DESIGN 2: Centered Minimal Form (No Map, Inline details below) */}
        {activeDesign === "design2" && (
          <div className="max-w-2xl mx-auto flex flex-col gap-8">
            <motion.form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4 text-left corner-card"
              style={{ borderRadius: "16px", padding: "28px 24px" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {renderForm(true)}
            </motion.form>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs text-stone-400 select-none">
              <div className="p-3 border border-stone-850 rounded-xl bg-stone-900/10">
                <div className="text-primary font-bold mb-1">Location</div>
                <div className="text-white font-semibold">{info.address}</div>
              </div>
              <div className="p-3 border border-stone-850 rounded-xl bg-stone-900/10">
                <div className="text-primary font-bold mb-1">Phone</div>
                <div className="text-white font-semibold">{info.phone}</div>
              </div>
              <div className="p-3 border border-stone-850 rounded-xl bg-stone-900/10">
                <div className="text-primary font-bold mb-1">Email</div>
                <div className="text-white font-semibold">{info.email}</div>
              </div>
            </div>
          </div>
        )}

        {/* DESIGN 3: Left Form, Right Details Card Grid */}
        {activeDesign === "design3" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
            <motion.form
              onSubmit={handleSubmit}
              className="lg:col-span-7 flex flex-col gap-4 corner-card"
              style={{ borderRadius: "16px", padding: "28px 24px" }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {renderForm(false)}
            </motion.form>

            <div className="lg:col-span-5 flex flex-col gap-4 select-none">
              <ContactInfoCard
                label="Primary Residence"
                value={info.address}
                delay={0.1}
                icon={<CiLocationOn className="text-2xl" />}
              />
              <ContactInfoCard
                label="Direct Line"
                value={info.phone}
                delay={0.2}
                icon={<CiPhone className="text-2xl" />}
              />
              <ContactInfoCard
                label="Business Inquiries"
                value={info.email}
                delay={0.3}
                icon={<CiMail className="text-2xl" />}
              />
            </div>
          </div>
        )}

        {/* DESIGN 4: Typographic Flat layout */}
        {activeDesign === "design4" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-left">
            <div className="lg:col-span-5 flex flex-col justify-between py-2 select-none">
              <div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                  Let's start <br />
                  something <span className="text-primary">great</span>.
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-sm">
                  Whether you have a question, a project idea, or just want to say hi, feel free to reach out.
                </p>
              </div>

              <div className="space-y-4 mt-8 font-mono text-xs text-stone-400">
                <div className="flex gap-3 items-center">
                  <CiLocationOn className="text-primary text-xl shrink-0" />
                  <span>{info.address}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <CiPhone className="text-primary text-xl shrink-0" />
                  <span>{info.phone}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <CiMail className="text-primary text-xl shrink-0" />
                  <span className="hover:text-primary transition-colors">{info.email}</span>
                </div>
              </div>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              className="lg:col-span-7 flex flex-col gap-4 border border-stone-850 p-6 sm:p-8 rounded-2xl bg-stone-900/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {renderForm(true)}
            </motion.form>
          </div>
        )}

        {/* DESIGN 5: Elegant Glass Banner Card */}
        {activeDesign === "design5" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full bg-stone-900/30 border border-stone-850 rounded-[2rem] p-6 sm:p-10 lg:p-12 relative overflow-hidden z-10 flex flex-col md:flex-row gap-10 items-stretch"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="flex-1">
              <form onSubmit={handleSubmit}>
                {renderForm(true)}
              </form>
            </div>

            <div className="w-full md:w-80 shrink-0 bg-stone-950/60 border border-stone-850 rounded-2xl p-6 flex flex-col justify-between text-left select-none">
              <div>
                <span className="text-[9px] font-mono text-primary bg-primary/5 border border-primary/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Contact Details
                </span>
                <div className="mt-6 space-y-6">
                  <div>
                    <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Office Location</div>
                    <div className="text-sm font-bold text-white mt-1">{info.address}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Phone number</div>
                    <div className="text-sm font-bold text-white mt-1">{info.phone}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Email address</div>
                    <div className="text-sm font-bold text-white mt-1">{info.email}</div>
                  </div>
                </div>
              </div>

              <div className="text-[9px] font-bold text-stone-600 tracking-wider uppercase pt-6 border-t border-stone-850/60 mt-6">
                ⚡ Response within 24 hours
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </SectionLayout>
  );
};

export default React.memo(Contact);
