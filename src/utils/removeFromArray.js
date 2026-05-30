export const removeSpecificIndexes = (array = [],removeList = []) => {
    const newArray = array.filter(item => !removeList.includes(item))
    return newArray
};

export const removeFromLetters = (letterIndex, availableLetters) => {
  const newAvailable = availableLetters.filter(
    (_, index) => index !== letterIndex
  );
  return newAvailable;
};
