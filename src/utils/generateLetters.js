import {shuffledArray} from "./shuffledArray"

export const generateLetters = (correctLetters,allLetters,totalQuantity) => {

  const extraLetters = correctLetters;

  const shuffled = shuffledArray(allLetters)
  const randomQuantity = shuffled.slice(
    0,
    totalQuantity - extraLetters.length
  );
  let combined = [...randomQuantity, ...extraLetters];
  return shuffledArray(combined);
};
