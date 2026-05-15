import { Box, Grid } from "@mui/material";
import AnswerBox from "./AnswerBox";
import LettersBox from "./LettersBox";

const LowerPart = ({stage}) => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "secondary.main",
        flex: "auto",
        width: "100%",
        // display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Grid
        item
        container
        xs={2}
        md={2}
        sx={{ maxWidth: { xs: "100%", md: "60% !important" } }}
        // bgcolor={"rgb(89, 255, 0)"}
      >
        <AnswerBox />
      </Grid>
      <Grid item container xs={10} md={10} sx={{ maxWidth: "60% !important" }}>
        <LettersBox />
      </Grid>
    </Grid>
  );
};

export default LowerPart;
