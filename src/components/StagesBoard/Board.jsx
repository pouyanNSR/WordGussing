import React from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";
import GameStageButtons from "./GameStageButtons";
import FloatingParticle from "./parts/FloatingParticle";
import GlowingRings from "./GlowingRings";
import styled from "@emotion/styled";
import { useGameActions } from "../../context/GameContext";

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
const StyledButton = styled(Button)(({ theme }) => ({
  padding: { xs: "10px 28px", md: "16px 48px" },
  fontSize: { xs: "1rem", md: "1.5rem" },
  fontWeight: "bold",
  borderRadius: "50px",
  background: "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)",
  color: "#1A1A2E",
  border: "2px solid rgba(255,255,255,0.3)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  position: "relative",
  zIndex: 2,
  transformStyle: "preserve-3d",
  transform: "perspective(500px) rotateX(2deg)",
  boxShadow: `
    0 10px 25px rgba(0,0,0,0.5),
    0 0 20px rgba(255,215,0,0.4),
    inset 0 -4px 8px rgba(0,0,0,0.3),
    inset 0 4px 8px rgba(255,255,255,0.2)
  `,
  transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "&:hover": {
    background: "linear-gradient(135deg, #FFE55C 0%, #FFA500 100%)",
    boxShadow: `
      0 15px 35px rgba(0,0,0,0.6),
      0 0 40px rgba(255,215,0,0.9),
      inset 0 -6px 12px rgba(0,0,0,0.4),
      inset 0 6px 12px rgba(255,255,255,0.3)
    `,
    transform: "perspective(500px) rotateX(1deg) scale(1.08)",
  },
  "&:active": {
    transform: "perspective(500px) rotateX(3deg) scale(0.95)",
    boxShadow: `
      0 5px 15px rgba(0,0,0,0.7),
      0 0 15px rgba(255,215,0,0.5)
    `,
  },
}));

const Board = () => {
  const { handleResetButton } = useGameActions();

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        py: 2,
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
      <Box sx={{ width: { xs: "95vw", md: "100vw" } }}>
        <Container
          maxWidth="md"
          sx={{ position: "relative", zIndex: 1, mt: { xs: 0, md: 5 } }}
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
                fontSize: { xs: "33px", lg: "55px" },
                fontWeight: 900,
                mb: { xs: 3, md: 6 },
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
            <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
              <GameStageButtons />
            </Grid>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.8,delay: 3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              style={{
                perspective: "500px",
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <StyledButton
                onClick={handleResetButton}
                size="large"
                disableRipple
              >
                شروع مجدد
              </StyledButton>
            </motion.div>
          </motion.div>
        </Container>
      </Box>
      {/* حلقه‌های نورانی تزئینی */}
      <GlowingRings />
    </Box>
  );
};

export default Board;
