import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { letters } from "../data/letters";
import { enigmas } from "../data/answer";
import { generateLetters } from "../utils/generateLetters";
import { useLetterHandlers } from "../hooks/useLetterHandlers";
import { removeFromLetters } from "../utils/letterDeleter";

export const GameDataContext = createContext(null);
export const GameStateContext = createContext(null);
export const GameActionsContext = createContext(null);

export function GameProvider({ children }) {
  // ========= DATA STATE =========
  const [stage, setStage] = useState(0); // حروف باقی‌مانده برای کلیک

  const currentStageData = useMemo(() => enigmas[stage] || null, [stage]);

  // ========= GAME STATE =========
  const [screen, setScreen] = useState("");
  const [divContents, setDivContents] = useState([]); // محتوای div ها (آرایه رشته‌ها)
  const [validate, setValidate] = useState(null);
  const [invalidAnswer, setInvalidAnswer] = useState(false);
  const [availableLetters, setAvailableLetters] = useState([]); // حروف باقی‌مانده برای کلیک
  const [endGame, setEndGame] = useState(false);
  const [score, setScore] = useState(0);
  const [preventDoubleClick, setPreventDoubleClick] = useState(false);
  const [openStages, setOpenStages] = useState(0); 
  // const [difficultyProperties, setDifficultyProperties] = useState({
  //   bg:"",
  //   lable:""
  // })
  const [changeLetterBg, setChangeLetterBg] = useState({
    index: [],
    enable: "",
  });

  // ========= ACTIONS =========

  const { handleDeleteLetter, handleLetterClick } = useLetterHandlers(
    availableLetters,
    divContents,
    setDivContents,
    setAvailableLetters
  );
  const letterButtonsQuantity = 20;

  useEffect(() => {
    const areAllbuttonsFilled = divContents.every((content) => content !== "");
    if (areAllbuttonsFilled) {
      const wordFormDivContents = divContents.join("");
      const wordFormAnswer = currentStageData.letters.join("");
      if (wordFormAnswer === wordFormDivContents) {
        setValidate(true);
      } else {
        setInvalidAnswer(true);
        setTimeout(() => {
          setInvalidAnswer(false);
        }, 800);
      }
    } else {
      setValidate(false);
    }
  }, [stage, divContents]);

  useEffect(() => {
    // const stageDifficulty = enigmas[stage].difficulty;
    const lastEnigma = enigmas.length - 1;
    // handletDifficultyProperties(stageDifficulty)
    if (stage === lastEnigma) {
      setEndGame(true);
    }
  }, [stage, currentStageData]);

  useEffect(() => {
    const firstSatgeData = enigmas[0];
    if (!firstSatgeData) return;
    const initialAvailable = generateLetters(
      firstSatgeData.letters,
      letters,
      letterButtonsQuantity
    );
    setAvailableLetters(initialAvailable);
    setDivContents(Array(firstSatgeData.letters.length).fill(""));
  }, []);


  const selectStage = useCallback(
    (index) => {
      setPreventDoubleClick(true);

      const nextWordLetters = enigmas[index].letters;
      const nextAvailableLetters = generateLetters(
        nextWordLetters,
        letters,
        letterButtonsQuantity
      );

      // همهٔ stateها در یک دسته به‌روز می‌شوند
      setDivContents(Array(enigmas[index].letters.length).fill(""));
      setValidate(false);
      setStage(index);
      setChangeLetterBg({ index: [], enable: "" });
      setAvailableLetters(nextAvailableLetters);
      setScreen("scene");
      setTimeout(() => {
        setPreventDoubleClick(false);
      }, 1200);
    },
    [stage, enigmas, letters, generateLetters, letterButtonsQuantity]
  );

  const goToNextStage = useCallback(() => {
    setPreventDoubleClick(true);
    const nextStage = stage + 1;
    if (nextStage >= enigmas.length) return; // اگر مرحلهٔ آخر است، کاری نکن

    const nextWordLetters = enigmas[nextStage].letters;
    const nextAvailableLetters = generateLetters(
      nextWordLetters,
      letters,
      letterButtonsQuantity
    );

    // همهٔ stateها در یک دسته به‌روز می‌شوند
    setDivContents(Array(nextWordLetters.length).fill(""));
    setValidate(false);
    setStage(nextStage);
    setScore((prev) => prev + 700);
    setChangeLetterBg({ index: [], enable: "" });
    setAvailableLetters(nextAvailableLetters);
    setTimeout(() => {
      setPreventDoubleClick(false);
    }, 1200);
  }, [stage, enigmas, letters, generateLetters, letterButtonsQuantity]);

  const backToBoard = () => {
    setScreen("board");
  };



  const showFirstLetter = useCallback(() => {
    if (score >= 500) {
      const firstLetter = currentStageData.letters[0];
      const newDivContents = [...divContents];
      newDivContents[0] = firstLetter;
      setDivContents(newDivContents);
      setChangeLetterBg((prev) => ({
        ...prev,
        enable: "helper",
        index: [...prev.index, 0],
      }));
      setScore((e) => e - 500);
      const getIndex = availableLetters.findIndex(
        (letter) => firstLetter === letter
      );
      removeFromLetters(firstLetter, getIndex);
    } else {
      alert("پول کافی ندارید!");
    }
  }, [stage, divContents, availableLetters, score]);

  const showRandomLetter = useCallback(() => {
    if (score >= 500) {
      const setRandomLetter = () => {
        const randomNum = Math.floor(Math.random() * divContents.length);
        let randomPlace = divContents[randomNum];

        if (randomPlace === "") {
          const randomCorrectLetter = currentStageData.letters[randomNum];
          const newDivContents = [...divContents];
          newDivContents[randomNum] = randomCorrectLetter;
          setDivContents(newDivContents);

          setChangeLetterBg((prev) => ({
            ...prev,
            enable: "helper",
            index: [...prev.index, randomNum],
          }));

          setScore((e) => e - 500);

          const getIndex = availableLetters.findIndex(
            (letter) => randomCorrectLetter === letter
          );
          setAvailableLetters(removeFromLetters(getIndex, availableLetters));
        } else {
          return setRandomLetter();
        }
      };
      setRandomLetter();
    } else {
      alert("پول کافی ندارید!");
    }
  }, [stage, divContents, availableLetters, score]);

  // ========= MEMOIZE VALUES =========
  const dataValue = useMemo(
    () => ({
      stage,
      screen,
    }),
    [stage, screen]
  );

  const stateValue = useMemo(
    () => ({
      divContents,
      validate,
      availableLetters,
      endGame,
      score,
      preventDoubleClick,
      changeLetterBg,
      invalidAnswer,
      // difficultyProperties
    }),
    [
      divContents,
      validate,
      availableLetters,
      endGame,
      score,
      preventDoubleClick,
      changeLetterBg,
      invalidAnswer,
      // difficultyProperties
    ]
  );

  const actionsValue = useMemo(
    () => ({
      handleLetterClick,
      handleDeleteLetter,
      showRandomLetter,
      showFirstLetter,
      goToNextStage,
      selectStage,
      backToBoard,
      // handletDifficultyProperties
    }),
    [
      handleLetterClick,
      handleDeleteLetter,
      showFirstLetter,
      showRandomLetter,
      goToNextStage,
      selectStage,
      backToBoard,
      // handletDifficultyProperties
    ]
  );
  // console.log(dataValue);

  // ========= RENDER PROVIDERS =========
  return (
    <GameDataContext.Provider value={dataValue}>
      <GameStateContext.Provider value={stateValue}>
        <GameActionsContext.Provider value={actionsValue}>
          {/* <TestState /> */}
          {children}
        </GameActionsContext.Provider>
      </GameStateContext.Provider>
    </GameDataContext.Provider>
  );
}

// function TestState() {
//   const state = useGameState();
//   console.log("test", state);
//   return null;
// }

// ۳. هوک‌های اختصاصی
export const useGameData = () => {
  const context = useContext(GameDataContext);
  if (!context) {
    console.warn("useGameState called outside GameStateProvider");
    return {
      stage: null,
      screen: null,
    };
  }
  return context;
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    console.warn("useGameState called outside GameStateProvider");
    return {
      divContents: [],
      validate: false,
      availableLetters: [],
      endGame: false,
      score: 0,
      changeLetterBg: { index: [], enable: "" },
    };
  }
  return context;
};

export const useGameActions = () => {
  const context = useContext(GameActionsContext);
  if (!context)
    throw new Error("useGameActions must be used within GameProvider");
  return context;
};
