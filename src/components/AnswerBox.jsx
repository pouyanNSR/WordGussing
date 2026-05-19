import { Button, Grid } from "@mui/material";
import {
  useGameActions,
  useGameState,
} from "../context/GameContext";

const AnswerBox = () => {
  const { handleDeleteLetter } = useGameActions();
  const { validate, divContents, changeLetterBg } = useGameState();

  const letterButtonStyle = (index, enable) => {
    const isInclude = changeLetterBg.index.some((item) => item === index);

    return {
      backgroundColor: validate
        ? "rgb(4, 156, 19)"
        : enable && isInclude
        ? "rgb(8, 91, 235)"
        : "primary.main",
      // flex: "0 0 25%",
      height: "80%",
      width: "auto",
      minWidth: { xs: "70%", md: "65px" },
      outline: "5px solid rgb(98, 39, 3)",
      borderRadius: "5px",
      color: "rgb(255, 255, 255)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "25px",
      fontWeight: "700",
      textShadow: "0 0 4px rgb(42, 19, 5)",
      boxShadow: "0 0 4px inset rgb(58, 23, 6)",
      padding: 0,
      "&:hover": {
        backgroundColor: "rgb(76, 4, 4)",
      },
      "&:active": {
        backgroundColor: "rgb(241, 11, 11)",
      },
    };
  };

  return (
    <Grid
      container
      sx={{
        width: { xs: "100%", md: "max-content" },
        m: "auto",
        height: "100%",
        gap: { xs: 0, md: 4 },
      }}
    >
      {divContents.map((content, index) => {
        const disabled = changeLetterBg.index.some(e => e === index)
        return (
          <Grid
            item
            xs
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="inner-button-container"
          >
            <Button
              onClick={() => disabled ? null :handleDeleteLetter(content, index)}
              sx={letterButtonStyle(index, changeLetterBg.enable)}
            >
              {content}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AnswerBox;
