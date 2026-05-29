import React, { useCallback, useEffect, useRef, useState } from "react";
import { enigmas } from "../../data/answer";
import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { GradientAndShadowStyle } from "../../data/dynamicStyles";
import {
  useGameActions,
  useGameData,
  useGameState,
} from "../../context/GameContext";
import { handletDifficultyProperties } from "../../utils/handleDifficultyProperties";

const GameStageButtons = () => {
  const { selectStage } = useGameActions();
  // const { selectStage,handletDifficultyProperties } = useGameActions();

  // const { difficultyProperties } = useGameState();
  // تبدیل Button مادی به کامپوننت متحرک
  const MotionButton = motion(Button);
  const MotionSpan = motion(Typography);

  const [isPressed, setIsPressed] = useState(false);

  const firstTimer = useRef(null);
  const secondTimer = useRef(null);
  const timerRef = useRef(null);
  // فقط روی دستگاه‌های لمسی (موبایل/تبلت) فعال باشد
  const isTouchDevice = useMediaQuery("(pointer: coarse)");

  const startPress = useCallback(() => {
    if (!isTouchDevice) return;
    // جلوگیری از منوی طولانی کلیک در مرورگر
    timerRef.current = setTimeout(() => {
      setIsPressed(true);
    }, 500);
  }, [isTouchDevice]);

  const cancelPress = useCallback(() => {
    clearTimeout(timerRef.current);
    setIsPressed(false);
  }, []);

  // رویدادهای لمسی
  const handleTouchStart = (e) => {
    startPress();
  };
  const handleTouchEnd = (e) => {
    cancelPress();
  };
  const handleTouchMove = (e) => {
    // اگر انگشت حرکت کرد، فعال‌سازی لغو شود
    cancelPress();
  };

  // پاک‌سازی تایمر هنگام unmount
  useEffect(() => {
    // handletDifficultyProperties()
    firstTimer.current = setTimeout(() => {
      setIsPressed(true)
      secondTimer.current = setTimeout(() => {
        setIsPressed(false)
      },1300)
    },3000)

    return () => {
      clearTimeout(timerRef.current)
      clearTimeout(firstTimer.current)
      clearTimeout(secondTimer.current)
    };
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 150 },
    },
  };

  return (
    <>
      {enigmas.map((enigma, index) => {
        const randomIndex = Math.floor(
          Math.random() * GradientAndShadowStyle.length
        );
        const randomGradShadow = GradientAndShadowStyle[randomIndex];
        const {background,name} = handletDifficultyProperties(index);
        // console.log(name);
        

        return (
          <Grid item xs={4} sm={4} key={index}>
            <motion.div
              variants={itemVariants}
              style={{
                perspective: "800px",
                position: "relative",
                userSelect: "none",
              }} // فعال‌سازی پرسپکتیو برای سه‌بعدی
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchMove={handleTouchMove}
              // جلوگیری از نمایش منوی کانتکست مرورگر روی نگه‌داشتن طولانی
              onContextMenu={(e) => e.preventDefault()}
            >
              <MotionButton
                fullWidth
                variant="contained"
                // استایل پایه فانتزی و سه‌بعدی
                sx={[
                  randomGradShadow,
                  {
                    height: { xs: 65, md: 140 },
                    overflow: "hidden",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    fontFamily: "tanha",
                    borderRadius: { xs: "8px", md: "30px" },
                    // background:
                    //   "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    // boxShadow: "0 8px 32px rgba(0, 242, 254, 0.5)",
                    color: "#fff",
                    textTransform: "none",
                    display: "flex",
                    flexDirection: "column",
                    outline: {
                      xs: "3px solid rgb(231, 246, 236)",
                      md: "6px solid rgb(231, 246, 236)",
                    },
                    // filter:"saturate(160%)",
                    boxShadow: "0 0 14px inset rgba(70, 73, 70, 0.68)",
                    gap: 1,
                    transformStyle: "preserve-3d",
                    transition: "box-shadow 0.3s",
                    "&:hover": {
                      // boxShadow: `0 0 40px rgba(255,215,0,0.8), ${level.shadow}`,
                      boxShadow: `0 0 40px rgba(255,215,0,0.8), ${"0 8px 32px rgba(0, 242, 254, 0.5)"}`,
                    },
                  },
                ]}
                // انیمیشن‌های Framer Motion
                whileHover={{
                  scale: 1.08,
                  rotateY: 10,
                  rotateX: 5,
                  transition: { type: "spring", stiffness: 200 },
                }}
                whileTap={{
                  scale: 0.9,
                  rotateY: 0,
                  rotateX: 0,
                }}
                // کلیک برای شروع مرحله (فعلا alert)
                // onClick={() => alert(`شروع ${level.label}`)}
                onClick={() => selectStage(index)}
              >
                <MotionSpan
                  sx={{
                    fontSize: { xs: "1rem", md: "2.5rem" },
                    overflow: "hidden",
                  }}
                  // animate={{y:[0,-3,0]}}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2.3,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                  // whileHover={{
                  //   rotate: [0, -10, 10, 0],
                  //   transition: { duration: 0.4 },
                  // }}
                >
                  {enigma.image}
                </MotionSpan>
                <MotionSpan sx={{ fontSize: { xs: "1rem", md: "2.5rem" } }}>
                  {index + 1} مرحله
                </MotionSpan>
              </MotionButton>
              <AnimatePresence>
                {isPressed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      inset: 0, // top, right, bottom, left = 0
                      backgroundColor: background,
                      backdropFilter: "blur(6px)",
                      borderRadius: 0, // هماهنگ با borderRadius کارت
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "24px",
                      zIndex: 10,
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", lineHeight: 1.5 }}
                    >
                      {name}
                    </Typography>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Grid>
        );
      })}
    </>
  );
};

export default GameStageButtons;
