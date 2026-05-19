import { useCallback } from "react";
import { removeFromLetters } from "../utils/letterDeleter";

export const useLetterHandlers = (
  availableLetters,
  divContents,
  setDivContents,
  setAvailableLetters
) => {
  const handleDeleteLetter = useCallback(
    (letter, letterIndex) => {
      const indexOfLetter = divContents.findIndex(
        (content, index) => index === letterIndex && content === letter
      );
      const filteredContents = [...divContents];
      filteredContents[indexOfLetter] = "";
      setDivContents(filteredContents);

      if (letter !== "") {
        const newAvailableLetters = [...availableLetters];
        newAvailableLetters.push(letter);
        setAvailableLetters(newAvailableLetters);
      }
    },
    [divContents, availableLetters,setDivContents,setAvailableLetters]
  );

  // مدیریت کلیک روی دکمه حرف
  const handleLetterClick = useCallback(
    (letter, letterIndex) => {
      const firstEmptyIndex = divContents.findIndex(
        (content) => content === ""
      );
      if (firstEmptyIndex === -1) {
        alert("همه خانه ها پر شده‌اند!");
        return;
      }
      // به‌روزرسانی div
      const newDivContents = [...divContents];
      newDivContents[firstEmptyIndex] = letter;
      setDivContents(newDivContents);
      setAvailableLetters(removeFromLetters(letterIndex,availableLetters));
    },
    [divContents, setAvailableLetters,availableLetters,setDivContents]
  );
  return { handleDeleteLetter, handleLetterClick, removeFromLetters };
};
