import React, { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, Box, Typography, Button, styled } from "@mui/material";
import { keyframes } from "@emotion/react";
import { MonetizationOnRounded } from "@mui/icons-material";
import { GameContext } from "../context/index";

// import victorySound from "../assets/audio/tada.mp3"

// ─── انیمیشن چرخش برای حاشیه درخشان ───
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// ─── کامپوننت مودال ───
const HelpModal = ({ isOpen, onClose, stage }) => {

  const {showFirstLetter,showRandomLetter} = useContext(GameContext)

  const helpItemsStyle = {
    width: "90%",
    background: "linear-gradient(to right, #ffff0a, #dfae0f)",
    color: "red",
    margin: "auto",
    textShadow: "0 0 20px rgba(245,158,11,0.5)",
    mb: 1,
    px: 2,
    py: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "all 0.3s linear",
    "&:hover": {
      transform: "translateY(-10px)",
      background: "rgba(7, 248, 136, 0.99)",
    },
  };

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
              sx={{
                transition: "transform 0.1s ease-out",
                transformStyle: "preserve-3d",
                borderRadius: "16px",
                position: "relative",
              }}
            >
              {/* محتوای داخلی کارت */}
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "16px",
                  // background:
                  //   "linear-gradient(135deg, rgba(17,24,39,0.95), rgba(88,28,135,0.9), rgba(17,24,39,0.95))",
                  background:
                    "linear-gradient(to bottom, rgb(251, 52, 7), rgba(40, 6, 152, 0.95))",
                  backdropFilter: "blur(10px)",
                  p: 4,
                  textAlign: "center",
                  overflow: "hidden",
                  zIndex: 1,
                  border: "4px solid rgb(10, 207, 135)",
                  outline: "7px solid rgb(7, 251, 161)",
                  boxShadow: "0px 0px 30px 2px inset rgb(7, 65, 44)",
                }}
              >
                {/* آیکن جام */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                  style={{
                    fontSize: "5rem",
                    // marginBottom: "16px",
                    filter: "drop-shadow(0 0 15px rgba(255,215,0,0.8))",
                    padding: 0,
                  }}
                >
                  📖
                </motion.div>

                {/* متن تبریک */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    marginBottom: "30px",
                  }}
                >
                  <Box sx={{display:"flex",flexDirection:"column",gap:"20px"}}>
                    <Button onClick={() => showFirstLetter()} sx={helpItemsStyle}>
                      <Typography
                        sx={{
                          color: "rgba(88, 3, 148, 0.96)",
                          fontWeight: 800,
                          fontSize: 19,
                          letterSpacing: "2px",
                        }}
                      >
                        نمایش حرف اول
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "3px",
                        }}
                      >
                        <Typography
                          variant="h5"
                          fontWeight="800"
                          sx={{
                            color: "#FFF",
                            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                            paddingTop: "3px",
                            lineHeight: 1.5,
                          }}
                        >
                          500
                        </Typography>
                        <MonetizationOnRounded
                          sx={{
                            color: "#FFF",
                            fontSize: 34,
                            filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.4))",
                          }}
                        />
                      </Box>
                    </Button>
                    <Button onClick={() => showRandomLetter()} sx={helpItemsStyle}>
                      <Typography
                        sx={{
                          color: "rgba(88, 3, 148, 0.96)",
                          fontWeight: 800,
                          fontSize: 19,
                          letterSpacing: "2px",
                        }}
                      >
                        نمایش حرف تصادفی
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "3px",
                        }}
                      >
                        <Typography
                          variant="h5"
                          fontWeight="800"
                          sx={{
                            color: "#FFF",
                            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                            paddingTop: "3px",
                            lineHeight: 1.5,
                          }}
                        >
                          500
                        </Typography>
                        <MonetizationOnRounded
                          sx={{
                            color: "#FFF",
                            fontSize: 34,
                            filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.4))",
                          }}
                        />
                      </Box>
                    </Button>
                  </Box>
                </motion.div>

                {/* دکمه بازی دوباره */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ display: "inline-block" }}
                >
                  <Button
                    onClick={onClose}
                    variant="contained"
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
                    {"بازگشت"}
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

export default HelpModal;
