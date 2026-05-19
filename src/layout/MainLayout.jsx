import { Box } from "@mui/material";
import HelpItem from "../components/HelpItem";
import ScoreBadge from "../components/ScoreBadge";
import EnigmaScreen from "../components/EnigmaScreen";
import LowerPart from "../components/LowerPart";
import { useModalContext } from "../context/ModalContext";
import { useEffect } from "react";
import { useGameState } from "../context/GameContext";
import HelpModal from "../components/Modal/HelpModal";
import VictoryModal from "../components/Modal/VictoryModal";

const MainLayout = () => {
  const { victory } = useModalContext();
  const { validate } = useGameState();
  useEffect(() => {
    if (validate) {
      setTimeout(() => victory.open(), 700);
    }
  }, [validate, victory]);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100dvw",
          // height:"100vh",
          height: "100dvh",
          background: "aqua",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VictoryModal />
        <HelpModal />
        <HelpItem />
        <ScoreBadge />
        <EnigmaScreen />
        <LowerPart />
      </Box>
    </>
  );
};

export default MainLayout;
