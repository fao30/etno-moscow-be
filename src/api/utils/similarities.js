const stringSimilarity = require("string-similarity");

exports.similarities = ({ firstWords, secondWords }) => {
  const allHardSkills = secondWords.filter((e) => e.isHardSkill);
  const listWordsSimilar = [];
  let listOfDiciplines = [];
  let listWordsUnsimilar = [];
  for (let i = 0; i < firstWords.length; i++) {
    const diciplineNames = [];
    for (let j = 0; j < secondWords.length; j++) {
      const similarityScore = stringSimilarity.compareTwoStrings(
        firstWords[i].text.toUpperCase(),
        secondWords[j].name.toUpperCase()
      );
      const score = (similarityScore * 100).toFixed(2);

      const hasExist = !listWordsSimilar.includes(secondWords[j].name);
      if (+score >= 1.5 && secondWords[j].isHardSkill && hasExist) {
        listWordsSimilar.push(secondWords[j].name);
        diciplineNames.push(firstWords[i].name);
      } else if (+score < 1.5 && secondWords[j].isHardSkill && hasExist) {
        if (!listWordsUnsimilar.includes(secondWords[j].name)) {
          listWordsUnsimilar.push(secondWords[j].name);
        }
      }

      if (listWordsSimilar.includes(secondWords[j].name)) {
        const filteredArray = listWordsUnsimilar.filter(
          (item) => item !== secondWords[j].name
        );
        listWordsUnsimilar = [...filteredArray];
      }
    }
    listOfDiciplines.push(...diciplineNames);
  }
  let unique = [];

  listOfDiciplines.forEach((ele, i) => {
    if (unique.indexOf(listOfDiciplines[i]) === -1) {
      unique.push(listOfDiciplines[i]);
    }
  });

  const score = ((listOfDiciplines.length / allHardSkills.length) * 100) / 100;

  return {
    accurate: listWordsSimilar,
    unAccurate: listWordsUnsimilar,
    listOfDiciplines: unique,
    percentage: score ? +score.toFixed(2) : "0",
  };
};
exports.similaritiesStudents = ({ firstWords, secondWords }) => {
  const allHardSkills = secondWords.filter((e) => e.isHardSkill);
  const listWords = [];
  let listOfDiciplines = [];
  let listWordsUnmatch = [];
  let listRecommendedSubjects = [];
  //secondWords adalah keywords dari vacancy
  for (let i = 0; i < firstWords.length; i++) {
    const diciplineNames = [];
    for (let j = 0; j < allHardSkills.length; j++) {
      const hasExist = !listWords.includes(allHardSkills[j].name);
      const hasExistUnmatch = !listWordsUnmatch.includes(allHardSkills[j].name);

      const similarityScore = stringSimilarity.compareTwoStrings(
        firstWords[i].text.toUpperCase(),
        allHardSkills[j].name.toUpperCase()
      );
      const score = (similarityScore * 100).toFixed(2);

      if (+score >= 1.5 && hasExist) {
        listWords.push(allHardSkills[j].name);
        diciplineNames.push(firstWords[i].name);
      } else if (+score < 1.5 && hasExist) {
        if (hasExistUnmatch) {
          listWordsUnmatch.push(allHardSkills[j].name);
          listRecommendedSubjects.push(allHardSkills[j]);
        }
      }

      if (listWords.includes(allHardSkills[j].name)) {
        const filteredArray = listWordsUnmatch.filter(
          (item) => item !== allHardSkills[j].name
        );
        listWordsUnmatch = [...filteredArray];
      }
    }
    listOfDiciplines.push(...diciplineNames);
  }
  let unique = [];

  const score = ((listWords.length / allHardSkills.length) * 100).toFixed(2);

  listOfDiciplines.forEach((ele, i) => {
    if (unique.indexOf(listOfDiciplines[i]) === -1) {
      unique.push(listOfDiciplines[i]);
    }
  });
  const newRecommendationCourse = [];
  listRecommendedSubjects.forEach((ele, i) => {
    if (listWords.indexOf(ele.name) === -1) {
      newRecommendationCourse.push(ele);
    }
  });

  return {
    listWords,
    listWordsUnMatch: listWordsUnmatch,
    listOfDiciplines: unique.length ? unique : [],
    listRecommendedSubjects: newRecommendationCourse,
    percentage: score ? +score : "0",
  };
};

exports.similaritiesWords = ({ firstWords, secondWords }) => {
  const allHardSkills = secondWords.filter((e) => e.isHardSkill);
  const listWords = [];
  let listWordsUnMatch = [];
  let listOfDiciplines = [];

  for (let i = 0; i < firstWords.length; i++) {
    const diciplineNames = [];

    for (let j = 0; j < allHardSkills.length; j++) {
      const hasExist = !listWords.includes(allHardSkills[j].name);
      const hasExistUnmatch = !listWordsUnMatch.includes(allHardSkills[j].name);
      const similarityScore = stringSimilarity.compareTwoStrings(
        firstWords[i].text.toUpperCase(),
        allHardSkills[j].name.toUpperCase()
      );
      const score = (similarityScore * 100).toFixed(2);

      if (+score >= 1.5 && hasExist) {
        listWords.push(allHardSkills[j].name);
        diciplineNames.push(firstWords[i].name);
      } else if (+score < 1.5 && hasExist) {
        if (hasExistUnmatch) {
          listWordsUnMatch.push(allHardSkills[j].name);
        }
      }
      if (listWords.includes(allHardSkills[j].name)) {
        const filteredArray = listWordsUnMatch.filter(
          (item) => item !== allHardSkills[j].name
        );
        listWordsUnMatch = [...filteredArray];
      }
    }
    listOfDiciplines.push(...diciplineNames);
  }
  let unique = [];

  const counting = ((listWords.length / allHardSkills.length) * 100).toFixed(2);

  listOfDiciplines.forEach((ele, i) => {
    if (unique.indexOf(listOfDiciplines[i]) === -1) {
      unique.push(listOfDiciplines[i]);
    }
  });

  return {
    listWords,
    listWordsUnMatch,
    listOfDiciplines: unique.length ? unique : [],
    percentage: counting > 0 && counting <= 100 ? +counting : 0,
  };
};

exports.similaritiesWordsHH = ({ firstWords, secondWords }) => {
  const listWords = [];
  let listWordsUnMatch = [];
  let listOfDiciplines = [];
  for (let i = 0; i < firstWords.length; i++) {
    const diciplineNames = [];

    for (let j = 0; j < secondWords.length; j++) {
      const hasExist = !listWords.includes(secondWords[j].name);
      const hasExistUnmatch = !listWordsUnMatch.includes(secondWords[j].name);
      const similarityScore = stringSimilarity.compareTwoStrings(
        firstWords[i].name.toUpperCase(),
        secondWords[j].name.toUpperCase()
      );
      const score = (similarityScore * 100).toFixed(2);

      if (+score >= 1.5 && hasExist) {
        listWords.push(secondWords[j].name);
        diciplineNames.push(firstWords[i].name);
      } else if (+score < 1.5 && hasExist) {
        if (hasExistUnmatch) {
          listWordsUnMatch.push(secondWords[j].name);
        }
      }
      if (listWords.includes(secondWords[j].name)) {
        const filteredArray = listWordsUnMatch.filter(
          (item) => item !== secondWords[j].name
        );
        listWordsUnMatch = [...filteredArray];
      }
    }
    listOfDiciplines.push(...diciplineNames);
  }
  let unique = [];

  const counting = ((listWords.length / secondWords.length) * 100).toFixed(2);

  listOfDiciplines.forEach((ele, i) => {
    if (unique.indexOf(listOfDiciplines[i]) === -1) {
      unique.push(listOfDiciplines[i]);
    }
  });

  return {
    listWords,
    listWordsUnMatch,
    listOfDiciplines: unique.length ? unique : [],
    percentage: counting > 0 && counting <= 100 ? +counting : 0,
  };
};
