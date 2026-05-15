import { ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { createTheme } from "@mui/material/styles";
import { letters } from "./data/letters";
import { GameContext } from "./context";
import { useCallback, useEffect, useMemo, useState } from "react";
import { enigmas } from "./data/answer";
import VictoryModal from "./components/VictoryModal";

import MainLayout from "./layout/MainLayout";
import EnigmaScreen from "./components/EnigmaScreen";
import LowerPart from "./components/LowerPart";
import HelpItem from "./components/HelpItem";
import ScoreBadge from "./components/ScoreBadge";
import HelpModal from "./components/HelpModal";

export const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    primary: {
      main: "#f0ba18",
    },
    secondary: {
      main: "#6a3b0d",
    },
  },
  typography: {
    fontFamily: "vazir,tanha",
  },
});

const cacheRTL = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const shuffledArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const App = () => {
  const [divContents, setDivContents] = useState([]); // محتوای div ها (آرایه رشته‌ها)
  const [validate, setValidate] = useState(null);
  const [availableLetters, setAvailableLetters] = useState([]); // حروف باقی‌مانده برای کلیک
  const [stage, setStage] = useState(0); // حروف باقی‌مانده برای کلیک
  const [endGame, setEndGame] = useState(false);
  const [score, setScore] = useState(0);
  const [activeModal, setActiveModal] = useState("");
  const [divCount, setDivCount] = useState(null);
  const [changeLetterBg, setChangeLetterBg] = useState({
    index: [],
    enable: false,
  });

  // const letterButtonsQuantity = 25;
  const letterButtonsQuantity = 20;

  // تابع تولید ۲۶ حرف نهایی (۲۰ رندوم + ۶ اضافه)
  const generateFinalLetters = useCallback(() => {
    console.log("generateFinalLetters() is started");

    // console.log("generateFinalLetters");
    // ۶ حرف اضافه دلخواه (می‌توانید تغییر دهید)
    const extraLetters = enigmas[stage].letters;
    console.log("stage in generateFinalLetters():", stage);

    // انتخاب ۲۰ حرف رندوم
    const shuffled = [...letters];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const randomQuantity = shuffled.slice(
      0,
      letterButtonsQuantity - extraLetters.length
    );

    // ترکیب و حذف تکراری‌ها
    // let combined = [...new Set([...randomQuantity, ...extraLetters])];

    //تکراری هم می توانیم داشته باشیم
    let combined = [...randomQuantity, ...extraLetters];

    // در صورت کمبود تا ۲۶ حرف، از بقیه حروف پر کن
    // if (combined.length < 26) {
    //   const remaining = letters.filter((l) => !combined.includes(l));
    //   const needed = 26 - combined.length;
    //   combined = [...combined, ...remaining.slice(0, needed)];
    // }

    // console.log("generateFinalLetters() is complited");
    return shuffledArray(combined);
  }, [stage]);

  const handleDeleteLetter = useCallback(
    (letter, letterIndex) => {
      // console.log("handleDeleteLetter");

      // divContents.map((l, i) => {
      //   console.log(`${l} is letter and ${i} is its index`);
      // });
      // console.log(letterIndex, "letterIndex");

      const indexOfLetter = divContents.findIndex(
        (content, index) => index === letterIndex && content === letter
      );
      // console.log(indexOfLetter, "indexOfLetter");
      const filteredContents = [...divContents];
      filteredContents[indexOfLetter] = "";
      setDivContents(filteredContents);

      //back the deleted letter to letters
      if (letter !== "") {
        const newAvailableLetters = [...availableLetters];
        newAvailableLetters.push(letter);
        setAvailableLetters(newAvailableLetters);
      }
    },
    [divContents,availableLetters]
  );

  const areAllbuttonsField = useMemo(() => {
    return divContents.every((content) => content !== "");
  }, [divContents]);

  useEffect(() => {
    if (areAllbuttonsField) {
      const wordFormDivContents = divContents.join("");
      const wordFormAnswer = enigmas[stage].letters.join("");
      console.log("correct word:", wordFormAnswer);
      console.log("stage in use Effect:", stage);
      if (wordFormAnswer === wordFormDivContents) {
        setValidate(true);
      } else {
        setValidate(false);
      }
    } else {
      setValidate(false);
    }
  }, [areAllbuttonsField, stage, divContents]);

  //   const removeFromLetters = (letter,letterIndex) => {
  //   const newAvailable = availableLetters.filter(
  //     (_, index) => index !== letterIndex
  //   );
  //   setAvailableLetters(newAvailable);
  // };

  const removeFromLetters = (letter, letterIndex) => {
    const newAvailable = availableLetters.filter(
      (_, index) => index !== letterIndex
    );
    setAvailableLetters(newAvailable);
  };

  const showFirstLetter = () => {
    if (score >= 500) {
      const firstLetter = enigmas[stage].letters[0];
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
  };

  const showRandomLetter = () => {
    if (score >= 500) {
      const setRandomLetter = () => {
        const randomNum = Math.floor(Math.random() * divContents.length);
        let randomPlace = divContents[randomNum];

        if (randomPlace === "") {
          const randomCorrectLetter = enigmas[stage].letters[randomNum];
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
          removeFromLetters(randomCorrectLetter, getIndex);

        } else {
          return setRandomLetter();
        }
      };
      setRandomLetter();
    } else {
      alert("پول کافی ندارید!");
    }
  };

  useEffect(() => {
    // console.log("cheking if validate is true");
    if (validate) {
      // console.log("setting activeModal state = victory ...");
      setTimeout(() => setActiveModal("victory"), 700);
    }
    // console.log("end of setting activeModal");
  }, [validate]);

  // useEffect(() => {
  //   console.log("endGame is true. REALLY: ", endGame);
  // }, [endGame]);

  useEffect(() => {
    setDivCount(enigmas[stage].letters.length);
    console.log("check for last enima");
    const lastEnigma = enigmas.length - 1;
    if (stage === lastEnigma) {
      setEndGame(true);
      console.log("changing endGame value to true");
    }
  }, [stage]);


  // For LettersBox.jsx ------------------------------------------------------

  // مقداردهی اولیه: تولید ۲۶ حرف و ایجاد div های خالی
  useEffect(() => {
    const initialLetters = generateFinalLetters();
    setAvailableLetters(initialLetters);
    setDivContents(Array(divCount).fill(""));
  }, [divCount, generateFinalLetters]); // در صورت تغییر تعداد div ها، بازنشانی شود

  // پیدا کردن کوچکترین ایندکسی که محتوای آن خالی است (اولین div از راست)
  const findFirstEmptyDivIndex = () => {
    return divContents.findIndex((content) => content === "");
  };

  // مدیریت کلیک روی دکمه حرف
  const handleLetterClick = (letter, letterIndex) => {
    const emptyIndex = findFirstEmptyDivIndex();
    if (emptyIndex === -1) {
      alert("همه خانه ها پر شده‌اند!");
      return;
    }
    // console.log(letterIndex,"index");

    // به‌روزرسانی div
    const newDivContents = [...divContents];
    newDivContents[emptyIndex] = letter;
    setDivContents(newDivContents);
    // availableLetters.map((l,index) =>{
    //   console.log(`${l} is letter and ${index} is its index`);
    // });
    removeFromLetters(letter, letterIndex);
  };

  return (
    <GameContext.Provider
      value={{
        generateFinalLetters: generateFinalLetters,
        divContents,
        setDivContents: setDivContents,
        handleDeleteLetter,
        validate: validate,
        availableLetters,
        setAvailableLetters,
        stage: stage,
        activeModal,
        setActiveModal,
        showFirstLetter,
        showRandomLetter,
        handleLetterClick,
        changeLetterBg,
      }}
    >
      <CacheProvider value={cacheRTL}>
        <ThemeProvider theme={theme}>
          <HelmetProvider>
            <Helmet>
              <title>Bazi</title>
            </Helmet>
            <MainLayout>
              <VictoryModal
                isOpen={activeModal === "victory"}
                onClose={() => {
                  setValidate(false);
                  setActiveModal("");
                  setStage((e) => e + 1);
                  setScore((e) => e + 700);
                  setChangeLetterBg((prev) => ({
                    ...prev,
                    index: [],
                    enable: false,
                  }));
                  console.log("stage:", stage);
                }}
                stage={stage}
                soundEnabled={true}
                endGame={endGame}
              />
              <HelpModal
                isOpen={activeModal === "help"}
                onClose={() => {
                  setActiveModal("");
                  // setScore((e) => e + 1000);
                }}
                stage={stage}
                soundEnabled={true}
                endGame={endGame}
              />
              <HelpItem />
              <ScoreBadge score={score} />
              <EnigmaScreen stage={stage} />
              <LowerPart stage={stage} />
            </MainLayout>
          </HelmetProvider>
        </ThemeProvider>
      </CacheProvider>
    </GameContext.Provider>
  );
};

export default App;
