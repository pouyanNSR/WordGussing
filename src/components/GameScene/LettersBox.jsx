import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  useGameActions,
  useGameData,
  useGameState,
} from "../../context/GameContext";
import Typed from "typed.js";

const LettersBox = () => {
  const { availableLetters } = useGameState();
  const { handleLetterClick } = useGameActions();
  const { stage } = useGameData();
  const nameEl = useRef(null);


  useEffect(() => {
    const stageNum = ` مرحله ${stage + 1}`;
    const typedName = new Typed(nameEl.current, {
      strings: [stageNum],
      startDelay: 1000,
      typeSpeed: 110,
      backSpeed: 80,
      backDelay: 120,
      showCursor: false,
    });

    return () => {
      typedName.destroy();
    };
  }, [stage]);

  const letterButtonStyle = {
    background:
      "linear-gradient(165deg,rgba(252, 250, 250, 0.92) 10%,rgb(255, 217, 2) 60%)",
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
          position: "relative",
        }}
      >
        {availableLetters.map((letter, index) => (
          <Box>
            <Button
              fullWidth
              key={index}
              onClick={() => handleLetterClick(letter, index)}
              sx={letterButtonStyle}
            >
              <Typography sx={letterStyle}>{letter}</Typography>
            </Button>
          </Box>
        ))}
        <Box
          ref={nameEl}
          // bgcolor={"red"}
          sx={{
            textWrap:"nowrap",
            fontSize: "18px",
            position: "absolute",
            inset: "100% 0 0 0",
            height: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "rgb(202, 194, 194)",
            pt: 1,
            width: "30%",
            margin: "auto",
            textShadow: "0 0 4px rgb(241, 230, 230)",
          }}
        ></Box>
      </Box>
    </>
  );

  /* در صورت تمام شدن دکمه‌ها، پیام موفقیت */
};

export default LettersBox;
