import { motion } from "framer-motion";

const PARTICLE_COUNT = 40;

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

const particles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
  id: i,
  x: randomBetween(0, 100),
  y: randomBetween(0, 100),
  size: randomBetween(8, 32),
  opacity: randomBetween(0.2, 0.7),
  color: `hsl(${randomBetween(180, 220)}, 100%, 70%)`,
}));

export default function DraggableParticles() {
  return (
    <motion.div
      className="fixed inset-0 -z-10"
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.2}
      transition={{ type: "spring", stiffness: 60, damping: 20 }}
    >
      <svg
        width="100vw"
        height="100vh"
        style={{ width: "100vw", height: "100vh" }}
      >
        {particles.map((p) => (
          <motion.circle
            key={p.id}
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r={p.size}
            fill={p.color}
            opacity={p.opacity}
            animate={{
              r: [p.size, p.size * 1.2, p.size],
              opacity: [p.opacity, p.opacity * 1.2, p.opacity],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: randomBetween(2, 5),
              delay: randomBetween(0, 2),
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
