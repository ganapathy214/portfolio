import React from "react";
import heroBg from "../assets/hero-bg.png";
import TextPressure from "../common/TextPressure";
//eslint-disable-next-line
import { motion } from "framer-motion";

const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-start text-white relative"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "70%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right -80% bottom 85%",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-10 ml-25">
        <motion.div
          className="text-center backdrop-blur-sm bg-black/40 px-6 py-10 rounded"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="split-text-container">
            <span className="text-part left text-sky-400">GANA</span>
            <span className="text-part right text-sky-400">PATHY N</span>
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
              minFontSize={36}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Home);
