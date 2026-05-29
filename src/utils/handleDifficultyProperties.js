import { enigmas } from "../data/answer";

const propertySetter = (stageDifficulty) => {
  switch (stageDifficulty) {
    case "hard":
      return { bg: "rgb(194, 3, 3)", lable: "سخت" };
    case "normal":
      return { bg: "rgb(207, 115, 10)", lable: "متوسط" };
    case "easy":
      return { bg: "rgb(29, 116, 2)", lable: "ساده" };
    default:
      break;
  }
};

export const handletDifficultyProperties = (index) => {
  const stageDifficulty = enigmas[index].difficulty;
  const properties = propertySetter(stageDifficulty);
  return {
    background: properties.bg,
    name: properties.lable,
  };
};
