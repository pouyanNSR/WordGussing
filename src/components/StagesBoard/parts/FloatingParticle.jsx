import { motion } from "framer-motion";

// ذرات پس‌زمینه (ستاره‌های شناور)
const FloatingParticle = ({ delay, size, top, left }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,215,0,0.4) 100%)",
        boxShadow: "0 0 10px rgba(255,215,0,0.8)",
        zIndex: 0,
      }}
      animate={{
        y: [0, -20, 10],
        opacity: [0.2, 0.8, 0.4],
        scale: [0.8, 1.2, 0.9],
      }}
      transition={{
        duration: 3 + delay,
        repeat: Infinity,
        repeatType: "reverse",
        delay: delay,
      }}
    />
  );
};

export default FloatingParticle;
