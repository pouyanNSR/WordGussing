import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, Box, Typography, Button, styled } from "@mui/material";
import { keyframes } from "@emotion/react";
// import victorySound from "../assets/audio/tada.mp3"

// ─── انیمیشن چرخش برای حاشیه درخشان ───
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const GlowingBorder = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  borderRadius: "16px",
  background: "linear-gradient(to right, #ffd700, #ff6b6b, #a855f7, #f59e0b)",
  opacity: 0.75,
  filter: "blur(8px)",
  animation: `${spin} 8s linear infinite`,
}));

// ─── کامپوننت مودال ───
const VictoryModal = ({ isOpen, onClose, stage, soundEnabled=true,endGame }) => {
  // console.log("endGame: ",endGame);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - card.left) / card.width - 0.5; // 0.5- تا 0.5
    const y = (e.clientY - card.top) / card.height - 0.5;
    setMousePosition({ x, y });
  };

  const audioRef = useRef(null);

  useEffect(() => {
    // فقط یکبار Audio ایجاد کن
    if (!audioRef.current) {
      audioRef.current = new Audio(process.env.PUBLIC_URL + "/sounds/tada.mp3");
      audioRef.current.preload = "auto";
    }

    return () => {
      // پاکسازی در خروج
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

// پخش صدا هنگام باز شدن مودال
  useEffect(() => {
    if (isOpen && soundEnabled && audioRef.current) {
      // ریست و پخش
      audioRef.current.currentTime = 0;

      audioRef.current.play()
        // .then(() => {
        //   console.log("🔊 صدای پیروزی پخش شد!");
        // })
        // .catch((error) => {
        //   console.warn("⚠️ خطا در پخش صدا:", error);
        // });
    }
  }, [isOpen, soundEnabled]);

  const handleMouseLeave = () => setMousePosition({ x: 0, y: 0 });

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      // بک‌دراپ شخصی‌سازی‌شده با انیمیشن
      BackdropComponent={(props) => (
        <motion.div
          {...props}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            ...props.style,
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            zIndex: -1,
          }}
        />
      )}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* /* ─── عنصر صوتی مخفی ─── / */}
      {/* <audio ref={audioRef} src={victorySound} preload="auto" style={{ display: "none" }}/> */}
      
      <AnimatePresence>
        {isOpen && (
          // ─── کارت اصلی با پرسپکتیو سه‌بعدی ───
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: -45 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{
              width: "90%",
              maxWidth: "450px",
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* جعبه بیرونی برای افکت tilt سه‌بعدی */}
            <Box
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              sx={{
                // transform: `rotateY(${mousePosition.x * 10}deg) rotateX(${
                //   -mousePosition.y * 10
                // }deg)`,
                // transition: "transform 0.1s ease-out",
                // transformStyle: "preserve-3d",
                borderRadius: "16px",
                position: "relative",
              }}
            >
              {/* حاشیه درخشان چرخان */}
              <GlowingBorder />

              {/* محتوای داخلی کارت */}
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, rgba(17,24,39,0.95), rgba(88,28,135,0.9), rgba(17,24,39,0.95))",
                  backdropFilter: "blur(10px)",
                  p: 4,
                  textAlign: "center",
                  overflow: "hidden",
                  zIndex: 1,
                }}
              >
                {/* ستاره‌های شناور */}
                <Box
                  sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}
                >
                  {["✨", "🌟", "💫", "⭐", "🎉"].map((emoji, i) => (
                    <motion.div
                      key={i}
                      style={{
                        position: "absolute",
                        fontSize: "2rem",
                        top: `${10 + Math.random() * 50}%`,
                        left: `${10 + Math.random() * 90}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </Box>

                {/* آیکن جام */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                  style={{
                    fontSize: "5rem",
                    marginBottom: "16px",
                    filter: "drop-shadow(0 0 15px rgba(254, 249, 218, 0.8))",
                  }}
                > 
                  {!endGame ? "😍" :"🏆"}
                </motion.div>

                {/* متن تبریک */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Typography
                    variant="h3"
                    fontWeight="900"
                    sx={{
                      background: "linear-gradient(to right, #f59e0b, #fbbf24)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: "0 0 20px rgba(245,158,11,0.5)",
                      mb: 1,
                    }}
                  >
                    { endGame ? "تموم شد" : "آفرین" }!
                  </Typography>
                </motion.div>

                {/* نمایش امتیاز (اختیاری) */}
                {stage !== undefined && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Typography variant="h5" color="white" sx={{ mb: 2 }}>
                      اتمام مرحله‌ی:{" "}
                      <Box
                        component="span"
                        sx={{
                          color: "#fbbf24",
                          fontWeight: "bold",
                          fontSize: "2rem",
                        }}
                      >
                        {stage + 1}
                      </Box>
                    </Typography>
                  </motion.div>
                )}

                {/* متن تشویقی */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Typography color="grey.300" sx={{ mb: 4 }}>
                    فوق‌العاده بودی! ادامه بده 🚀
                  </Typography>
                </motion.div>

                {/* دکمه بازی دوباره */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ display: "inline-block" }}
                >
                  <Button
                    variant="contained"
                    disabled={endGame}
                    // onClick={endGame ? null : onClose}
                    onClick={() => {
                      console.log("Button Clicked✅");
                      if(!endGame) onClose()
                    }}
                    sx={{
                      px: 5,
                      py: 1.5,
                      background: "linear-gradient(to right, #f59e0b, #ea580c)",
                      color: "#111827",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      borderRadius: "999px",
                      textTransform: "none",
                      overflow: "hidden",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        background: "rgba(255,255,255,0.2)",
                        transform: "translateX(-100%)",
                        transition: "transform 0.3s ease",
                      },
                      "&:hover::after": {
                        transform: "translateX(0)",
                      },
                    }}
                  >
                   {endGame ? "پایان مراحل":"مرحله بعد"}
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default VictoryModal;
