import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { enigmas } from "../data/answer";
const EnigmaScreen = memo(({stage}) => {
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
          height: "60%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "4px",
          boxShadow: "0 0 12px inset rgba(37, 32, 31, 0.63)",
        }}
      >
        <Typography sx={{ fontSize: "55px", direction: "rtl" }}>
          {enigmas[stage].image}
        </Typography>
      </Box>
    </Box>
  );
});

export default EnigmaScreen;
