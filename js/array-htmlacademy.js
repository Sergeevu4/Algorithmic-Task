'use strict';

/*
TODO ЗАДАЧИ:
  * 1) Найти последний индекс элемента в массиве
  * 2) На основе одного массива создать другой (багаж)
  * 3) На основе одного массива создать другой № 2(книги)
  * 4) «Шифр цезаря»
  * 5) Найди все элементы массива, которых содержится определённая строка
  * 6) Числа фибоначчи
  * 7) Спортивные показатели
  * 8) Новый массив уникальных значений(без повторяющихся элементов)
  * 9) Массив в обратном порядке
  * 10) Сколько раз встречается в массиве элемент
  * 11) Сортировка массива выбором (min - max)
  * 12) Найти пересечения в массиве (отфильтрованный список людей по skills)
  * 13) Найти количество элементов массива, которые в сумме не превышают limit
  * 14) Найти совпадающие значения в двух массивах
  * 15) Функция удаляющая элементы из массива
*/

(function () {
  // ? Стили для console.log
  let consoleLogStyles = [
    'color: green',
    'background-color: yellow',
    'font-size: 12px',
    'border: 1px solid red',
    'padding: 5px',
  ].join(';');

  // console.log('%cHello There', consoleLogStyles);

  // ! 1
  (function () {
    // # Найти последний индекс элемента в массиве, числа в переменной number
    // Если числа вообще нет в массиве будет возврат -1

    console.log('%c 1) НАЙТИ ПОСЛЕДНИЙ ИНДЕКС ЭЛЕМЕНТА', consoleLogStyles);

    const numbers = [2, 2, 7, 2, 7, 1];
    const number = 2;
    let lastIndex = 0;

    // const numbersLastIndexOf = numbers.lastIndexOf(number);
    // console.log('РЕШАЕТСЯ ОДНОЙ СТРОКОЙ lastIndexOf :', numbersLastIndexOf);

    // Решение через цикл и если lastIndex = -1
    for (let i = 0; i <= numbers.length; i++) {
      if (numbers[i] === number) {
        lastIndex = i;
      }
    }

    console.log('Цикл: Индекс последнего искомого числа: ', lastIndex);

    // -------------------------------------------------------------------------------

    // # Решение через ForEach и если lastIndex = -1
    const numbersForEach = numbers.forEach((item, index) => {
      if (item === number) {
        lastIndex = index;
      }
    });

    console.log('ForEach: Индекс последнего искомого числа: ', lastIndex);
    // -------------------------------------------------------------------------------

    // # Решение через ForEach и если lastIndex = 0
    const numbersForEach2 = numbers.forEach((item, index, array) => {
      if (array.includes(number)) {
        if (item === number) {
          lastIndex = index;
        }
      } else {
        lastIndex = -1;
      }
    });

    // -------------------------------------------------------------------------------

    // # Includes Проверка есть ли элемент в массиве
    const numbersIncludes = numbers.includes(number);
    console.log('Includes Проверка есть ли элемент в массиве :', numbersIncludes);

    // # Some Проверка есть ли элемент в массиве
    const numbersSome = numbers.some(item => item === number);
    console.log('Some Проверка есть ли элемент в массиве :', numbersSome);
  })();

  // ! 2
  (function () {
    // # Напиши программу, которая на основе одного массива c багажом создаст другой.

    console.log('%c 2) НА ОСНОВЕ ОДНОГО МАССИВА СОЗДАТЬ ДРУГОЙ (БАГАЖ)', consoleLogStyles);

    // Массив на основании котого будет строиться другой массив взависимости от индекса и числа элементов
    const luggage = ['пакет', 'мяч', 'тапки', 'когтеточка', 'коробка', 'миска', 'мята'];

    // начиная с элемента с индексом
    let startIndex = 5;
    // Количество элементов, которые нужно взять с собой записано в переменную quantity.
    let quantity = 2;
    //  новый массив
    let chosenLuggage = [];

    // # Решение через цикл
    for (let i = 0; i < quantity; i++) {
      chosenLuggage.push(luggage[i + startIndex]);
    }

    console.log('Цикл: Новый массив элементов багажа :', chosenLuggage);

    // -------------------------------------------------------------------------------

    // # Решение через Filter
    let chosenLuggage2 = luggage.filter((item, index) => {
      return index >= startIndex;
    });

    console.log('Filter: Новый массив элементов багажа :', chosenLuggage2);
  })();

  // ! 3
  (function () {
    // # Напиши программу, которая на основе одного массива с книгами создаст другой.

    console.log('%c 3) НА ОСНОВЕ ОДНОГО МАССИВА СОЗДАТЬ ДРУГОЙ № 2(КНИГИ)', consoleLogStyles);

    // Основной массив
    const books = [
      'Улисс',
      'Маугли',
      'Сияние',
      'Ревизор',
      'Гамлет',
      'Обломов',
      'Дюймовочка',
      'Шантарам',
      'Вий',
      'Сильмариллион',
      'Оно',
    ];

    // minNumber записано минимальное количество букв
    let minNumber = 3;
    // maxNumber записано максимальное число букв (включительно)
    let maxNumber = 5;

    // # Результат запиши в переменную filteredBooks.
    let filteredBooks = books.filter(item => {
      return item.length >= minNumber && item.length <= maxNumber;
    });

    console.log('Filter: Книги подходящие под параметры: ', filteredBooks);
  })();

  // ! 4
  (function () {
    console.log('%c 4) «ШИФР ЦЕЗАРЯ»', consoleLogStyles);

    // Алфавит
    // prettier-ignore
    const symbols = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я', ' ', '.', ',', '—', '!'];

    // Смещение
    let shift = 10;

    // Закодированное сообщение
    // prettier-ignore
    let encodedMessage = [62, 28, 31, 56, 42, 40, 43, 27, 23, 56, 37, 28, 56, 25, 51, 39, 40, 38, 41, 32, 48, 52, 56, 40, 51, 24, 34, 43, 56, 43, 56, 45, 38, 31, 55, 32, 37, 23, 57];

    // # Map: Раскодированное сообщение:
    let decodedMessage = encodedMessage
      .map(item => {
        return item + 10 > symbols.length
          ? symbols[item + shift - symbols.length]
          : symbols[item + shift];
      })
      .join('');

    console.log('Map: Раскодированное сообщение: ', decodedMessage);

    // -------------------------------------------------------------------------------

    // Раскодированное сообщение через Цикл
    let decodedMessage2 = '';

    // # Цикл: Раскодированное сообщение:
    for (let i = 0; i <= encodedMessage.length - 1; i++) {
      if (encodedMessage[i] + shift > symbols.length) {
        decodedMessage2 += symbols[encodedMessage[i] + shift - symbols.length];
      } else {
        decodedMessage2 += symbols[encodedMessage[i] + shift];
      }
    }

    console.log('Цикл: Раскодированное сообщение: ', decodedMessage2);
  })();

  // ! 5
  (function () {
    // # Найди все элементы массива с данными, в которых содержится определённая строка.
    // Эта искомая строка записана в переменную query.

    console.log(
      '%c 5) НАЙДИ ВСЕ ЭЛЕМЕНТЫ МАССИВА, КОТОРЫХ СОДЕРЖИТСЯ ОПРЕДЕЛЁННАЯ СТРОКА',
      consoleLogStyles
    );

    const usersData = [
      'Виталий Иванович',
      'Иннокентий Петрович',
      'Александр Александрович',
      'Игорь Олегович',
      'Евгений Петрович',
      'Игнат Денисович',
      'Сергей Александрович',
      'Семён Петрович',
    ];

    // Эта искомая строка
    let query = 'Александрович';

    // Количество подходящих элементов (пользователей), которые подходят под критерий
    let matchingUsers = 0;

    // -------------------------------------------------------------------------------

    // # Решение через цикл For OF
    for (let item of usersData) {
      if (item.indexOf(query) !== -1) {
        matchingUsers++;
      }
    }

    console.log('FOR...OF: Пользователи которые подходят под критерии: ', matchingUsers);

    // Количество подходящих элементов (пользователей), которые подходят под критерий
    let matchingUsers2 = 0;

    // -------------------------------------------------------------------------------

    // # Решение через цикл forEach + includes у строк
    const matchingUsersSearch = usersData.forEach(item => {
      if (item.includes(query)) {
        matchingUsers2++;
      }
    });

    console.log('ForEach + includes: Пользователи которые подходят под критерии: ', matchingUsers2);
  })();

  // ! 6
  (function () {
    // # Задача напиши программу, которая считает числа Фибоначчи и последовательно записывает эти числа в массив

    console.log('%c 6) ЧИСЛА ФИБОНАЧЧИ', consoleLogStyles);

    // * Массив записан в переменную fibonacciNumbers. Первые два числа уже находятся в этом массиве.
    let fibonacciNumbers = [1, 1];

    // В переменной numbersQuantity указано сколько чисел нужно добавить в массив
    let numbersQuantity = 7;

    for (let i = 1; i <= numbersQuantity; i++) {
      fibonacciNumbers.push(
        fibonacciNumbers[fibonacciNumbers.length - 1] + fibonacciNumbers[fibonacciNumbers.length - 2]
      );
    }

    // Динамическое нахождения числа Фибоначчи через цикл
    function fibonacciDynamic(n) {
      let arr = [0, 1];

      for (let i = 2; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
      }
      // arr [ 0, 1, 1, 2, 3, 5, 8, 13 ]
      return arr[n];
    }

    // console.log(fibonacciDynamic(7)); // 13

    console.log('Цикл: Последовательность чисел Фибоначчи: ', fibonacciNumbers);

    // # Пример функции вычисления n-го числа Фибоначи с применением Деструктуризаци:
    // , x - возвращает последний элемент после запятой
    /*
      x1 y2
      x2 y3
      x3 y5
      x5 y8
      x8 y13
    */
    const fib = (n, x = 0, y = 1) => ([...Array(n)].forEach(i => ([x, y] = [y, x + y])), x);

    // # Пример применением деструкторизации # 2:
    const fib2 = (n, x = 0, y = 1) =>
      [...Array(n)].map(i => {
        [x, y] = [y, x + y];
        return x;
      });

    // console.log(fib2(7)); //  [ 1, 1, 2, 3, 5, 8, 13 ]

    // # Пример решения через reduce
    /*
     * Через тернарный оператор проверяю, если индекс меньше 2,
     * то я добавляю в массив сперва индекс: 0, потом индекс: 1
     * Если больше, то я беру последний элемент в массиве[1] + предпоследний элемент[0]
     */

    const fib3 = n =>
      [...Array(n + 1)].reduce((acc, item, i) => {
        return acc.concat(i < 2 ? i : acc[i - 1] + acc[i - 2]);
      }, []);

    // console.log(fib3(7)) //  [ 0, 1, 1, 2, 3, 5, 8, 13 ]

    // # Решения через рекурсию
    const fibonacci = n => {
      if (n === 0) return 0;

      if (n === 1) return 1;
      return fibonacci(n - 1) + fibonacci(n - 2);
    };

    fibonacci(5); // 5
    // Последовательность начинается с 0, 1 потом последующие числа складываются.

    // # Пример с усовершенствованной рекурсией числа запонимаются в массиве
    /*
        Числа Фибоначчи очень часто используют как объяснение такого подхода как мемоизация.
        Мемоизация - это подход, который позволяет нам сохранять результаты промежуточных решений, для того чтобы в следующих расчетах не повторять тоже самое.

        Принцип невероятно прост, в данном случае мы выделяем массив - все значения которого == 0, и записываем все получившиеся вычисления, таким образом имеем следующий код:
    */

    let results = [0, 1];

    function fibonacci2(n) {
      if (n === 0) return results[0];

      if (n === 1) return results[1];

      if (!results[n]) {
        results[n] = fibonacci2(n - 2) + fibonacci2(n - 1);
      }
      return results[n];
    }

    fibonacci2(5); // 5
    // console.log(results); //  [ 0, 1, 1, 2, 3, 5 ]

    // # Решение Формулой Бине
    const fibonacci3 = n => {
      const sq5 = Math.sqrt(5); // сохраняем значение корня из 5, чтобы сэкономить ресурсы

      const left = (1 + sq5) / 2;
      const right = (1 - sq5) / 2;

      return (Math.pow(left, n) - Math.pow(right, n)) / sq5;
    };

    // fibonacci3(6); // 8

    // # Решение Формулой Бине №2
    /*
     * Существует формула Бине, согласно которой Fn равно ближайшему целому для ϕn/√5,
     * где ϕ=(1+√5)/2 – золотое сечение.
     */

    function fibonacci4(n) {
      const phi = (1 + Math.sqrt(5)) / 2;
      // используем Math.round для округления до ближайшего целого
      return Math.round(Math.pow(phi, n) / Math.sqrt(5));
    }
    // fibonacci4(6)// 8
  })();

  // ! 7
  (function () {
    // # Напиши программу, которая будет следить за моими спортивными показателями.

    console.log('%c 7) СПОРТИВНЫЕ ПОКАЗАТЕЛИ', consoleLogStyles);

    // переменную indicators записан массив с моими спортивными характеристиками
    const indicators = ['выносливость', 'ловкость', 'гибкость', 'сила', 'скорость'];

    // В массив levels  записаны уровни каждого показателя.
    // Каждый элемент этого массива соответствует по индексу элементу массива indicators.
    let levels = [7, 12, 5, 15, 11];

    // В зависимости от времени тренировки, прокачиваются разные показатели.
    // Время тренировки указано в минутах и записано в переменную trainingTime.
    let trainingTime = 30;

    // # Решение через Map
    const levelsMap = indicators.map((item, index) => {
      if (trainingTime <= 30 && (item === 'скорость' || item === 'ловкость')) {
        levels[index] += 3;
      } else if (trainingTime > 30 && trainingTime <= 60 && item === 'гибкость') {
        levels[index] += 3;
      } else if (trainingTime > 60 && (item === 'сила' || item === 'выносливость')) {
        console.log(item, index);
        levels[index] += 2;
      }
    });

    console.log('Map: Спортивные показатели = ', levels + ' Время тренировки ' + trainingTime);

    // -------------------------------------------------------------------------------

    let levels2 = [7, 12, 5, 15, 11];
    let trainingTime2 = 60;

    // # Решение через Цикл
    for (let i = 0; i < indicators.length; i++) {
      if (trainingTime2 <= 30 && (indicators[i] === 'скорость' || indicators[i] === 'ловкость')) {
        levels2[i] += 3;
      } else if (trainingTime2 > 30 && trainingTime2 <= 60 && indicators[i] === 'гибкость') {
        levels2[i] += 3;
      } else if (trainingTime2 > 60 && (indicators[i] === 'сила' || indicators[i] === 'выносливость')) {
        levels2[i] += 2;
      }
    }

    console.log('Цикл: Спортивные показатели = ', levels2 + ' Время тренировки ' + trainingTime2);

    // -------------------------------------------------------------------------------
  })();

  // ! 8
  (function () {
    // # Напишите программу, которая создаёт новый массив уникальных значений (тех, что не повторяются), взятых из исходного массива.

    console.log('%c 8) НОВЫЙ МАССИВ УНИКАЛЬНЫХ ЗНАЧЕНИЙ(БЕЗ ПОВТОРЯЮЩИХСЯ ЭЛЕМЕНТОВ)', consoleLogStyles);

    // Исходный массив записан в переменную
    let numbers = [101, 15, 116, 20, 116, 15, 2];

    // Переберите массив и последовательно добавьте уникальные значения в массив uniqueNumbers
    let uniqueNumbersForEach = [];

    // # Самый крассивы способ
    numbers.forEach(num => {
      numbers.indexOf(num) === numbers.lastIndexOf(num) ? uniqueNumbersForEach.push(num) : null;
    });

    console.log('ForEach: Значения которые не дублируются', uniqueNumbersForEach);

    // -------------------------------------------------------------------------------

    // # Костыль получше через цикл
    let uniqueNumbersLoop = [];

    for (let i = 0; i < numbers.length; i++) {
      if (numbers.indexOf(numbers[i]) === numbers.lastIndexOf(numbers[i])) {
        uniqueNumbersLoop.push(numbers[i]);
      }
      // console.log(numbers.lastIndexOf(numbers[i]), numbers.indexOf(numbers[i]))
    }
    // console.log(uniqueNumbersLoop)

    // -------------------------------------------------------------------------------

    // # Мой костыль через цикл с добавлением, а потом повторным удалением значений
    let uniqueNumbersLoopMy = [];

    for (let i = 0; i < numbers.length; i++) {
      if (uniqueNumbersLoopMy.indexOf(numbers[i]) === -1) {
        uniqueNumbersLoopMy.push(numbers[i]);
      } else {
        uniqueNumbersLoopMy.splice(uniqueNumbersLoopMy.indexOf(numbers[i]), 1);
      }
    }
    // console.log(uniqueNumbersLoopMy)

    // -------------------------------------------------------------------------------

    // # Рабочий но самый долгий процесс
    let uniqueNumbersForEachFilter = [];

    numbers.forEach(num => {
      if (numbers.filter(num2 => num2 === num).length === 1) {
        uniqueNumbersForEachFilter.push(num);
      }
    });

    // console.log(uniqueNumbersForEachFilter)

    // -------------------------------------------------------------------------------

    // # Массив дублирующих значений
    let uniqueNumbersDuplicates = [];

    // # ForEach: Значения которые дублируются
    numbers.forEach((value, index, self) => {
      self.indexOf(value) !== index ? uniqueNumbersDuplicates.push(value) : null;
    });

    console.log('ForEach: Значения которые дублируются', uniqueNumbersDuplicates);

    // # Filter: Значения которые дублируются
    let duplicates = numbers.filter((value, index, self) => {
      return self.indexOf(value) !== index;
    });
    // console.log('Filter: Значения которые дублируются',duplicates)

    // -------------------------------------------------------------------------------

    // ! Удаление дубликатов из массива
    const duplicate = [1, 3, 4, 5, 6, 4];

    const uniqueArr = arr => {
      const mapping = arr.reduce((acc, item, index) => {
        acc[item] = true;
        return acc;
      }, {});
      const result = Object.keys(mapping).map(item => Number(item));

      return result;
    };

    console.log('Удаление дубликатов из массива', uniqueArr(duplicate));
  })();

  // __________________________ МАССИВ В ОБРАТНОМ ПОРЯДКЕ____________________________

  // ! 9
  (function () {
    console.log('%c 8) МАССИВ В ОБРАТНОМ ПОРЯДКЕ)', consoleLogStyles);

    // Массив
    let numbers = [41, 38, 78, 98, 33];

    // * САМОЕ ПРОСТОЕ РЕШЕНИЕ
    // # numbers.reverse()

    // -------------------------------------------------------------------------------

    // переменная которая сохраняет значения которое будет меняться при перезаписывании массива
    let swap;

    // # РЕШЕНИЕ ЧЕРЕЗ ЦИКЛ + ПЕРЕМЕННАЯ
    for (let i = 0; i < Math.round(numbers.length / 2); i++) {
      swap = numbers[i];
      numbers[i] = numbers[numbers.length - 1 - i];
      numbers[numbers.length - 1 - i] = swap;
    }

    // -------------------------------------------------------------------------------

    let numbers2 = [41, 38, 78, 98, 33];

    // # Решение через Reverse + Concat
    let numbersReverse = numbers2.reduceRight((accumulator, currentValue) => {
      return accumulator.concat(currentValue);
    }, []);

    console.log('Reduce: Обратный порядок массива', numbersReverse);
  })();

  // __________________________ СКОЛЬКО РАЗ ВСТРЕЧАЕТСЯ В МАССИВЕ ЭЛЕМЕНТ ____________________________

  // ! 10
  (function () {
    console.log('%c 10) СКОЛЬКО РАЗ ВСТРЕЧАЕТСЯ В МАССИВЕ ЭЛЕМЕНТ', consoleLogStyles);

    const fruitBasket = [
      'banana',
      'cherry',
      'orange',
      'apple',
      'cherry',
      'orange',
      'apple',
      'banana',
      'cherry',
      'orange',
      'fig',
    ];
    const count = fruitBasket.reduce((tally, fruit) => {
      tally[fruit] = (tally[fruit] || 0) + 1;
      return tally;
    }, {});

    // count { banana: 2, cherry: 3, orange: 3, apple: 2, fig: 1 }

    console.log('Reduce: Сколько раз Элемент встречается в массиве', count);
  })();

  // ! 11
  (function () {
    /* Техническое задание
    Напиши сортировку массива выбором.
    Массив записан в переменную numbers.
    Отсортируй значения в массиве по возрастанию, от самого маленького значения к наибольшему.
  */

    console.log('%c 11) СОРТИРОВКА МАССИВА ВЫБОРОМ (MIN - MAX)', consoleLogStyles);

    let numbers = [16, 5, 7, 6, 2, 1];

    //* Самый быстрый вариант
    // numbers.sort( (first, last) => first - last)

    // # Функция сортировки
    const selectionSort = arr => {
      for (let i = 0; i < arr.length - 1; i++) {
        let indexMin = i;

        for (let j = i + 1; j < arr.length; j++) {
          if (arr[indexMin] > arr[j]) {
            indexMin = j;
          }
        }

        if (indexMin !== i) {
          [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
        }
      }
      return arr;
    };

    selectionSort(numbers);

    console.log(numbers);
  })();

  // ! 12
  (function () {
    console.log(
      '%c 12) НАЙТИ ПЕРЕСЕЧЕНИЯ В МАССИВЕ (ОТФИЛЬТРОВАННЫЙ СПИСОК ЛЮДЕЙ ПО SKILLS)',
      consoleLogStyles
    );
    /* Задача Дан список пользователей.
    У каждого есть массив скилов.
    Нужно отфильтровать людей имеющих только определенные скилы: */

    let users = [
      { name: 'Alex', experience: ['React', 'Babel'] },
      { name: 'Boba', experience: ['Ember', 'jQuery'] },
      { name: 'Lola', experience: ['Angular', 'TS'] },
    ];

    // Нужны только люди с такими скилами
    let skills = ['Angular', 'React'];

    // # Решение
    const getSkillsName = (objUsers, skillsUser) => {
      return objUsers.filter(user => user.experience.some(skill => skillsUser.includes(skill)));
    };

    console.log(
      `Отфильтрованный список людей имеющих только определенные скилы ${getSkillsName(users, skills)}`
    );
  })();

  // ! 13
  (function () {
    console.log(
      '%c 13) НАЙТИ КОЛИЧЕСТВО ЭЛЕМЕНТОВ МАССИВА, КОТОРЫЕ В СУММЕ НЕ ПРЕВЫШАЮТ LIMIT',
      consoleLogStyles
    );
    /*
      Задача
      Программа должна принимать два параметра:
      1) Массив с калорийностью блюд и лимит калорий на день.
      2) Названия параметров могут быть любыми.
      Программа должна возвращать количество блюд из массива, которые я могу съесть и не превысить допустимые калории.
      Блюда будут съедаться по порядку, начиная с первого элемента в массиве.
    */

    // const arrayB = [12, 27, 9, 20, 12, 13, 35];
    const arrayB = [20, 21, 15, 20, 13, 10, 29, 22, 10]; // 160
    let limitB = 150;

    // # Решение через forEach (Более точный, потому что limitDiet = 150)
    const getDiet = (array, limit) => {
      let limitDiet = 0;
      let limitNumber = 0;
      array.forEach((cal, index) => {
        limitDiet += cal;
        if (limitDiet <= limit) {
          limitNumber = index + 1;
        }
      });
      return limitNumber;
    };

    console.log(
      `Количество элементов массива, которые в сумме не превышают Limit: ${getDiet(arrayB, limitB)}`
    );

    // # Решение через Цикл (total = 160)
    let getDiet2 = function (calories, calorieLimit) {
      let total = 0;
      for (let i = 0; i < calories.length; i++) {
        total += calories[i];
        if (total > calorieLimit) {
          return i;
        }
      }
    };

    // # Найти индексы массива, которые при сложении элементов массива, должны быть равны преданному значению.

    const arrSum = [2, 7, 11, 15];
    const limitSum = 9;

    const twoSum = (nums, target) => {
      let limit = 0;
      return nums.reduce((arrIndex, item, index) => {
        return (limit += item) <= target ? [...arrIndex, index] : arrIndex;
      }, []);
    };

    // console.log(twoSum(arrSum, limitSum)) // [ 0, 1 ]
  })();

  // ! 14
  (function () {
    console.log('%c НАЙТИ СОВПАДАЮЩИЕ ЗНАЧЕНИЯ В ДВУХ МАССИВАХ', consoleLogStyles);

    let array1 = ['cat', 'sum', 'fun', 'run'];
    let array2 = ['bat', 'cat', 'dog', 'sun', 'hut', 'gut'];

    const intersection = array1.filter(element => array2.includes(element));

    console.log(`Значение которое совпадает в двух массивах: ${intersection}`);
  })();

  // ! 15
  (function () {
    console.log('%c ФУНКЦИЯ УДАЛЯЮЩАЯ ЭЛЕМЕНТЫ ИЗ МАССИВА', consoleLogStyles);
    // ! Функция удаляющая элементы из массива

    // # ES5
    function destroyer(array) {
      //  Array.from(arguments).slice(1) - аналог
      let destroyElements = [].slice.call(arguments, 1); // 1 - второй передаваемый элемент
      return array.filter(function (item) {
        return destroyElements.indexOf(item) === -1;
      });

      // * Reduce
      // return array.reduce(function(acc, item, i, arr) {
      //   return destroyElements.indexOf(item) === -1 ? acc.concat(item) : acc;
      // }, []);
    }

    // console.log(destroyer([1, 2, 3, 4, 5, 6, 7], 1, 3, 5, 6));
    // [2, 4, 7]
    // console.log(destroyer(['this', 'is', 'simple', 'algorithm'], 'this', 'is'));
    // ['simple', 'algorithm']

    // # ES6
    const destroyer2 = (array, ...destroyElements) =>
      array.filter(item => !destroyElements.includes(item));

    console.log(destroyer2([1, 2, 3, 4, 5, 6, 7], 1, 3, 5, 6));
    // [2, 4, 7]
    console.log(destroyer2(['this', 'is', 'simple', 'algorithm'], 'this', 'is'));
    // ['simple', 'algorithm']
  })();
})();
