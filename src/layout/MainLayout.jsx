import { Grid } from "@mui/material";
import { useGameData } from "../context/GameContext";
import Scene from "../components/GameScene/Scene";
import Board from "../components/StagesBoard/Board";
import WelcomPage from "../components/WelcomPage";

const MainLayout = () => {
  const { screen } = useGameData();
  const screenHandler = () => {
    switch (screen) {
      case "board":
        return <Board/>
      case "scene":
        return <Scene/>    
      default:
        return <WelcomPage/>
    }
  }
  return (
    <Grid container>
      {screenHandler()}
    </Grid>
  );
};

export default MainLayout;
