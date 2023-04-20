"use strict";

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Regions", [
      {
        id: uuidv4(),
        code: "01",
        name: "Республика Адыгея (Адыгея)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "02",
        name: "Республика Башкортостан",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "03",
        name: "Республика Бурятия",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "04",
        name: "Республика Алтай",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "05",
        name: "Республика Дагестан",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "06",
        name: "Республика Ингушетия",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "07",
        name: "Кабардино-Балкарская Республика",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "08",
        name: "Республика Калмыкия",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "09",
        name: "Карачаево-Черкесская Республика",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "10",
        name: "Республика Карелия",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "11",
        name: "Республика Коми",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "12",
        name: "Республика Марий Эл",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "13",
        name: "Республика Мордовия",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "14",
        name: "Республика Саха (Якутия)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "15",
        name: "Республика Северная Осетия - Алания",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "16",
        name: "Республика Татарстан (Татарстан)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "17",
        name: "Республика Тыва",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "18",
        name: "Удмуртская Республика",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "19",
        name: "Республика Хакасия",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "20",
        name: "Чеченская Республика",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "21",
        name: "Чувашская Республика - Чувашия",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "22",
        name: "Алтайский край",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "23",
        name: "Краснодарский край",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "24",
        name: "Красноярский край",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "25",
        name: "Приморский край",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "25",
        name: "Приморский край",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "26",
        name: "Ставропольский край",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "27",
        name: "Хабаровский край",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "28",
        name: "Амурская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "29",
        name: "Архангельская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "30",
        name: "Астраханская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "31",
        name: "Белгородская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "32",
        name: "Брянская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "33",
        name: "Владимирская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "34",
        name: "Волгоградская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "35",
        name: "Вологодская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "36",
        name: "Воронежская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "37",
        name: "Ивановская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "38",
        name: "Иркутская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "39",
        name: "Калининградская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "40",
        name: "Калужская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "41",
        name: "Камчатский край",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "41",
        name: "Камчатский край",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "42",
        name: "Кемеровская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "43",
        name: "Кировская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "44",
        name: "Костромская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "45",
        name: "Курганская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "46",
        name: "Курская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "46",
        name: "Курская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "47",
        name: "Ленинградская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "48",
        name: "Липецкая область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "49",
        name: "Магаданская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "50",
        name: "Московская область",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Regions", null, {});
  },
};

// 51
// Мурманская область
// 52
// Нижегородская область
// 53
// Новгородская область
// 54
// Новосибирская область
// 55
// Омская область
// 56
// Оренбургская область
// 57
// Орловская область
// 58
// Пензенская область
// 59
// Пермский край
// 60
// Псковская область
// 61
// Ростовская область
// 62
// Рязанская область
// 63
// Самарская область
// 64
// Саратовская область
// 65
// Сахалинская область
// 66
// Свердловская область
// 67
// Смоленская область
// 68
// Тамбовская область
// 69
// Тверская область
// 70
// Томская область
// 71
// Тульская область
// 72
// Тюменская область
// 73
// Ульяновская область
// 74
// Челябинская область
// 75
// Забайкальский край
// 76
// Ярославская область
// 77
// г. Москва
// 78
// Санкт-Петербург
// 79
// Еврейская автономная область
// 83
// Ненецкий автономный округ
// 86
// Ханты-Мансийский автономный округ - Югра
// 87
// Чукотский автономный округ
// 89
// Ямало-Ненецкий автономный округ
// 99
// Иные территории, включая город и космодром Байконур
