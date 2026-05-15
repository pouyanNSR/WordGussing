import { createContext } from "react";

export const GameContext = createContext({
    generateFinalLetters: () => {},
    divContents:[],
    setDivContents: () => {},
    handleDeleteLetter: () => {},
    setAvailableLetters: () => {},
    availableLetters:[],
    validate:null,
    stage:0,
    activeModal:"",
    setActiveModal: () => {},
    showFirstLetter: () => {},
    showRandomLetter: () => {},
    handleLetterClick: () => {},
    changeLetterBg:false,
})