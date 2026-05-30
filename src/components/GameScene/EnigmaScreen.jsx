import { Box, Typography } from "@mui/material";
import { memo, useEffect, useMemo, useState } from "react";
import { enigmas } from "../../data/answer";
import {
  useGameData,
} from "../../context/GameContext";
import { motion, transform } from "motion/react";
import { handletDifficultyProperties } from "../../utils/handleDifficultyProperties";
const EnigmaScreen = memo(() => {
  // console.log("EnigmaScreen");
  
  const { stage } = useGameData();
  const {background,name} = useMemo(() => handletDifficultyProperties(stage),
  [stage,handletDifficultyProperties])
    

  const MotionTypo = motion(Typography);
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        flex: "0 0 40%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          background: "white",
          width: "50%",
          maxWidth: "100%",
          height: "60%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "4px",
          boxShadow: "0 0 12px inset rgba(37, 32, 31, 0.63)",
          "&:hover": {
            "& .stickers": {
              scale: "1.4",
            },
          },
          "@media (max-width: 600px)": {
            width: "90%",
            height: "80%",
          },
        }}
      >
        <MotionTypo
          initial={{ scale: 1.7 }}
          whileInView={{ scale: 1 }}
          transition={{
            delay: 0.3,
            ease: "easeInOut",
          }}
          className="stickers"
          sx={{
            fontSize: { xs: "47px", md: "55px" },
            direction: "rtl",
            willChange:"transform",
            transition: "0.3s ease",
          }}
        >
          {enigmas[stage].image}
        </MotionTypo>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            backgroundColor: background,
            boxShadow: "0 0 12px inset rgba(27, 27, 27, 0.44)",
            color: "white",
            padding: { xs: "0px 10px", md: "2px 12px" },
            borderRadius: "0 12px 0 0",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontFamily: "vazir",
            }}
          >
            {name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

export default EnigmaScreen;
