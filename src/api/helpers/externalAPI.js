require("dotenv").config();
const axios = require("axios");
const mammoth = require("mammoth");
const UserSkillService = require("../service/userSkillService");
const { Skills, Users, Studies, Specializations } = require("../models");
const {
  similaritiesWords,
  similarities,
  similaritiesWordsHH,
} = require("../utils/similarities");
const JWT = require("../utils/token");

exports.findKeyWords = async (words) => {
  const result = await mammoth.extractRawText({ path: words.path });
  const noSpace = result.value.split(" ").join(" ");

  let getWords = "";
  //GET RID OF \n
  const someText = noSpace.replace(/(\r\n|\n|\r)/gm, "");
  //GET RID OF SPACE
  const wordsDevided = someText.split(" ");

  let getSummary = "";

  for (let i = 0; i < wordsDevided.length; i++) {
    //REPLACING BY %
    //GET THE SUMMERIZE by 1000
    getWords += wordsDevided[i] + "%";
    if ((i !== 0 && i % 1000 === 0) || i === wordsDevided.length - 1) {
      const getKeyWords = await axios.post(
        process.env.API_LAYER_API,
        {
          body: getWords,
        },
        {
          headers: {
            apikey: process.env.API_LAYER_KEY,
          },
        }
      );
      getKeyWords.data.result.forEach((e) => {
        getSummary += e.text + "%";
      });
      getWords = "";
    }
  }
  const getFinalWords = await axios.post(
    process.env.API_LAYER_API,
    {
      body: getSummary,
    },
    {
      headers: {
        apikey: process.env.API_LAYER_KEY,
      },
    }
  );

  const sumAllWords = getFinalWords.data.result.map((e) => {
    if (e.text && e.text !== "-") {
      if (e.text.includes("%")) {
        const wordsWithoutSign = e.text.split("%");
        return wordsWithoutSign[0], wordsWithoutSign[1];
      } else {
        return e.text;
      }
    }
  });

  const showAllWords = [];

  for (let i = 0; i < sumAllWords.length; i++) {
    if (sumAllWords[i].split(/\s*-(?:;|$)\s*/).join("")) {
      showAllWords.push(sumAllWords[i]);
    }
  }

  return showAllWords;
};

exports.findKeyWordsVacanciesFromHH = async (query) => {
  const response = await axios.get(`${process.env.THIRD_PARTY_API}/vacancies`, {
    headers: {
      Authorization: `Bearer O0B2P2RS5BEL8IU9A59T1VV9U79GLAUICKCNCC1AA84QCHFH8TEK4IUJTECN0OJF`,
    },
    params: {
      text: query,
      per_page: 5,
    },
  });
  let promises = [];

  for (let i = 0; i < response.data.items.length; i++) {
    const balikan = response.data.items;
    promises.push(
      new Promise((resolve, reject) => {
        axios
          .get(`${process.env.THIRD_PARTY_API}/vacancies/${balikan[i].id}`, {
            headers: {
              Authorization: `Bearer O0B2P2RS5BEL8IU9A59T1VV9U79GLAUICKCNCC1AA84QCHFH8TEK4IUJTECN0OJF`,
            },
          })
          .then((response) => {
            resolve(response.data.key_skills);
          });
      })
    );
  }

  const respond = await Promise.all(promises);

  return response.data.items.map((e, i) => {
    return { ...e, keyWords: respond[i] };
  });
};

exports.findVacancyKeyWords = async (query) => {
  const response = await axios.get(
    `${process.env.THIRD_PARTY_API}/suggests/vacancy_search_keyword`,
    {
      params: {
        text: query,
      },
    }
  );
  return response.data;
};

exports.findRegions = async (query) => {
  const params = {};
  if (query) params.text = query;
  const response = await axios.get(
    `${process.env.THIRD_PARTY_API}/suggests/areas`,
    {
      params,
    }
  );
  return response.data;
};

exports.findSkillsKey = async (query) => {
  const response = await axios.get(
    `${process.env.THIRD_PARTY_API}/suggests/skill_set`,
    {
      params: {
        text: query,
      },
    }
  );
  return response.data;
};

exports.findSpecialization = async (query) => {
  const response = await axios.get(
    `${process.env.THIRD_PARTY_API}/suggests/fields_of_study`,
    {
      params: {
        text: query,
      },
    }
  );
  return response.data;
};

exports.findAllVacancies = async ({
  page,
  limit,
  isStudent,
  text,
  area,
  userId,
  idOp,
}) => {
  const config = {
    headers: {
      Authorization: `Bearer O0B2P2RS5BEL8IU9A59T1VV9U79GLAUICKCNCC1AA84QCHFH8TEK4IUJTECN0OJF`,
    },
  };

  const params = { per_page: 5 };
  if (text) params.text = text;
  if (page) params.page = page;
  if (limit) params.per_page = limit;
  if (area) params.area = area;

  const response = await axios.get(`${process.env.THIRD_PARTY_API}/vacancies`, {
    headers: {
      Authorization: `Bearer O0B2P2RS5BEL8IU9A59T1VV9U79GLAUICKCNCC1AA84QCHFH8TEK4IUJTECN0OJF`,
    },
    params,
  });

  let respSpecVacancy;
  let respStudent;

  if (isStudent === "false") {
    respSpecVacancy = await Specializations.findAll({
      where: {
        studyId: idOp,
      },
      include: [
        {
          model: Skills,
          as: "key_words",
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
          // attributes: ["updatedAt", "createdAt"],
        },
      ],
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });
  } else if (isStudent === "true") {
    respStudent = await Users.findOne({
      where: { id: userId },
      include: [
        {
          model: Skills,
          as: "userSkills",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  let promises = [];

  // return respSpecVacancy;

  for (let i = 0; i < response.data.items.length; i++) {
    const balikan = response.data.items;
    promises.push(
      new Promise((resolve, reject) => {
        axios
          .get(`${process.env.THIRD_PARTY_API}/vacancies/${balikan[i].id}`, {
            headers: {
              Authorization: `Bearer O0B2P2RS5BEL8IU9A59T1VV9U79GLAUICKCNCC1AA84QCHFH8TEK4IUJTECN0OJF`,
            },
          })
          .then(
            (response) => {
              resolve(response.data.key_skills);
            },
            (error) => {
              console.log(error.response.data, "<<<ERRORR");
            }
          );
      })
    );
  }
  let getSpecVac;
  if (isStudent === "false") {
    getSpecVac = respSpecVacancy.map((el) => {
      return {
        id: el.id,
        name: el.name,
      };
    });
  }
  const respond = await Promise.all(promises);

  return {
    ...response.data,
    items: response.data.items.map((e, i) => {
      const getSimiliarities = similaritiesWordsHH({
        firstWords: isStudent === "false" ? getSpecVac : respStudent.userSkills,
        secondWords: respond[i],
      });
      return {
        ...e,
        keyWords: respond[i],
        percentage: +getSimiliarities.percentage,
      };
    }),
  };
};

exports.findVacancyById = async (id, vacancyId) => {
  //ADJUST
  //DAPETIN ID DARI USER DAN MASUKIN DI LINE 233
  const user = await Users.findOne({
    where: { id },
    include: [
      {
        model: Skills,
        as: "userSkills",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  const config = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
  };
  const response = await axios.get(
    `${process.env.THIRD_PARTY_API}/vacancies/${vacancyId}`,
    config
  );
  const getSimiliarities = similaritiesWordsHH({
    firstWords: user.userSkills,
    secondWords: response.data.key_skills,
  });
  return { getSimiliarities, ...response.data };
};
exports.getVacancyMopByIdOp = async (id, idOp) => {
  const respSpecVacancy = await Specializations.findAll({
    where: {
      studyId: idOp,
    },
    include: [
      {
        model: Skills,
        as: "key_words",
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
        // attributes: ["updatedAt", "createdAt"],
      },
    ],
    attributes: {
      exclude: ["updatedAt", "createdAt"],
    },
  });
  const config = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
  };
  const response = await axios.get(
    `${process.env.THIRD_PARTY_API}/vacancies/${id}`,
    config
  );
  const getSpecVac = respSpecVacancy.map((el) => {
    return {
      id: el.id,
      name: el.name,
    };
  });
  const getSimiliarities = similaritiesWordsHH({
    firstWords: getSpecVac,
    secondWords: response.data.key_skills,
  });
  return { getSimiliarities, ...response.data };
};

exports.getSpecializationComparison = async ({ id, text }) => {
  const specialization = await Specializations.findOne({
    where: { id },
    include: [
      {
        model: Skills,
        through: {
          attributes: [],
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        as: "key_words",
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  const specializationArr = [];
  specialization.key_words.map((e) => {
    specializationArr.push({ id: e.id, name: e.name });
  });

  const config = {
    headers: {
      Authorization: `Bearer O0B2P2RS5BEL8IU9A59T1VV9U79GLAUICKCNCC1AA84QCHFH8TEK4IUJTECN0OJF`,
    },
  };

  const params = {};
  if (text) params.text = text;
  const vacancies = await axios.get(
    `${process.env.THIRD_PARTY_API}/vacancies`,
    { params }
  );

  let result = [];
  vacancies.data.items.map(async (e) => {
    result.push(
      new Promise((resolve, reject) => {
        axios
          .get(`${process.env.THIRD_PARTY_API}/vacancies/${e.id}`, config)
          .then((response) => {
            const getSimilarities = similaritiesWordsHH({
              firstWords: specializationArr,
              secondWords: response.data.key_skills,
            });

            resolve({ ...getSimilarities, ...response.data });
          });
      })
    );
  });

  const res = await Promise.all(result);
  return res;
};
