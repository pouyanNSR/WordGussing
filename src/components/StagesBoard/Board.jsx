import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import GameStageButtons from "./GameStageButtons";
import FloatingParticle from "./parts/FloatingParticle";
import GlowingRings from "./GlowingRings";

// انیمیشن stagger برای ورود دکمه‌ها
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const Board = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at center, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        direction: "rtl", // پشتیبانی از راست‌چین فارسی
      }}
    >
      {/* ذرات پس‌زمینه */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle
          key={i}
          delay={Math.random() * 2}
          size={Math.random() * 8 + 4}
          top={Math.random() * 100}
          left={Math.random() * 100}
        />
      ))}
      <Box sx={{width:{xs:"95vw",md:"100vw"}}}>
        <Container
          maxWidth="md"
          sx={{ position: "relative", zIndex: 1, mt:{xs:0,md:5}}}
        >
          {/* {/ عنوان بازی /} */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              align="center"
              sx={{
                fontSize:{xs:"33px",lg:"55px"},
                fontWeight: 900,
                mb:{xs:3,md: 6},
                textShadow:
                  "0 0 20px rgba(255,215,0,0.7), 0 0 40px rgba(255,255,255,0.3)",
                background:
                  "linear-gradient(to right, #ffd700, #ffaa00, #ffd700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "tanha",
                letterSpacing: "2px",
              }}
            >
              👾 مراحل بازی
            </Typography>
          </motion.div>

          {/* {/ شبکه دکمه‌های مراحل */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={{xs:2,md:4}} justifyContent="center">
              <GameStageButtons />
            </Grid>
          </motion.div>
          <Typography
            sx={{
              color: "whitesmoke",
              fontSize: "10px",
              textAlign: "center",
              my: 3,
              textShadow: "0 0 6px white",
            }}
          >
            طراحی و توسعه با پویان
          </Typography>
        </Container>
      </Box>
      {/* حلقه‌های نورانی تزئینی */}
      <GlowingRings />
    </Box>
  );
};

export default Board;
