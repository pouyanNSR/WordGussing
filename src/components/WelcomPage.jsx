import React, { useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useGameActions } from "../context/GameContext";

// ---------- انیمیشن‌های کلیدی ----------
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
  50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
  100% { transform: translateY(0px) rotate(360deg); opacity: 0.7; }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.4), 0 0 60px rgba(255, 140, 0, 0.3); }
  50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.8), 0 0 90px rgba(255, 140, 0, 0.6); }
  100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.4), 0 0 60px rgba(255, 140, 0, 0.3); }
`;

const textShadow = keyframes`
//   0% { text-shadow: 0 0 10px #ffd700, 0 0 20px #ff8c00; }
//   50% { text-shadow: 0 0 25px #ffd700, 0 0 50px #ff4500; }
//   100% { text-shadow: 0 0 10px #ffd700, 0 0 20px #ff8c00; }
  0% { text-shadow: 0 0 4px #ffd700, 0 0 3px #ff8c00; }
  20% { text-shadow: 0 0 7px #ffd700, 0 0 6px #ff4500; }
  100% { text-shadow: 0 0 4px #ffd700, 0 0 3px #ff8c00; }
`;

// ---------- اجزای استایل‌شده ----------
const StyledBackground = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100%",
  background: "radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  fontFamily: "Tahoma, sans-serif",
}));

const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(2.5rem, 10vw, 5rem)",
  fontWeight: 900,
  background: "linear-gradient(45deg, #FFD700, #FFA500, #FF8C00)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
  animation: `${textShadow} 2s ease-in-out infinite alternate`,
  marginBottom: theme.spacing(2),
  textAlign: "center",
  letterSpacing: "0.05em",
  filter: "drop-shadow(0 0 30px rgba(255,215,0,0.5))",
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(1rem, 3vw, 1.8rem)",
  fontWeight: 500,
  color: "#E0E0E0",
  textShadow: "0 0 10px rgba(255,255,255,0.3)",
  marginBottom: theme.spacing(6),
  textAlign: "center",
  maxWidth: "600px",
  padding: theme.spacing(0, 2),
}));

// دکمه با افکت سه‌بعدی
const StyledButton = styled(Button)(({ theme }) => ({
  padding: "16px 48px",
  fontSize: "1.5rem",
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

// ---------- ذرات شناور جادویی ----------
const Particle = ({ style, delay, duration }) => (
  <motion.div
    style={{
      position: "absolute",
      width: "8px",
      height: "8px",
      background: "radial-gradient(circle, #FFD700, transparent)",
      borderRadius: "50%",
      filter: "blur(1px)",
      ...style,
    }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.5, 1, 0.5],
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration: duration || 3,
      repeat: Infinity,
      delay: delay || 0,
      ease: "easeInOut",
    }}
  />
);

const ParticlesLayer = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 4,
      size: 4 + Math.random() * 8,
    }));
  }, []);

  return (
    <>
      {particles.map((p) => (
        <Particle
          key={p.id}
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          delay={p.delay}
          duration={p.duration}
        />
      ))}
    </>
  );
};

// ---------- ستاره‌های پس‌زمینه ----------
const Star = ({ style, delay }) => (
  <motion.div
    style={{
      position: "absolute",
      width: "2px",
      height: "2px",
      background: "#fff",
      borderRadius: "50%",
      boxShadow: "0 0 6px #fff, 0 0 12px #FFD700",
      ...style,
    }}
    animate={{ opacity: [0.2, 1, 0.2] }}
    transition={{ duration: 2, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const StarsLayer = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <>
      {stars.map((s) => (
        <Star key={s.id} style={{ left: s.left, top: s.top }} delay={s.delay} />
      ))}
    </>
  );
};

// ---------- کامپوننت اصلی ----------
const WelcomePage = () => {
  const { backToBoard } = useGameActions();
  return (
    <StyledBackground>
      {/* لایه ذرات و ستاره‌ها */}
      <StarsLayer />
      <ParticlesLayer />

      {/* {/ محتوای اصلی /} */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 5,
          padding: "20px",
        }}
      >
        {/* {/ نام بازی با انیمیشن ورود /} */}
        <motion.div
          initial={{ scale: 0.8, rotateY: -20 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
          style={{ marginBottom: "3%" }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "clamp(0.9rem,3vw,20px)",
            }}
          >
            به
          </Typography>
          <TitleText variant="h1" sx={{fontSize:"65px"}}> نکته چین</TitleText>
          <Typography
            sx={{
              color: "white",
              fontSize: "clamp(0.9rem,3vw,20px)",
              textAlign: "end",
            }}
          >
            خوش آمدید!
          </Typography>
        </motion.div>
        {/* {/ پیام خوش‌آمدگویی /} */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <WelcomeText variant="h5" sx={{ pt: 2,mb:5 }}>
            هدف از این بازی به چالش کشیدن شماست. همین حالا شروع کن!
          </WelcomeText>
        </motion.div>
        {/* {/ دکمه شروع با افکت‌های سه‌بعدی و حرکتی */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          style={{ perspective: "500px" }}
        >
          <StyledButton
            onClick={backToBoard} // مسیردهی به صفحه مراحل
            size="large"
            disableRipple
          >
            شروع ماجراجویی
          </StyledButton>
        </motion.div>
        <Typography
          variant="caption"
          sx={{
            color: "rgb(180, 255, 165)",
            textAlign: "center",
            my: 3,
            textShadow: "0 0 4px white",
          }}
        >
          طراحی و توسعه با پویان
        </Typography>
      </motion.div>
    </StyledBackground>
  );
};

export default WelcomePage;
