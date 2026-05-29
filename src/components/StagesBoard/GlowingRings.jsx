import { Box } from "@mui/material";
import { motion } from "motion/react";
import React from "react";

const GlowingRings = () => {
  return (
    <>
      {/* حلقه‌های نورانی تزئینی */}
      <Box
        component={motion.div}
        sx={{
          position: "absolute",
          bottom: -50,
          left: -50,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <Box
        component={motion.div}
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
};

export default GlowingRings;
