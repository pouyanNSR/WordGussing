import { Box, Grid, IconButton } from "@mui/material";
import AnswerBox from "./AnswerBox";
import LettersBox from "./LettersBox";
import { HomeRounded} from "@mui/icons-material";
import { useGameActions } from "../../context/GameContext";

const LowerPart = () => {
  const { backToBoard } = useGameActions();
  return (
    <Grid
      container
      sx={{
        position: "relative",
        backgroundColor: "secondary.main",
        flex: "auto",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "5px",
          left: "3%",
          background: "rgba(212, 219, 19, 0.4)",
          borderRadius: "9px",
          transition:"0.2s ease",
          "&:hover": {
            background:"none",
            "& .home-sticker": {
              color: "white",
              boxShadow:"0 0 12px whitesmoke"
            },
          },
          "&:active":{
            "& .home-sticker": {
              color: "transparent",
            },           
          }
        }}
      >
        <IconButton sx={{ p: 0 }} onClick={backToBoard}>
          <HomeRounded
            className="home-sticker"
            sx={{
              color: "rgb(212, 219, 19)",
              fontSize: { xs: "24px", md: "44px" },
              transition:"0.2s ease"
            }}
          />
        </IconButton>
      </Box>
      <Grid
        item
        container
        xs={2}
        md={2}
        sx={{ maxWidth: { xs: "100%", md: "60% !important" } }}
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
