'use strict';

/*
TODO ЗАДАЧИ:
  * 1) Ежемесячные затраты компании на сотрудника
  * 2) Массив с подходящими датами, в зависимости от суммы чисел (с 2018 по 2045)
  * 3) Определять день недели по числу
  * 4) Функция для подсчета корней через дискриминант
  * 5) Сколько денег на вкладах с разными условиями
  * 6) Найти самый выгодный вклад
  * 7) Узнать какой сегодня день недели выходной или будний
  * 8) Подсчитайте нечетные целые числа в массиве
  * 9) Сортировка в массива по убыванию буквы A в элементах
  * 10) Нарисовать "елку" используя только символы “_” и "*"
  * 11) Вычисление двойного факторила
  * 12) Вычисление Факторила
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

  // ! 1
  (function() {
    console.log('%c 1) ЕЖЕМЕСЯЧНЫЕ ЗАТРАТЫ КОМПАНИИ НА СОТРУДНИКА', consoleLogStyles);
    // Задача найти ежемесячные затраты компании на сотрудника из «чистой» зарплаты работника.

    // Подоходный налог
    let incomeTax = 13;

    // Размер взносов в процента
    let contributions = 30;

    // «Чистая» зарплата после вычета налогов.
    let salaryClean = 70000;

    const calculateExpenses = salary => {
      return Math.round((salary / (100 - incomeTax)) * (100 + contributions));
    };

    console.log(`Затраты компании на сотрудника: ${calculateExpenses(salaryClean)}`);

    // Второе решение 70000 / 87 * 100 ~ 70000 / 0.87
    var calculateExpenses2 = netSalary => {
      return Math.round((netSalary / ((100 - incomeTax) / 100)) * (contributions / 100 + 1));
    };
  })();

  // ! 2
  (function() {
    console.log(
      '%c 2) МАССИВ С ПОДХОДЯЩИМИ ДАТАМИ, В ЗАВИСИМОСТИ ОТ СУММЫ ЧИСЕЛ (С 2018 ПО 2045)',
      consoleLogStyles
    );
    /*
    	Задача:
    	Функция getYears, которая будет возвращать массив с подходящими датами для Олимпиады.
    	Функция должна принимать на вход три параметра.
    	Первый параметр — год, с которого нужно начать вести отсчёт (включительно).
    	Второй — год, которым этот отсчёт надо закончить (включительно).
    	Третий — число, которое обозначает сумму цифр в номере года.

    	Первый год: 2018,
    	последний год: 2045,
    	сумма цифр года: 11,
    	ожидаемые года: 2018, 2027, 2036, 2045
    */

    // Начало отсчета
    let firstYearsTest = 2018;

    // Конец отсчета
    let lastYearsTest = 2045;

    // Сумма цифр в номере года
    let sumNumberYearTest = 11;

    // Первый Велосипед
    const getYears = (firstYears, lastYears, sumNumberYear) => {
      let result = [];
      for (let year = firstYears; year <= lastYears; year++) {
        if (
          year
            .toString()
            .split('')
            .reduce((sum, num) => {
              return sum + Number(num);
            }, 0) === sumNumberYear
        ) {
          result.push(year);
        }
      }
      return result;
    };
    console.log(`Массив с датами ${getYears(firstYearsTest, lastYearsTest, sumNumberYearTest)}`);

    // Решение без методов.
    const getYears2 = (starYear, endYear, summ) => {
      let currentYearSumm;
      let goodYears = [];
      for (let i = starYear; i <= endYear; i++) {
        currentYearSumm =
          Number(String(i)[0]) + Number(String(i)[1]) + Number(String(i)[2]) + Number(String(i)[3]);
        if (currentYearSumm === summ) {
          goodYears.push(i);
        }
      }
      return goodYears;
    };

    // console.log(`Массив с датами ${getYears2(firstYearsTest, lastYearsTest, sumNumberYearTest)}`);
  })();

  // ! 3
  (function() {
    console.log('%c 3) ОПРЕДЕЛЯТЬ ДЕНЬ НЕДЕЛИ ПО ЧИСЛУ', consoleLogStyles);
    /* Задача
    	Функция должна будет определять день недели по числу.
    	Она должна возвращать строку с названием для недели.
    */

    // Массив дней недели
    const week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];

    // День недели, на который выпадает первое число месяца,
    const firstDayMonth = 'понедельник';

    // Число, для которого нужно найти день недели в этом месяце.
    const numberDay = 21;

    // Решение одной строкой
    const getDayOfWeek = (firstDay, searchDay) => week[(week.indexOf(firstDay) + searchDay - 1) % 7];

    console.log(`Число ${numberDay} - день недели: ${getDayOfWeek(firstDayMonth, numberDay)}`);

    // Решение длинное
    const getDayOfWeek2 = (firstDay, searchDay) => {
      const index = week.indexOf(firstDay);
      const ThatDay = week[(index + searchDay - 1) % 7];
      return ThatDay;
    };
  })();

  // ! 4
  (function() {
    console.log('%c 4) ФУНКЦИЯ ДЛЯ ПОДСЧЕТА КОРНЕЙ ЧЕРЕЗ ДИСКРИМИНАНТ', consoleLogStyles);
    /*
      Задание
      Функция для подсчета корней через дискриминант.
      Функция должна принимать на вход три параметра: a, b, c.
      Это коэффициенты из формулы дискриминанта.
      Формула дискриминанта (b * b — 4 * a * c) ~ (D = b2 - 4ac)

      Если дискриминант число меньше 0, функция должна возвращать строку 'Корней нет'.

      Если дискриминант равен 0, корень в уравнении один
      Формула корня в этом случае такая: -b / (2 * a).

      Если дискриминант больше 0, корня два
      Формула для первого корня: (-b + √discriminant) / (2 * a). Формула для второго корня: (-b — √discriminant) / (2 * a)
      http://www.egesdam.ru/page221.html
    */

    // Функция подсчета дискриминанта
    const calculateRoots = (a, b, c) => {
      const discriminant = Math.pow(b, 2) - 4 * a * c;
      if (discriminant < 0) {
        return 'Корней нет';
      } else if (discriminant === 0) {
        return `Корень равен ${-b / (2 * a)}`;
      } else {
        return `Первый корень равен ${(-b + Math.sqrt(discriminant)) /
          (2 * a)}, второй корень равен ${(-b - Math.sqrt(discriminant)) / (2 * a)}`;
      }
    };

    // x2 + -2x + -3 = 0
    console.log(`Решение: ${calculateRoots(1, -2, -3)}`);
  })();

  // ! 5
  (function() {
    console.log('%c 5) СКОЛЬКО ДЕНЕГ НА ВКЛАДАХ С РАЗНЫМИ УСЛОВИЯМИ', consoleLogStyles);
    /*
      Задача
      Функция сколько денег на вкладах с разными условиями

      Начальная сумма: 100000 рублей,
      годовой процент: 10%,
      вклад на 2 мес.,
      с капитализацией,
      ожидаемый результат: 101673 рублей.

      Если вклад простой:
      Общий процент (0.08 / 12) * 3 * 1000 = 20 рублей
      Итоговая сумма депозита 1000 + 20 = 1020 рублей

      Вклад с капитализацией:
      Сумма после первого месяца
      1000 + (0.08 / 12) * 1000 = 1007 рублей
      Сумма после второго месяца
      1007 + (0.08 / 12) * 1007 = 1014 рублей
      Сумма после третьего месяца (итоговая сумма)
      1014 + (0.08 / 12) * 1014 = 1021 рубль

      https://investoriq.ru/banki/raschet-vklada-s-kapitalizaciej.html
    */

    // Начальная сумма депозита;
    let depositAmountTest = 100000;

    // Процент годовых
    let percentTest = 10;

    // Срок вклада в месяцах
    let depositInMonthsTest = 2;

    // С капитализацией процентов или нет
    let isCapitalizationTest = true;

    // Решение при помощи формулы "Формула для вкладов с ежемесячной капитализацией"
    const calculateDeposit = (depositAmount, percent, depositInMonths, isCapitalization) => {
      const percentForMonth = percent / 100 / 12;
      const formulaSimpleDeposit = Math.floor(
        depositAmount + percentForMonth * depositInMonths * depositAmount
      );
      const formulaCapitalizationDeposit = Math.floor(
        depositAmount * Math.pow(1 + percentForMonth, depositInMonths)
      );

      if (isCapitalization) {
        return formulaCapitalizationDeposit;
      } else {
        return formulaSimpleDeposit;
      }
    };

    // Решение через цикл
    const calculateDeposit2 = (depositAmount, percent, depositInMonths, isCapitalization) => {
      const percentForMonth = percent / 100 / 12;
      let result = depositAmount;

      if (isCapitalization) {
        for (let i = 1; i <= depositInMonths; i++) {
          result += percentForMonth * result;
        }
      } else {
        result = result + percentForMonth * depositInMonths * depositAmount;
      }
      return Math.floor(result);
    };

    console.log(
      `Решение через формулу ${calculateDeposit(
        depositAmountTest,
        percentTest,
        depositInMonthsTest,
        isCapitalizationTest
      )}`
    );
  })();

  // ! 6
  (function() {
    console.log('%c 6) НАЙТИ САМЫЙ ВЫГОДНЫЙ ВКЛАД', consoleLogStyles);
    /*
    	Задача
    	Найти выгодный клад

    	Исходная сумма: 250000,
    	количество месяцев: 14,
    	процент без капитализации: 7,
    	процент с капитализацией: 6.8.
    	Ожидаемый ответ: Выбирай капитализацию. Заработаешь 270580.
    */

    // Исходный размер депозита;
    let depositAmountTest = 250000;

    // срок депозита в месяцах;
    let depositInMonthsTest = 14;

    // Процентная ставка для депозита с простыми процентами;
    let percentDepositSimpleTest = 7;

    // процентная ставка для депозита с капитализацией процент
    let percentDepositCapitalTest = 6.8;

    // Функция для вычисления сумму по вкладам на разных условиях
    const calculateDeposit = (depositAmount, percent, depositInMonths, isCapitalization) => {
      const percentForMonth = percent / 100 / 12;
      if (isCapitalization) {
        return Math.floor(depositAmount * Math.pow(1 + percentForMonth, depositInMonths));
      } else {
        return Math.floor(depositAmount + percentForMonth * depositInMonths * depositAmount);
      }
    };

    // Функция для сравнения какой вклад выгодней
    const getProfitableDeposit = (
      depositAmount,
      depositInMonths,
      percentDepositSimple,
      percentDepositCapital
    ) => {
      const depositSimple = calculateDeposit(
        depositAmount,
        percentDepositSimple,
        depositInMonthsTest,
        false
      );
      const depositCapital = calculateDeposit(
        depositInMonths,
        percentDepositCapital,
        depositInMonthsTest,
        true
      );

      if (depositSimple > depositCapital) {
        return `Выбирай обычный вклад. Заработаешь ${depositSimple}`;
      } else {
        return `Выбирай капитализацию. Заработаешь ${depositCapital}`;
      }
    };

    console.log(
      getProfitableDeposit(
        depositAmountTest,
        depositInMonthsTest,
        percentDepositSimpleTest,
        percentDepositCapitalTest
      )
    );
  })();

  // ! 7
  (function() {
    console.log('%c 7) УЗНАТЬ КАКОЙ СЕГОДНЯ ДЕНЬ НЕДЕЛИ ВЫХОДНОЙ ИЛИ БУДНИЙ', consoleLogStyles);
    // Задача узнать какой день недели

    // Решение через if
    const weekendOrWeekday = inputDate => {
      const day = inputDate.getDay();
      if (day === 0 || day === 6) {
        return 'weekend';
      }
      return 'weekday';

      // Или через тернарный оператор
      // return (day === 0 || day === 6) ? 'weekend' : 'weekday';
    };
    // console.log(weekendOrWeekday(new Date()));

    // Решение без if через объект
    const weekendOrWeekday2 = inputDate => {
      const day = inputDate.getDay();
      return weekendOrWeekday2.labels[day] || weekendOrWeekday2.labels['default'];
      // Если число дня недели не совпадает с ключом, undefined, то тогда default
    };

    weekendOrWeekday2.labels = {
      0: 'weekend',
      6: 'weekend',
      default: 'weekday',
    };

    console.log(`Сегодня: ${weekendOrWeekday2(new Date())}`);
  })();

  // ! 8
  (function() {
    console.log('%c 8) ПОДСЧИТАЙТЕ НЕЧЕТНЫЕ ЦЕЛЫЕ ЧИСЛА В МАССИВЕ', consoleLogStyles);
    // Задача Подсчитайте нечетные целые числа в array

    const arrayOfIntegers = [1, 4, 5, 9, 0, -1, 5, 0];

    let counter = 0;
    // Через if
    arrayOfIntegers.forEach(item => {
      if (item % 2 !== 0) {
        counter++;
      }
    });
    // console.log(counter);

    let counter2 = 0;

    // Через Math.abs и без if
    arrayOfIntegers.forEach(integer => {
      const remainder = Math.abs(integer % 2);
      counter2 += remainder;
    });

    console.log(counter2);
  })();

  // ! 9
  (function() {
    console.log('%c 9) СОРТИРОВКА В МАССИВА ПО УБЫВАНИЮ БУКВЫ A В ЭЛЕМЕНТАХ', consoleLogStyles);

    /* Задача
  		Сортировка в массиве по убыванию буквы A в элементах массива (имена)
		*/

    // Массив Имен
    const names = ['Alla', 'Dimaa', 'Rosaaa', 'AAlexa'];

    // Функция для посчета количества буквы в слове/предожении
    function getTextCounter(string, letter) {
      return string.split(letter).length - 1;
    }
    // console.log(getTextCounter('this is foo bar', 'o'));

    // Решение через регулярное выражение
    const letterA = 'AlabaMa';
    const resultLeterA = letterA.match(/a/gi);

    // Решение через регулярное выражение
    function getTextCounter2(string, letter = ' ') {
      let regExp = new RegExp(letter, 'gi');
      return (string.match(regExp) || []).length;
    }

    console.log(getTextCounter2(names[3], 'a'));

    // Функция сортировки
    names.sort((nameFirst, nameSecond) => {
      if (getTextCounter(nameFirst.toLowerCase(), 'a') < getTextCounter(nameSecond.toLowerCase(), 'a')) {
        return 1;
      } else if (
        getTextCounter(nameFirst.toLowerCase(), 'a') > getTextCounter(nameSecond.toLowerCase(), 'a')
      ) {
        return -1;
      } else {
        return 0;
      }
    });
    console.log(`Отфильтрованный массив ${names}`);
  })();

  // ! 10
  (function() {
    console.log('%c 10) НАРИСОВАТЬ "ЕЛКУ" ИСПОЛЬЗУЯ ТОЛЬКО СИМВОЛЫ “_” И "*"', consoleLogStyles);

    // Функция для нахождения случайного числа
    // function getRandomInteger(min, max) {
    //   let rand = min - 0.5 + Math.random() * (max - min + 1);
    //   return Math.round(rand);
    // }

    /* Задача
      Нарисовать "елку" используя только символы “_” и "*".
      Вывести результат в консоль браузера.
      Ширина "елки" вычисляется по количеству символов в последней линии.
      В каждом втором уровне 'елки' должна быть игрушка в виде символа 'о',
      которая расположена в случайной позиции уровня.

      Входные данные:
      n - высота (количество строк).
      2 < n < 20.
    */

    const getChristmasTree = n => {
      /*  Проверка и защита, чтобы число не было меньше 2 и больше 20,
        приэтом если число отрицательное или его не передали через аргумент  */
      n = Math.max(2, Math.min(20, +n || 2));
      let rslt = []; // массив строк

      for (let i = 0; i < n; i++) {
        /* Создаем пустой массив длинной, через fill заполняем его символами
          Array(3).join(":") ~ "::" поэтому + 1
        */
        let st = new Array(i * 2 + 1).fill('*');
        // let st = '*'.repeat(i * 2 + 1);

        // repeat возвращает новую копию строки указанным количеством повторений этой строки
        let bg = '_'.repeat(n - i - 1);

        /* Проверяет на нечестность.
          Так как у нас по условию на каждом втором уровне должна быть игрушка
          Но при этом так как i при первой итерации равна 0, то вторая строка равна = 1 (нечетное)
        */

        if (i % 2 !== 0) {
          // random индекс игрушки в массиве
          st[Math.floor(Math.random() * st.length)] = 'o';
        }

        // Новая строка дерева елки (st массив в строчку + полосы)
        // rslt.push(bg + st + bg);
        rslt.push(bg + st.join('') + bg);
      }

      // Возврат строки с разделителем (Проблема)
      return rslt.join('\n');
    };

    console.log(getChristmasTree(4));

    // Решение через регулярные выражения
    const getChristmasTree2 = number => {
      number = Math.max(2, Math.min(20, +number || 2));
      let resultLine = '';

      for (let i = 0; i < number; i++) {
        let star = '*'.repeat(i * 2 + 1);

        let line = '_'.repeat(number - i - 1);

        if (i % 2 !== 0) {
          const starRegex = /\*/y;
          starRegex.lastIndex = Math.floor(Math.random() * star.length) || 1;
          star = star.replace(starRegex, 'o');
        }

        resultLine += `${line}${star}${line}\n`;
      }

      // trim() позволяет удалить пробелы с обоих концов строки
      // Убираю последний пробел \n в строчке
      return resultLine.slice(0, -1);
    };

    console.log(getChristmasTree2(4));

    // Решение 3 МИША
    const Limit = {
      min: 2,
      max: 20,
    };

    const toySymbol = 'o';

    const getRandomInteger = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

    const getString = (symbol, n) => symbol.repeat(n);

    const addToy = string => {
      const position = getRandomInteger(1, string.length);
      return `${string.slice(0, position - 1)}${toySymbol}${string.slice(position)}`;
    };

    const buildTree = height => {
      if (height <= Limit.min || height >= Limit.max)
        return `Высота ёлки должна быть больше ${Limit.min} и меньше ${Limit.max}`;

      const arr = new Array(height);

      for (let i = 1; i <= height; i++) {
        const underscores = getString('_', height - i);
        const stars = getString('*', 2 * i - 1);
        const starsWithToy = i % 2 === 0 ? addToy(stars) : stars;

        arr[i - 1] = `${underscores}${starsWithToy}${underscores}`;
      }
      return arr.join('\n');
    };

    const tree = buildTree(4);

    console.log(tree);
  })();

  // ! 11
  (function() {
    console.log('%c 11)ВЫЧИСЛЕНИЕ ДВОЙНОГО ФАКТОРИЛА', consoleLogStyles);
    /*
      * Вычисление двойного факторила
      !!8 = 8 * 6 * 4 * 2 = 384
      !!7 = 7 * 5 * 3 * 1 = 105
    */

    // # Решение 1 - Через цикл
    const factorial = num => {
      if (!num) return `пустая строка`;

      let counter = 1;

      for (let i = 1; i <= num; i++) {
        if (i % 2 === 0 && num % 2 === 0) {
          counter *= i;
          /*
          1 * 2 = 2
          2 * 4 = 8
          8 * 6 = 48
          48 * 8 = 384
        */
        } else if (i % 2 !== 0 && num % 2 !== 0) {
          counter *= i;
        }
      }
      return counter;
    };

    console.log(factorial(8));

    // # Решение 2 - Через цикл Reduce
    const factorial2 = num =>
      Array(num)
        .fill()
        .reduce((acc, _, i) => {
          const counter = i + 1;
          if (num % 2 === 0 && counter % 2 === 0) acc *= counter;
          if (num % 2 !== 0 && counter % 2 !== 0) acc *= counter;
          return acc;
        }, 1);

    console.log(factorial2(8));

    // # Решение 3 - через While
    const factorial3 = num => {
      let flag = num % 2 === 0 ? 2 : 1;
      let result = num;

      while (num > flag) {
        result *= num - 2;
        /*
          8 * 6 = 48
          48 * 4 = 192
          192 * 2 = 384
        */
        num -= 2;
      }
      return result;
    };

    console.log(factorial3(8));
  })();

  // ! 12
  (function() {
    console.log('%c 12)ВЫЧИСЛЕНИЕ ФАКТОРИЛА', consoleLogStyles);

    // # Способ №2 While
    function factorial(n) {
      let total = 1;
      while (n > 0) {
        total *= n;
        n--;
      }
      return total;
    }
    // console.log(factorial(7)); // 5040

    // # Способ №2 Reduce
    const factorial2 = n => [...Array(n)].reduce((total, item, i) => (total *= i + 1), 1);

    console.log(factorial2(7));

    // Факториал - произведение всех натуральных чисел от 1 до n включительно
    // factorial(4) - 1 * 2 * 3 * 4 = 24

    // # Способ №3 Рекурсия
    function factorial(n) {
      if (n === 1) return 1;

      return n * factorial(n - 1);
    }

    console.log(factorial(4));
  })();
})();
