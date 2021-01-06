'use strict';

// https://proglib.io/p/js-tricks/

/*
TODO ЗАДАЧИ:
  * 1) Исключение свойств из Объекта через Деструктуризацию
  * 2) Изменение порядка свойств в Объекте
  * 3) Свойства по умолчанию
  * 4) Переименование свойств JavaScript
  * 5) Добавление свойств с условием
  * 6) Создание нового объекта с свойствами старого при условии
  * 7) Преобразовать объект в два объекта и поменять местами ключи и значение
  * 8) Поменять местами ключи и значение и вернуть объект
  * 9) Записать новые свойства в объект через деструктуризацию
  * 10) Получения данных у navigator.userAgent
  * 11) В зависимости от True или False будет записан один или другой объект
  * 12) В зависимости от True или False значение в массив
  * 13) Поменять значение ключей в объекте местами
*/

// ! 1
(function () {
  // ! Исключение свойств из Объекта через Деструктуризацию

  const user = {
    id: 312,
    name: 'Пётр Иванов',
    password: 'Пароль!',
  };

  // * Удаляет из объекта пароль
  const noPassword = ({ password, ...rest }) => rest;
  console.log(noPassword(user)); // { id: 312, name: 'Пётр Иванов' }

  // ! Динамически удаляет необходимое свойство
  const removeProperty = prop => ({ [prop]: _, ...rest }) => rest;
  // _ - 312
  // prop - id
  // rest { name: 'Пётр Иванов', password: 'Пароль!' }

  // Удаляет из объекта id
  const removeId = removeProperty('id');
  // Удаляет из объекта имя
  const removeName = removeProperty('name');

  console.log(removeId(user)); // { name: 'Пётр Иванов', password: 'Пароль!' }
  console.log(removeName(user)); //  {id: 312, password: 'Пароль!' }
})();

// ! 2
(function () {
  // ! Изменение порядка свойств в Объекте

  const user2 = {
    password: 'Пароль!',
    name: 'Артём',
    id: 111,
  };

  /*
    Чтобы сделать password последним свойством, сначала вынесите password из объекта с помощью деструктуризации.
    Затем установите password после использования spread.
  */

  // * Перенос свойства из любого места в конец Объекта (PASSWORD)
  const organize = ({ password, ...object }) => ({ ...object, password });
  console.log(organize(user2)); // { name: 'Артём', id: 111, password: 'Пароль!' }

  // * Перенос свойства на первую позицию ID

  // undefined - может быть любое свойство (так оно означает свойство по умолчанию)
  // ! Главное : , а =
  const organize2 = object => ({ id: undefined, ...object });

  console.log(organize2(user2)); // { id: 111, password: 'Пароль!', name: 'Артём' }

  // # 2 Перенос свойства на первую позицию ID
  const organize3 = ({ id, ...object }) => ({ id, ...object });

  console.log(organize3(user2)); //  { id: 111, password: 'Пароль!', name: 'Артём' }

  // # Создается новый объект
  console.log(organize2(user2) === user2); // false
})();

// ! 3
(function () {
  // ! Свойства по умолчанию

  const user3 = {
    id: 288,
    name: 'Катя Петрова',
  };

  const user4 = {
    id: 270,
    name: 'Денис',
    quotes: ['У меня плохое предчувствие...'],
  };

  // * Добавления необходимого свойства
  const setDefaults = ({ quotes = [], ...object }) => ({ ...object, quotes });
  console.log(setDefaults(user3)); // { id: 288, name: 'Катя Петрова', quotes: [] }

  // * Добавления в начало
  const setDefaults2 = ({ quotes = [], ...object }) => ({ quotes, ...object });
  console.log(setDefaults2(user4)); // { quotes: [ 'У меня плохое предчувствие...' ], id: 270, name: 'Денис' }
})();

// ! 4
(function () {
  // ! Переименование свойств JavaScript

  /*
    Представьте некоторые объекты, у которых ID заглавные, а нужны строчные.
    Сначала извлеките ID из object путём деструктуризации.
    Затем добавьте это свойство обратно как id, когда применяете оператор spread
  */

  const user5 = {
    ID: 633,
    name: 'Вася Чехов',
  };

  const renamed = ({ ID, ...object }) => ({ id: ID, ...object });

  console.log(renamed(user5)); //  { id: 633, name: 'Вася Чехов' }
})();

// ! 5
(function () {
  // ! Добавление свойств с условием

  const user6 = { id: 312, name: 'Пётр Иванов' };

  const password = 'Пароль';

  // Если password пустая строка, то это свойство не будет добавлено
  const userWithPassword = {
    ...user6,
    id: 312,
    ...(password && { password }),
  };

  console.log(userWithPassword); // { id: 312, name: 'Пётр Иванов', password: 'Пароль' }
})();

// ! 6
(function () {
  // ! Создание нового объекта с свойствами старого при условии

  /*
    ЕСЛИ DATA - будет равно undefined или null, то добавиться свойство
    default: true
    {} - true
  */

  const data = { a: 1, b: 2 };
  // Сначала !!
  // Потом Тернарный
  // Потом spread

  const dataResult = {
    name: `result`,
    ...(data ? data : { default: true }),
  };

  console.log(dataResult); // { name: 'result', a: 1, b: 2 }

  const data2 = ``;

  const dataResult2 = {
    name: `result`,
    ...(data2 ? data2 : { default: true }),
  };
  console.log(dataResult2); // { name: 'result', a: 1, b: 2 }
})();

// ! 7
(function () {
  // ! Преобразовать объект в два объекта и поменять местами ключи и значение

  const abc = { a: 1, b: 2 };

  const a = Object.entries(abc).reduce((acc, [key, value]) => {
    acc.push({ [value]: key });
    return acc;
  }, []);

  console.log(a); // [ { 1: 'a' }, { 2: 'b' } ]

  const b = Object.entries(abc).map(([key, value]) => ({
    [value]: key,
  }));

  console.log(b); //  [ { 1: 'a' }, { 2: 'b' } ]
})();

// ! 8
(function () {
  // ! Поменять местами ключи и значение и вернуть объект

  const user6 = { id: 312, name: 'Пётр Иванов' };

  const swapKey = Object.entries(user6).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;

    // ИЛИ ТАК
    // return {...acc, [value]: key}
  }, {});
  console.log(swapKey); //  { 312: 'id', 'Пётр Иванов': 'name' }
})();

// ! 9
(function () {
  // ! Записать новые свойства в объект через деструктуризацию

  let user = {};

  [user.name, user.surname] = 'Ilya Kantor'.split(' ');

  console.log(user); // { name: 'Ilya', surname: 'Kantor' }
})();

// ! 10
(function () {
  // ! Получения данных у navigator.userAgent

  // * navigator.userAgent
  const navigatorUserAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36';

  const [os, userAgent, browserInfo] = navigatorUserAgent.split('(').join().split(')');
  // console.log(os)  Mozilla/5.0 ,Windows NT 10.0; Win64; x64
  // console.log(userAgent) AppleWebKit/537.36 ,KHTML, like Gecko
  // console.log(browserInfo)  Chrome/75.0.3770.142 Safari/537.36

  // Можно пропустить свойства [, , browserInfo]
})();

// ! 11
(function () {
  // ! В зависимости от True или False будет записан один или другой объект

  const isWeekend = false;
  const mood = {
    ...(isWeekend ? { music: 'Whethan, Dua Lipa - High' } : { routine: 'Eat Sleep Code Repeat' }),
  };
  // console.log(mood); { routine: 'Eat Sleep Code Repeat' }
})();

// ! 12
(function () {
  // ! В зависимости от True или False значение в массив
  const yes = true;
  const no = false;
  [1, 2, yes && 3].filter(Boolean); // [ 1, 2, 3 ]
  [1, 2, no && 3].filter(Boolean); // [ 1, 2 ]
})();

// ! 13
(function () {
  // ! Поменять значение ключей в объекте местами

  const firstPuzzle = {
    id: 1,
    edges: {
      bottom: { edgeTypeId: 383, type: 'outside' },
      left: { edgeTypeId: 238, type: 'inside' },
      top: null,
      right: null,
    },
  };

  const {
    edges: { right: left, left: right, ...otherEdges },
    ...otherPuzzle
  } = firstPuzzle;

  // Замена без сохранения последовательности
  const newPuzzle = { ...otherPuzzle, edges: { left, right, ...otherEdges } };

  // Замена c сохранения последовательности
  const newPuzzle2 = {
    ...otherPuzzle,
    edges: {
      ...firstPuzzle.edges,
      left,
      right,
    },
  };
})();
