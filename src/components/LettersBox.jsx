import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/index";
import { enigmas } from "../data/answer";

const LettersBox = () => {
  const {
    generateFinalLetters,
    divContents,
    setDivContents,
    availableLetters,
    setAvailableLetters,
    stage,
  } = useContext(GameContext);

  const divCount = enigmas[stage].letters.length;

  // مقداردهی اولیه: تولید ۲۶ حرف و ایجاد div های خالی
  useEffect(() => {
    const initialLetters = generateFinalLetters();
    setAvailableLetters(initialLetters);
    setDivContents(Array(divCount).fill(""));
  }, [divCount]); // در صورت تغییر تعداد div ها، بازنشانی شود

  // پیدا کردن کوچکترین ایندکسی که محتوای آن خالی است (اولین div از راست)
  const findFirstEmptyDivIndex = () => {
    return divContents.findIndex((content) => content === "");
  };

  // مدیریت کلیک روی دکمه حرف
  const handleLetterClick = (letter, letterIndex) => {
    const emptyIndex = findFirstEmptyDivIndex();
    if (emptyIndex === -1) {
      alert("همه div ها پر شده‌اند!");
      return;
    }
    // console.log(letterIndex,"index");

    // به‌روزرسانی div
    const newDivContents = [...divContents];
    newDivContents[emptyIndex] = letter;
    setDivContents(newDivContents);
    // availableLetters.map((l,index) =>{
    //   console.log(`${l} is letter and ${index} is its index`);
    // });

    // حذف حرف از لیست دکمه‌های فعال
    const newAvailable = availableLetters.filter(
      (l, index) => index !== letterIndex
    );
    setAvailableLetters(newAvailable);
  };

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
          gridTemplateColumns:{ xs:"repeat(5,1fr)", md:"repeat(7,1fr)"},
          // gridTemplateColumns: "repeat(auto-fit,minmax(90px,1fr))",
          columnGap: 2,
          padding: { xs: "22px", md: "30px" },
          justifyContent: "center",
          alignItems: "center",
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
      </Box>
    </>
  );

  /* در صورت تمام شدن دکمه‌ها، پیام موفقیت */
};

export default LettersBox;
