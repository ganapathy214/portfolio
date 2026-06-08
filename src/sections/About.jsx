//eslint-disable-next-line
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import avatar from "../assets/avatar.png";
import resumePdf from "../assets/resume.pdf";

import ProfileCard from "../common/ProfileCard";
import { useTypewriter } from "../common/utils/hooks/useTypewriter";
import { PROFESSIONAL_TITLES, SOCIAL_LINKS } from "../const";
import SectionLayout from "../layout/SectionLayout";
import { PrimaryButton, SecondaryButton } from "../common/Buttons";

const ICONS = {
  FaLinkedinIn,
  FaGithub,
};

const SocialLinks = () => (
  <div className="icon_card flex mt-4">
    {SOCIAL_LINKS.map(({ href, icon, label, containerClass }) => {
      const IconComponent = ICONS[icon];
      return (
        <a
          key={label}
          className={`socialContainer ${containerClass}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        >
          <IconComponent className="text-2xl text-white transition-colors duration-300" />
        </a>
      );
    })}
  </div>
);

const About = () => {
  const headerRef = useRef(null);
  const typewriterText = useTypewriter(PROFESSIONAL_TITLES);

  return (
    <SectionLayout id="about" label="Who am I ?" headerRef={headerRef}>
      <div className="w-full min-h-[78vh] flex flex-col md:flex-row justify-center items-center gap-8 md:gap-10">
        {/* ProfileCard (Image) - Show first on mobile */}
        <motion.div className="flex flex-col items-center order-1 md:order-2 mb-6 md:mb-0">
          <ProfileCard
            name="Ganapathy N"
            title="Senior Frontend & Full Stack Developer"
            avatarUrl={avatar}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          <div className="flex gap-4 mt-4">
            <PrimaryButton
              onClick={() => {
                const link = document.createElement("a");
                link.href = resumePdf;
                link.download = "Ganapathy_N_Resume.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download CV
            </PrimaryButton>
            <SecondaryButton
              onClick={() => {
                const link = document.createElement("a");
                link.href = resumePdf;
                link.download = "Ganapathy_N_Resume.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Hire Me
            </SecondaryButton>
          </div>
        </motion.div>

        {/* About Text */}
        <motion.div className="w-full md:w-7/12 relative order-2 md:order-1">
          <div className="absolute left-[40%] -top-6 md:-left-16 lg:top-0 md:top-6 rotate-0 md:rotate-[-90deg] text-sm tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-16 h-[2px] bg-white" />
              <p className="text-sky-400">ABOUT</p>
            </div>
          </div>

          <div className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 pl-2 sm:pl-10 text-sky-400">
            A Passionate <br />
            <span>
              {typewriterText}
              <span className="blinking-cursor">|</span>
            </span>
          </div>

          <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed max-w-3xl mx-auto md:mx-0">
            Senior Frontend & Full Stack Developer with 6+ years of experience specializing in React.js, Next.js, React Native, TypeScript, and modern JavaScript ecosystems. I design and build high-performance, accessible, and scalable enterprise web and mobile applications. With hands-on expertise spanning state management (Redux Toolkit, Zustand, React Query), UI systems, backend APIs (Node.js, Express.js), and AWS cloud DevOps architectures, I collaborate to deliver modern solutions aligned with business goals.
          </p>
          <SocialLinks />
        </motion.div>
      </div>
    </SectionLayout>
  );
};

export default React.memo(About);
