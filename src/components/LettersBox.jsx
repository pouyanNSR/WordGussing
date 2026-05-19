import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GameContext, useGameActions, useGameData, useGameState } from "../context/GameContext";
import { enigmas } from "../data/answer";

const LettersBox = () => {
  const {availableLetters } = useGameState();
  const {handleLetterClick} = useGameActions();
  const { stage } = useGameData();


  const letterButtonStyle = {
    background:
      "linear-gradient(165deg,rgba(252, 250, 250, 0.92) 0%,rgb(255, 217, 2) 50%)",
    height: { xs: "auto", md: "40px" },
    color: "secondary.main",
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.66)",
    border: "3px solid rgba(0, 0, 0, 0.22)",
    "&:hover": {
      background:
        "linear-gradient(165deg,rgba(65, 71, 10, 0.92) 0%,rgb(255, 217, 2) 90%)",
    },
  };

  const letterStyle = {
    fontSize: { xs: 18, md: 24 },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "700",
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: { xs: "repeat(5,1fr)", md: "repeat(7,1fr)" },
          // gridTemplateColumns: "repeat(auto-fit,minmax(90px,1fr))",
          columnGap: 2,
          padding: { xs: "22px", md: "30px" },
          justifyContent: "center",
          alignItems: "center",
          position:"relative"
        }}
      >
        {availableLetters.map((letter, index) => (
          <Button
            key={index}
            onClick={() => handleLetterClick(letter, index)}
            sx={letterButtonStyle}
          >
            <Typography sx={letterStyle}>{letter}</Typography>
          </Button>
        ))}
        <Box
          // bgcolor={"red"}
          sx={{
            position: "absolute",
            inset: "100% 0 0 0",
            height: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "rgb(202, 194, 194)",
            pt: 1,
            width:"30%",
            margin:"auto"
          }}
        >
          مرحله
          <Typography fontWeight={700} sx={{ml:0.6}}>{stage + 1}</Typography>
        </Box>
      </Box>
    </>
  );

  /* در صورت تمام شدن دکمه‌ها، پیام موفقیت */
};

export default LettersBox;
