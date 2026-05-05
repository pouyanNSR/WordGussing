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
  const [changeLetterBg, setChangeLetterBg] = useState({
    index: [],
    enable: false,
  });
  // console.log(endGame);

  const letterButtonsQuantity = 25;

  // تابع تولید ۲۶ حرف نهایی (۲۰ رندوم + ۶ اضافه)
  const generateFinalLetters = useCallback(() => {
    // console.log("generateFinalLetters");
    // ۶ حرف اضافه دلخواه (می‌توانید تغییر دهید)
    const extraLetters = enigmas[stage].letters;

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
    [divContents]
  );

  const areAllbuttonsField = useMemo(() => {
    return divContents.every((content) => content !== "");
  }, [divContents]);

  useEffect(() => {
    if (areAllbuttonsField) {
      const wordFormDivContents = divContents.join("");
      const wordFormAnswer = enigmas[stage].letters.join("");
      if (wordFormAnswer === wordFormDivContents) {
        setValidate(true);
      } else {
        setValidate(false);
      }
    } else {
      setValidate(false);
    }
  }, [areAllbuttonsField, stage, divContents]);

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
    } else {
      alert("پول کافی ندارید!");
    }
  };

  const showRandomLetter = () => {
    if (score >= 500) {
      const randomLetterGenerator = () => {
        const randomNum = Math.floor(Math.random() * divContents.length);

        if (divContents[randomNum] === "") {
          // console.log("empty");
          // console.log(divContents[randomNum], "in divContents");
          const randomLetter = enigmas[stage].letters[randomNum];
          // console.log(randomLetter);

          const newDivContents = [...divContents];
          newDivContents[randomNum] = randomLetter;
          setDivContents(newDivContents);
          setChangeLetterBg((prev) => ({
            ...prev,
            enable: true,
            index: [...prev.index, randomNum],
          }));
          setScore((e) => e - 500);
        } else {
          return randomLetterGenerator();
        }
      };
      randomLetterGenerator();
    } else {
      alert("پول کافی ندارید!");
    }
  };

  useEffect(() => {
    if (validate) {
      setTimeout(() => setActiveModal("victory"), 700);
    }
  }, [validate]);

  useEffect(() => {
    const lastEnigma = enigmas.length - 1;
    if (stage === lastEnigma) {
      setEndGame(true);
    }
  }, [stage]);

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
                  setScore((e) => e + 1000);
                  setChangeLetterBg((prev) => ({
                    ...prev,
                    index: [],
                    enable: false,
                  }));
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
              <LowerPart />
            </MainLayout>
          </HelmetProvider>
        </ThemeProvider>
      </CacheProvider>
    </GameContext.Provider>
  );
};

export default App;
