import React from "react";
import heroBg from "../assets/hero-bg.png";
import globeGif from "../assets/globegif.gif";
import TextPressure from "../common/TextPressure";
//eslint-disable-next-line
import { motion } from "framer-motion";

const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center md:justify-start text-white relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "60%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right -80% bottom 85%",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-6 sm:gap-10 w-full px-4 sm:px-8 md:ml-10 lg:ml-16">
        <motion.div
          className="relative text-center backdrop-blur-sm bg-black/40 px-4 sm:px-8 py-8 sm:py-10 rounded w-full max-w-2xl overflow-visible"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Faint 3D Globe Watermark */}
          <div
            className="absolute -left-10 sm:-left-80 top-1/2 -translate-y-1/2 -z-10 opacity-[0.28] pointer-events-none select-none mix-blend-screen"
          >
            <img
              src={globeGif}
              alt="Globe Watermark"
              className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[800px] md:h-[800px] object-contain"
            />
          </div>

          <div className="split-text-container justify-center">
            <span className="text-part left text-sky-400">GANA</span>
            <span className="text-part right text-sky-400">PATHY</span>
          </div>
          <motion.div
            style={{ position: "relative" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            <TextPressure
              text="Senior Software Developer"
              flex
              alpha={false}
              stroke={false}
              width
              weight
              italic
              textColor="#ffffff"
              strokeColor="#ff0000"
              minFontSize={20}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Home);
