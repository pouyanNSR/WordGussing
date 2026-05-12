import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { enigmas } from "../data/answer";
const EnigmaScreen = memo(({ stage }) => {
  // console.log("EnigmaScreen");
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        flex: "0 0 40%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
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
            height: "80%"
          },
        }}
      >
        <Typography
          className="stickers"
          sx={{ fontSize: "55px", direction: "rtl", transition: "0.3s ease" }}
        >
          {enigmas[stage].image}
        </Typography>
      </Box>
    </Box>
  );
});

export default EnigmaScreen;
