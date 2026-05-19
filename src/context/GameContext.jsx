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
import {
  useLetterHandlers
} from "../hooks/useLetterHandlers";
import { removeFromLetters } from "../utils/letterDeleter";

export const GameDataContext = createContext(null);
export const GameStateContext = createContext(null);
export const GameActionsContext = createContext(null);

export function GameProvider({ children }) {
  // ========= DATA STATE =========
  const [stage, setStage] = useState(0); // حروف باقی‌مانده برای کلیک

  const currentStageData = useMemo(() => enigmas[stage] || null, [stage]);

  // ========= GAME STATE =========
  const [divContents, setDivContents] = useState([]); // محتوای div ها (آرایه رشته‌ها)
  const [validate, setValidate] = useState(null);
  const [availableLetters, setAvailableLetters] = useState([]); // حروف باقی‌مانده برای کلیک
  const [endGame, setEndGame] = useState(false);
  const [score, setScore] = useState(0);
  const [preventDoubleClick, setPreventDoubleClick] = useState(false);
  const [changeLetterBg, setChangeLetterBg] = useState({
    index: [],
    enable: false,
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
      setValidate(wordFormAnswer === wordFormDivContents);
    } else {
      setValidate(false);
    }
  }, [stage, divContents]);

  useEffect(() => {
    const lastEnigma = enigmas.length - 1;
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
    setChangeLetterBg({ index: [], enable: false });
    setAvailableLetters(nextAvailableLetters); 
    setTimeout(() => {
      setPreventDoubleClick(false);
    }, 1200);
  }, [stage, enigmas, letters, generateLetters, letterButtonsQuantity]);
  
  const showFirstLetter = useCallback(() => {
    if (score >= 500) {
      const firstLetter = currentStageData.letters[0];
      const newDivContents = [...divContents];
      newDivContents[0] = firstLetter;
      setDivContents(newDivContents);
      setChangeLetterBg((prev) => ({
        ...prev,
        enable: true,
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
            enable: true,
            index: [...prev.index, randomNum],
          }));

          setScore((e) => e - 500);

          const getIndex = availableLetters.findIndex(
            (letter) => randomCorrectLetter === letter
          );
          setAvailableLetters(removeFromLetters(getIndex,availableLetters))
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
    }),
    [stage]
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
    }),
    [
      divContents,
      validate,
      availableLetters,
      endGame,
      score,
      preventDoubleClick,
      changeLetterBg,
    ]
  );

  const actionsValue = useMemo(
    () => ({
      handleLetterClick,
      handleDeleteLetter,
      showRandomLetter,
      showFirstLetter,
      goToNextStage,
    }),
    [
      handleLetterClick,
      handleDeleteLetter,
      showFirstLetter,
      showRandomLetter,
      goToNextStage,
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
      changeLetterBg: { index: [], enable: false },
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
