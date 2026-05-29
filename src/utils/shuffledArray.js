export const shuffledArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    // const j = Math.floor(Math.random() * (i + 1));
    const j = Math.floor(Math.random() * array.length);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
