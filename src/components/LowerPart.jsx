import { Box } from "@mui/material";
import AnswerBox from "./AnswerBox";
import LettersBox from "./LettersBox";



const LowerPart = () => {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        flex: "0 0 60%",
        width: "100%",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        p:4
      }}
    >
      <AnswerBox/>
      <LettersBox />
    </Box>
  );
};

export default LowerPart;
