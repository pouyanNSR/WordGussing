  export const removeFromLetters = (letterIndex,availableLetters) => {
    const newAvailable = availableLetters.filter(
      (_, index) => index !== letterIndex
    );
    return newAvailable
  };