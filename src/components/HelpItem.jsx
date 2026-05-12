import {
  Box,
  Button,
  keyframes,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { warning } from "motion";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/index";

const HelpItem = () => {
  const { setActiveModal } = useContext(GameContext);
  const [windowWidth, setWindowWidth] = useState(null);

  // console.log(windowWidth);

  const moving = keyframes`
    from {
      background:linear-gradient(rgb(255, 38, 0),rgb(40, 29, 252))
    }
    to {
      background:linear-gradient(rgb(40, 29, 252),rgb(255, 38, 0))
    }
  `;
  return (
    <Button
      onClick={() => setActiveModal("help")}
      sx={{
        position: "absolute",
        bottom: "5%",
        right: "3%",
        // width: windowWidth === "small" ? "0%": "8.5%",
        maxWidth: "40%",
        background: "rgb(255, 38, 0)",
        padding: "16px 30px",
        outline: "4px solid rgb(9, 248, 200)",
        boxShadow:
          "0 0 6px inset rgb(1, 11, 9),0px 0px 16px 3px rgb(5, 36, 36)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "30px 30px 0px 30px",
        color: "whitesmoke",
        transition: "0.3s ease",
        animation: `${moving} 3.5s ease infinite`,
        "&:hover": {
          scale: 1.3,
          cursor: "pointer",
        },
        "@media (max-width: 600px)": {
          padding: "clamp(7px,10px,13px) clamp(15px,20px,13px)",
          bottom: "unset",
          top:"3%",
          right: "5%",
        },
      }}
    >
      <Typography variant="h6" sx={{ whiteSpace: "wrap", lineHeight: "25px" }}>
        کمک بگیر!
      </Typography>
    </Button>
  );
};

export default HelpItem;
