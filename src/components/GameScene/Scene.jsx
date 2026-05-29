import { Box } from "@mui/material";
import React, { useEffect } from "react";
import VictoryModal from "../Modal/VictoryModal";
import HelpModal from "../Modal/HelpModal";
import HelpItem from "./parts/HelpItem";
import ScoreBadge from "./parts/ScoreBadge";
import EnigmaScreen from "./EnigmaScreen";
import LowerPart from "./LowerPart";
import { useGameState } from "../../context/GameContext";
import { useModalContext } from "../../context/ModalContext";

const Scene = () => {
  const { victory } = useModalContext();
  const { validate } = useGameState();
  useEffect(() => {
    if (validate) {
      setTimeout(() => victory.open(), 700);
    }
  }, [validate, victory]);
  return (
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
  );
};

export default Scene;
