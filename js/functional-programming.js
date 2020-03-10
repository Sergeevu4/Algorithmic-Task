'use strict';

/*
TODO ЗАДАЧИ:
  * 1) Чистые функции (Функциональный стиль)
  * 2) Каррирование
  * 3) Композиция
  * 4) Отладка функциональных композиций
  * 5) Создать тикающие часы: Императивное решение
  * 6) Создать тикающие часы: Декларативное решение
  */

(function() {
  // ? Стили для console.log
  const consoleLogStyles = [
    'color: green',
    'background-color: yellow',
    'font-size: 12px',
    'border: 1px solid red',
    'padding: 5px',
  ].join(';');

  (function() {
    console.log('%c 1) ЧИСТЫЕ ФУНКЦИИ (ФУНКЦИОНАЛЬНЫЙ СТИЛЬ)', consoleLogStyles);

    // ! Чистые функции:
    /*
      * 1. Функция должна получать как минимум один аргумент.
      * 2. Функция должна возвращать значение или другую функцию.
      * 3. Функция не должна вносить какие-либо изменения в переданные ей аргументы.

      Чистые функции при вычислении результата используют только то,
        что явно передано им в качестве параметров.

      Другими словами, чистые функции не могут использовать глобальное состояние или состояния,
      доступные через какие-то другие конструкции и менять эти состояния . В том числе и изменения Аргументов.
      Может менять только собственные локальные состояние, переменные.

      - Чистые функции всегда должны возвращать один и тот же вывод при одинаковом вводе;
      - Чистые функции легко тестировать, легко составлять и избегать ошибок;
      - Нет побочных эффектов: чистые функции не могут ничего изменить вне их самих.

      Читая функция: потому что (a, b) => a > b ? a : b
      НЕ Чистая функция (a) => Math.random() * a.
        Результат зависит от того какое число вернут Math.random

      *  Персистентность - возможность хранения более старых версий структур данных
      и копирование только изменившихся частей.
    */

    // # Добавления нового свойства, без изм. ориг. массива
    const list = [{ title: 'Rad Red' }, { title: 'Lawn' }, { title: 'Party Pink' }];

    // array.concat({title}
    const addColor = (title, arr) => [...arr, { title }];
    // console.log(addColor("Glam Green", list).length) // 4

    // # Изменения свойства в объекте, без изм. ориг. объекта
    const colorLawn = {
      title: 'lawn',
      color: '#00FF00',
      arr: [1, 2],
      rating: 0,
    };

    // Object.assign({}, obj, {rating:rating})
    const rateColor = (obj, rating) => ({
      ...obj,
      rating,
    });

    // console.log(rateColor(colorLawn, 10).rating) // 10
    const colorLawn2 = rateColor(colorLawn, 10);

    // # Копия только тех данных (или частей структуры данных), которые необходимо изменить.
    // colorLawn.arr === colorLawn2.arr -> true

    // ! Функциональный стиль

    /*
      * Предикат - называется функция, которая всегда возвращает булево значение: true или false.
      Функция Array.filter вызывает этот предикат по одному разу для каждого элемента массива
      При решении задачи по удалению элемента из массива нужно пользоваться функцией Array.filter,
      а не функцией Array.pop или Array.splice, так как Array.filter не вносит в данные никаких изменений.
    */

    const schoolsArr = ['Yorktown', 'Washington & Lee', 'Wakefield'];
    const cutSchool = (cut, arr) => arr.filter(school => school !== cut);
    // console.log(cutSchool("Washington & Lee", schoolsArr)) //  [ 'Yorktown', 'Wakefield' ]

    // # Изменить один объект в массиве объектов
    const schoolsObj = [
      { name: 'Yorktown' },
      { name: 'Stratford' },
      { name: 'Washington & Lee' },
      { name: 'Wakefield' },
    ];

    // ! name - точно такое же имя как в ключ в объекте
    const editName = (oldName, name, arr) =>
      arr.map(item => {
        if (item.name === oldName) {
          return {
            ...item, // через spread раскладываю на ключ: свойства name: 'Stratford'
            name, // заменяю совпадающее по названию свойства es5 -> name: name -> 'HB Woodlawn'
          };
        } else {
          return item;
        }
      });

    const updatedSchools = editName('Stratford', 'HB Woodlawn', schoolsObj);
    // console.log(updatedSchools[1]); // { name: "HB Woodlawn" }
    // console.log(schoolsObj[1]); // { name: 'Stratford' }

    /*
  * Для преобразования массива в любое значение,
    включая число, строку, булево значение, объект или даже функцию,
    могут использоваться функции reduce и reduceRight.
*/

    // # Превратить массив в объект
    const colorsReduce = [
      {
        id: '-xekare',
        title: 'rad red',
        rating: 3,
      },
      {
        id: '-jbwsof',
        title: 'big blue',
        rating: 2,
      },
      {
        id: '-prigbj',
        title: 'grizzly grey',
        rating: 5,
      },
      {
        id: '-ryhbhsl',
        title: 'banana',
        rating: 1,
      },
    ];

    const hashColors = colorsReduce.reduce((acc, { id, title, rating }) => {
      acc[id] = { title, rating };
      return acc;
    }, {});

    console.log(`Превратить массив в объект ${hashColors}`);
    /*
    {
      '-xekare': { title: 'rad red', rating: 3 },
      '-jbwsof': { title: 'big blue', rating: 2 },
      '-prigbj': { title: 'grizzly grey', rating: 5 },
      '-ryhbhsl': { title: 'banana', rating: 1 }
    }
  */

    // ! Встроенный метод
    console.log(
      //  { banana: 1, orange: 2, meat: 4 }
      Object.fromEntries([
        ['banana', 1],
        ['orange', 2],
        ['meat', 4],
      ])
    );
  })();

  // !2
  (function() {
    console.log('%c 2) КАРРИРОВАНИЕ', consoleLogStyles);

    /*
      ! Каррирование - это способ конструирования функций, позволяющий частичное применение аргументов функции.
      Это означает, что вы можете передать все аргументы, ожидаемые функцией и получить результат или
      передать часть этих аргументов и получить обратно функцию, ожидающую остальные аргументы.

      Каррирование или карринг - процесс рефакторинга функции, способствующий получению аргументов по одному.
      Карри-функция, порядок аргументов имеет огромное значение.

      Карри-функции помогают упорядочить аргументы от наиболее конкретного до наименее конкретного.
      Наименее конкретным аргументом в каждом случае всегда будут данные,
      которые могут быть логическим значением, числом, строкой, объектом, массивом и т.д.
    */

    // # Карри-функции
    const people = [{ name: 'Alex' }, { name: 'Julia' }, { name: 'Leo' }, { name: 'Den' }];

    const map = fn => array => array.map(fn);
    const prop = key => obj => obj[key];
    const getName = prop('name');

    // map: 1 - параметр функция obj => obj[name], 2 -  массив
    map(getName)(people); // [ 'Alex', 'Julia', 'Leo', 'Den' ]
  })();

  (function() {
    console.log('%c 3) КОМПОЗИЦИЯ', consoleLogStyles);

    /*
      ! Композиция - создание сложной функциональности за счет объединения более простых функций.
      В некотором смысле, композиция - это вложение функций,
      каждая из которых передает свой результат в качестве входных данных для другой функции.
    */

    const upperCase = str => str.toUpperCase();
    const exclaim = str => `${str}!`;
    const repeat = str => `${str} `.repeat(3);

    // # Длинно и трудно для чтения
    // repeat(exclaim(upperCase("I love coding"))) // I LOVE CODING! I LOVE CODING! I LOVE CODING!

    // # Функция Композиция
    // x - начальное значение (строка)
    // reduceRight - потому что в выше, сначала выполняются функции внутри, то есть с конца, но можно и reduce
    const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

    const compose2 = (...fns) => arg => fns.reduce((composed, fn) => fn(composed), arg);

    const withСompose = compose(repeat, exclaim, upperCase);
    // withСompose("I love coding") //  I LOVE CODING! I LOVE CODING! I LOVE CODING!
  })();

  // !4
  (function() {
    console.log('%c 4) ОТЛАДКА ФУНКЦИОНАЛЬНЫХ КОМПОЗИЦИЙ', consoleLogStyles);

    // ! Отладка функциональных композиций

    const bookTitles = ['JavaScript The Good Parts', 'You Don’t Know JS', 'Eloquent JavaScript'];

    // Каррированые функции
    const lowerCase = str => str.toLowerCase();
    const join = separator => xs => xs.join(separator);
    const split = pattern => str => str.split(pattern);

    const map = fn => xs => xs.map(fn); // fn ~ compose(...fns)

    // Композиция
    const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

    // ! Отладчик, функция которая делает побочный эффект и выводит в консоль текущее значение.
    const trace = massage => x => (console.log(massage, x), x);

    const slugify = compose(
      map(join('-')), // xs.map( xs => xs.join(separator))
      // trace("after split"),
      map(split(' ')), // xs.map( str => str.split(pattern))
      // trace("after lowercase"),
      map(lowerCase) // xs.map( str => str.toLowerCase())
      // trace("before lowerCase")
    );

    const slugs = slugify(bookTitles);
    //  [ 'javascript-the-good-parts','you-don’t-know-js', 'eloquent-javascript' ]

    // * Так как мы вызываем map на всех функциях, то вместо этого можем обернуть один раз композицию в map.

    /*
    Каждая строка переданная в массиве bookTitles проходит через compose,
    внутри которого над строкой происходит преобразование из функций, которые переданный
    внутри compose.
  */

    const slugify2 = map(compose(join('-'), split(' '), lowerCase));
    //  [ 'javascript-the-good-parts','you-don’t-know-js', 'eloquent-javascript' ]
    const slugs2 = slugify2(bookTitles);

    // ! Пример без каррирования и композиции
    // console.log(
    bookTitles.map(str => [join('-'), split(' '), lowerCase].reduceRight((acc, fn) => fn(acc), str));
    // );
  })();

  // !5
  (function() {
    console.log('%c 5) СОЗДАТЬ ТИКАЮЩИЕ ЧАСЫ: ИМПЕРАТИВНОЕ РЕШЕНИЕ', consoleLogStyles);

    // ! Императивное решение:

    // Вывод показаний часов каждую секунду
    console.log('Императивное решение');

    const iterval = setInterval(logClockTime, 1000);

    setTimeout(
      () =>
        new Promise((res, rej) => {
          res(clearInterval(iterval));
        }).then(() => console.log('-------------------')),
      10000
    );

    function logClockTime() {
      // Получение строки показания часов в гражданском формате
      const time = getClockTime();
      // Очистка показаний консоли и вывод показания часов
      console.clear();
      console.log(time);
    }

    function getClockTime() {
      // Получение текущего времени
      const date = new Date();
      // const time = '';

      // Выстраивание последовательности показания часов
      const time = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        ampm: 'AM',
      };

      // Преобразование показания времени в гражданский формат
      if (time.hours === 12) {
        time.ampm = 'PM';
      } else if (time.hours > 12) {
        time.ampm = 'PM';
        time.hours -= 12;
      }

      // Подстановка 0 к показанию часов, чтобы получалась пара цифр
      if (time.hours < 10) {
        time.hours = '0' + time.hours;
      }

      // Подстановка 0 к показанию минут, чтобы получалась пара цифр
      if (time.minutes < 10) {
        time.minutes = '0' + time.minutes;
      }

      // Подстановка 0 к показанию секунд, чтобы получалась пара цифр
      if (time.seconds < 10) {
        time.seconds = '0' + time.seconds;
      }

      // Придание показаниям часов формата строки "hh:mm:ss tt"
      return time.hours + ':' + time.minutes + ':' + time.seconds + ' ' + time.ampm;
    }
  })();

  // !6
  (function() {
    console.log('%c 6) СОЗДАТЬ ТИКАЮЩИЕ ЧАСЫ: ДЕКЛАРАТИВНОЕ РЕШЕНИЕ', consoleLogStyles);
    // ! Декларативное решение:

    // секунда
    const oneSecond = () => 1000;
    // текушая дату
    const getCurrentTime = () => new Date();
    // очистка консоли
    const clear = () => console.clear();
    // сообщение на консоль
    const log = message => console.log(message);

    /*
        # Функции для преобразования данных:

        1) serializeClockTime — получает объект времени и возвращает объект
          для показания часов, содержащих часы, минуты и секунды;

        2) civilianHours — получает объект показания часов и возвращает объект,
          где показание часов преобразованы к формату гражданского времени.
          Например: 1300 превращается в 1 час;

        3) appendAMPM — получает объект показания часов и добавляет к нему время суток

        Эти три функции используются для преобразования данных без изменения исходного значения.
        В них аргументы рассматриваются как неизменяемые объекты.
      */

    // 1
    const serializeClockTime = date => ({
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    });

    // 2
    const civilianHours = clockTime => ({
      ...clockTime,
      hours: clockTime.hours > 12 ? clockTime.hours - 12 : clockTime.hours,
    });

    // 3
    const appendAMPM = clockTime => ({
      ...clockTime,
      ampm: clockTime.hours >= 12 ? 'PM' : 'AM',
    });

    /*
        # Функции высшего порядка.

        1) display — получает функцию цели target и возвращает функцию,
          которая будет отправлять время в адрес цели.В данном примере целью будет console.log.

        2) formatClock — получает шаблонную строку и использует ее для возвращения показания времени,
          отформатированного по критериям, заданным строкой.
          В данном примере шаблон имеет вид hh:mm:ss tt.
          Таким образом, formatClock будет заменять заполнители показаниями часов, минут, секунд и времени суток.

        3) prependZero — получает в качестве аргумента ключ объекта и ставит нуль впереди значения,
          хранящегося под этим ключом объекта.
          Функция получает ключ к указанному полю и ставит перед значениями нуль, если значение меньше 10.
      */

    // 1
    const display = target => time => target(time);

    // 2
    const formatClock = format => time =>
      format
        .replace('hh', time.hours)
        .replace('mm', time.minutes)
        .replace('ss', time.seconds)
        .replace('tt', time.ampm);

    // 3
    const prependZero = key => clockTime => ({
      ...clockTime,
      [key]: clockTime[key] < 10 ? '0' + clockTime[key] : clockTime[key],
    });

    /*
        # Функции-композицию

        1) convertToCivilianTime — отдельная функция, получающая в качестве аргумента показание времени и преобразующая его
          в формат гражданского времени с помощью обеих форм этого времени.

        2) oubleDigits — отдельная функция, получающая в качестве аргумента показание времени и обеспечивающая
          отображение часов, минут и секунд парой цифр, подставляя для этого ноль, где необходимо.

        3) startTicking — запускает часы, устанавливая интервал, вызывающий функцию обратного вызова каждую секунду.
          Функция обратного вызова представляет собой композицию из всех наших функций.
          Каждую секунду консоль очищается, получается текущее время, показание которого проходит преобразование,
          перевод в гражданский формат, форматирование и отображение.
      */

    // Основная функции для копозиции
    const compose = (...fns) => args => fns.reduce((composed, fn) => fn(composed), args);

    // 1
    const convertToCivilianTime = clockTime => compose(appendAMPM, civilianHours)(clockTime);

    // 2
    const doubleDigits = civilianTime =>
      compose(prependZero('hours'), prependZero('minutes'), prependZero('seconds'))(civilianTime);

    // 3
    const startTicking = () =>
      setInterval(
        compose(
          clear,
          getCurrentTime,
          serializeClockTime,
          convertToCivilianTime,
          doubleDigits,
          formatClock('hh:mm:ss tt'),
          display(log)
        ),
        oneSecond()
      );

    /* 	startTicking(); */

    const delay = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

    async function abc() {
      await delay(10000);
      console.log('Декларативное решение (Функциональное)');
      const timeId = startTicking();
      await delay(10000);
      console.log('10 секунд прошло');
      clearInterval(timeId);
    }

    abc();
  })();
})();
