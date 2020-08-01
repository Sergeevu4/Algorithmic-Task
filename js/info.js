'use strict';

/*
  # INFO:
  * 1) Проверка является ли массивом
  * 2) Способ создать массив необходимых длины из значений 0 до N
  * 3) Создать массива рандомных чисел
  * 4) Методы копирования массива (оставлять массив родительский неизменным)
  * 5) Глубоко копировать массив
  * 6) Многомерный массив в одномерный
  * 7) Одномерный массив в многомерный (Группировка элементов массива)
  * 8) Слияние массивов (Объединение двух массивов)
  * 9) (Дедупликация) Слияние массивов без повторений
  * 10) Уникальные значение в массиве
  * 11) Разность двух Массивов
  * 12) SET - Множество (Объединения, Пересечение, Разность)
  * 13) Функция Проверки на число
  * 14) Функции получения максмимального значения в массиве чисел
  * 15) Функция получения рандомного значения min ~ max
  * 16) Методы случайного перемешивания массива
  * 17) Понятие сложности алгоритма
  * 18) Сортировка пузырьком
  * 19) Бинарный (Двоичный) поиск
  * 20) Debounce и Throttling
*/

(function() {
  // # rest превращает параметры в массив (перевод: остальные `...parament` - и остальные параметры)
  // # spread - превращает массив в параметры через запятую
  // # Map, Set итерируемые структуры данных поэтому работает spread оператор

  // ! Rest
  const names = [`Виктор`, `Петр`, `Феофан`, `Аноним`];

  const getRandomName = () => names[Math.floor(Math.random() * names.length)];
  console.log(getRandomName());

  const greet = (name = getRandomName(), ...titles) => {
    // console.log(titles) // [ 'Единственный', 'Неповторимый', 'Любимый' ]

    // Отвечает за пробелы, при неограниченном размере параметров
    const space = titles.length > 0 ? ` ` : ``;

    return `Привет, ${titles.join(' и ')}${space}${name}`;
  };

  // console.log(greet(`Кот Матроскин`, `Единственный`, `Неповторимый`, `Любимый`))
  //  Привет, Единственный и Неповторимый и Любимый Кот Матроскин
})();

(function() {
  // ! Проверка является ли массивом
  const isArray = [12, 2, 2, 2, 1, 2];

  // # Первый способ проверки
  console.log(Object.prototype.toString.call(isArray));

  // # Второй способ проверки
  console.log(Array.isArray(isArray));

  // # Можно проверить любой элемент
  console.log({}.toString.call(isArray));

  // ? У Array.from есть встроенная функция подобно методу Mаp
  const arrayFrom1 = (...array) => Array.from(array, (item, index) => item + 1);
  // arrayFrom1(7, 4, 5) //  [ 8, 5, 6 ]

  // ! Способ создать массив необходимых длины из значений 0 до N

  // * Через Array.from - можно создавать массив необходимой длины из значений 0 до N
  const arrayFrom2 = Array.from({ length: 5 }, (item, index) => index);
  // [ 0, 1, 2, 3, 4 ]

  // * Через Array.from - можно создавать массив необходимой длины из значений 0 до N
  const maxArrayFrom = 10;
  const minArrayFrom = 1;
  const arrayFrom2New = Array.from(
    { length: maxArrayFrom - minArrayFrom + 1 },
    (v, i) => minArrayFrom + i
  ); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  // * Через конструктор new Array - еще один
  // (10) - длина массива (количество элементов)
  const arrayFrom3 = Array(10)
    .fill()
    .map((_, i) => i);
  // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

  // * Через конструктор new Array + keys
  const arrayFrom4 = [...Array(10).keys()];
  // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

  // ! Создать массива рандомных чисел
  const arrayFromRandom = Array.from({ length: 10 }, (v, i) => {
    let min = 1;
    let max = 10;
    min = Math.ceil(min);
    max = Math.floor(max);
    // Функция рандомного значения
    return Math.floor(Math.random() * (max - min + 1) + min);
  });

  // ! Методы копирования массива (оставлять массив родительский неизменным)
  const array = [5, 3, 8, 1, 0, 5, 25];

  // * Slice
  const arraySlice = array.slice();

  // * Array.from
  const arrayFrom = Array.from(array); //  [ 5, 3, 8, 1, 0, 5, 25 ]

  // * Array.of + spread
  const arrayFor = Array.of(...array); //  [ 5, 3, 8, 1, 0, 5, 25 ]

  // * Spread
  // spread при копировании массива идет только один уровень.
  const arraySpread = [...array]; //  [ 5, 3, 8, 1, 0, 5, 25 ]

  // ! Глубоко копировать массив

  const nestedArray = [1, [2], 3];

  // # Первый способ через JSON
  const arrayCopy = JSON.parse(JSON.stringify(nestedArray));

  // # Второй способ через Рекурсию
  const clone = arr => arr.map(item => (Array.isArray(item) ? clone(item) : item));

  // # Третий способ через Рекурсию
  function recursiveClone(val) {
    return Array.isArray(val) ? Array.from(val, recursiveClone) : val;
  }

  // * Если все числа в массиве
  const nums = [[1, 2], [10]];

  const cloneNums = nums.map(item => [...item]);
  cloneNums[1][1] = '!!!';
  // nums  [ [ 1, 2 ], [ 10 ] ]
  // cloneNums  [ [ 1, 2 ], [ 10 ] ]
})();

(function() {
  // ! Многомерный массив в одномерный

  const numbers = [
    [1, 2],
    [10, [101]],
  ];

  // # Новый способ через метод flat(на сколько глубоко разворачивать)
  numbers.flat(Infinity);

  // # Способ 1 (Через строку)
  const numbersStr = numbers
    .join()
    .split(',')
    .map(number => parseInt(number, 10));
  //  [ 1, 2, 10, 101 ]

  // # Способ 2 (Reduce + рекурсия)
  // flattenDeep - Сгладить глубину
  const flattenDeep = arr => {
    if (Array.isArray(arr)) {
      return arr.reduce((sum, elem) => {
        return sum.concat(flattenDeep(elem));
      }, []);
    } else {
      return arr;
    }
  };
  flattenDeep(numbers); //  [ 1, 2, 10, 101 ]

  // # Способ 3 (Reduce + рекурсия + тернарный)
  const flattenDeep2 = arr =>
    arr.reduce(
      (acc, item) => (Array.isArray(item) ? acc.concat(flattenDeep2(item)) : acc.concat(item)),
      []
    );

  flattenDeep2(numbers); // [1, 2, 10, 101];

  // # Если массив двумерный
  let arrTwo = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  let resultArrayTwo = [].concat(...arrTwo);
  // console.log(resultArrayTwo);  // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

  // ! Одномерный массив в многомерный (Группировка элементов массива)
  const matrix = [1, 2, 3, 4, 5, 6, 7, 8];

  // # Map + Filter
  const out = (arr, width) =>
    arr.map((_, i, array) => array.slice(i * width, i * width + width)).filter(el => el.length);
  // console.log(out(matrix, 3)); // [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ] ]

  // # Reduce + Условие
  const toMatrix = (arr, width) =>
    arr.reduce((rows, key, i) => {
      if (i % width === 0) {
        rows.push([key]);
      } else {
        rows[rows.length - 1].push(key);
      }
      return rows;
    }, []);

  // console.log(toMatrix(matrix, 2))  // [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ] ]

  // # Reduce + Тернарный оператор + Выход через &&

  /*
      && rows -
      Вычисления слево направо, если аргумент — false, оператор && возвращает его и заканчивает вычисления.
  */

  const toMatrix2 = (arr, width) =>
    arr.reduce(
      (rows, key, i) => (i % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows,
      // return rows
      []
    );

  // console.log(toMatrix2(matrix))  // [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ] ]

  // # Функция для группировки
  const getGroup = (arr, group) =>
    arr.reduce((acc, item, index) => {
      if (index % group === 0) acc.push([item]);
      else acc[acc.length - 1].push(item);
      return acc;
    }, []);
})();

(function() {
  // ! Слияние массивов (Объединение двух массивов)

  const arrA = [1, 2, 3, 4];
  const arrB = [3, 4, 5, 6];

  // * Spread
  let arrC = [...arrA, ...arrB]; // [ 1, 2, 3, 4, 3, 4, 5, 6 ]

  // * Concat
  let arrC1 = arrA.concat(arrB); // [ 1, 2, 3, 4, 3, 4, 5, 6 ]

  // * Reduce + Concat
  let arrC2 = arrB.reduce((acc, item) => {
    return acc.concat(item);
  }, arrA); // [ 1, 2, 3, 4, 3, 4, 5, 6 ]

  // ! (Дедупликация) Слияние массивов без повторений

  const numA = [1, 2, 5, 4, 6];
  const numB = [3, 4, 5, 6, 2];

  // * Concat + Filter + Includes
  let numC = numA.concat(numB.filter(item => !numA.includes(item)));
  //  [ 1, 2, 5, 4, 6, 3 ]

  // * Set + Spread
  // Если не воспользоваться Spread на Set
  // То получим не массив, а экземпляр объекта Set, никак не Array,
  // Не пройдет проверку Array.isArray
  // # Babel неверно трактует строку вида
  let numC2 = [...new Set([...numA, ...numB])];
  // [ 1, 2, 5, 4, 6, 3 ]

  // * Array.of
  let numC3 = Array.of(...new Set(Array.of(...numA, ...numB)));
  // [ 1, 2, 5, 4, 6, 3 ]
})();

(function() {
  // ! Уникальные значение в массиве
  const strings = ['кришна', 'кришна', 'харе', 'харе', 'харе', 'харе', 'кришна', 'кришна', '8-()'];

  // * FILTER
  const unique = arr => arr.filter((item, index) => arr.indexOf(item) === index);
  //  [ 'кришна', 'харе', '8-()' ]

  // * REDUCE
  const unique2 = arr =>
    arr.reduce((newArr, word) => (newArr.includes(word) ? newArr : [...newArr, word]), []);
  //  [ 'кришна', 'харе', '8-()' ]

  // * SET
  const unique3 = [...new Set(strings)];
  //  [ 'кришна', 'харе', '8-()' ]
})();

(function() {
  // ! Разность двух Массивов
  // Реализовать функцию, которая находит разницу в массивах и возвращает ее

  // # 1 способ
  function arrayDifference(arr1, arr2) {
    const result = [];

    arr1.forEach(item => {
      // Элементы первого массива которых нет в втором массиве
      if (!arr2.includes(item)) result.push(item);
    });

    arr2.forEach(item => {
      //  Элементы второго массива которых нет в первом массиве
      if (!arr1.includes(item)) result.push(item);
    });

    return result;
  }

  // # 2 способ
  function arrayDifference2(arr1, arr2) {
    // объединяю два массива, после проверяю новый массив на наличие элементов в первом и во втором массиве
    return arr1.concat(arr2).filter(item => !arr2.includes(item) || !arr1.includes(item));
  }

  // # 3 способ
  function arrayDifference3(arr1, arr2) {
    return arr1
      .filter(item => !arr2.includes(item))
      .concat(
        // после первой фильтрации объединяем ее со второй фильтрацией
        arr2.filter(item => !arr1.includes(item))
      );
  }

  // # 4 способ
  const diff = (arrA, arrB) => arrA.filter(item => !arrB.includes(item));

  function arrayDifference4(arr1, arr2) {
    // Использую одну функцию diff для получения
    return [...diff(arr1, arr2), ...diff(arr2, arr1)];
  }

  // console.log(arrayDifference(['javascript', 'is', 'awesome'], ['javascript', 'awesome']));
  // ['is']
  // console.log(arrayDifference4([1, 2, 3, 4, 5], [3, 4, 2, 7]));
  // [1, 5, 7]
})();

(function() {
  // ! SET - Множество
  const cities1 = new Set(['Beijing', 'Kiev', 'London']);
  const cities2 = new Set(['Kiev', 'London', 'Baghdad']);

  // *1 Объединения множеств
  // [...s1, ...s2] - объединили два set в новый массив
  // Потом передали параметром, в новый set
  const union = (s1, s2) => new Set([...s1, ...s2]);
  // console.log(union(cities1, cities2));  // Set { 'Beijing', 'Kiev', 'London', 'Baghdad' }

  // *2 Пересечение множеств
  // Это множество которому принадлежат элементы которые есть во всех исходных множествах
  const intersection = (s1, s2) => new Set([...s1].filter(v => s2.has(v)));
  // console.log(intersection(cities1, cities2)); //  Set { 'Kiev', 'London' }

  // # Можно заменить !
  const intersection2 = (array1, array2) => array1.filter(element => array2.includes(element));

  // *3 Разность двух множеств
  // # Разность 1 - Это все элементы первого множества не входящие во второе множество
  const difference = (s1, s2) => new Set([...s1].filter(v => !s2.has(v)));
  // console.log(difference(cities1, cities2)); // Set { 'Beijing' }

  // # Разность 2 - Это все элементы второго множества не входящие в первое множество
  const complement = (s1, s2) => difference(s2, s1);
  // console.log(complement(cities1, cities2)); //  Set { 'Beijing' }

  // *4 Объединения всех функций
  const operations = [union, intersection, difference, complement];
  /*
  Можно записать функции в массив operations
  И через метод map создать вызвать функции и через замыкание Set
  После записать массив в объекты с выполнением всех функций и через
  rest объединить в массив
*/

  // # Объединение 1 - MAP
  const results = operations.map(operation => ({
    [operation.name]: [...operation(cities1, cities2)],
  }));
  /*
    [ { union: [ 'Beijing', 'Kiev', 'London', 'Baghdad' ] },
    { intersection: [ 'Kiev', 'London' ] },
    { difference: [ 'Beijing' ] },
    { complement: [ 'Baghdad' ] } ]
  */

  // # Объединение 2 - Reduce
  const results2 = operations.reduce((operation, func) => {
    operation[func.name] = [...func(cities1, cities2)];
    return operation;
  }, {});

  // console.log(results2);

  // # Объединение 3 - Reduce + Деструктуризация
  const results3 = operations.reduce((operation, func) => {
    return { ...operation, [func.name]: [...func(cities1, cities2)] };
  }, {});

  // console.table(results3);
})();

(function() {
  // ! Функция Проверки на число

  function isNumeric(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
  }

  // ! Функции получения максмимального значения в массиве чисел

  // #1 Максимальное значение в массиве
  [1, 2, 3, 4].reduce((acc, num) => Math.max(acc, num), 0);

  // #2 Максимальное значение в массиве c отрицательными значениями
  [-1, -2, -3, -4].reduce((acc, num) => Math.max(acc, num), -Infinity);

  // #3 Универсальный метод Максимальное значение в массиве
  const max = (a, b) => (a > b ? a : b);
  [1, 2, 3, 4].reduce(max);

  // #4 Максимальное и Минимальное значение в массиве чисел
  const compose = (...fns) => (...args) => fns.map(fn => fn(...args));
  const minMax = compose(Math.min, Math.max);
  console.log(minMax(1, 2, 3, 3, 4, 5)); // [ 1, 5 ]

  // #5 Максимальное и Минимальное значение в массиве чисел
  const maxProfit = arr => [Math.min(...arr), Math.max(...arr)];
  console.log(maxProfit([1, 2, 3, 3, 4, 5])); // [ 1, 5 ]

  // ! Функция нахождения ближайшего число из массива
  const nearestBelow = (arr, input) => arr.reduce((acc, item) => (input >= item ? item : acc));

  // ! Функция получения рандомного значения min ~ max

  /*
    Метод Math.random возвращает 0 до 0.99999, но не включая 1
    Метод Math.floor всегда урезает всю часть после точки  От 0 до .99999 ... -> 0
    То есть если Math.floor(Math.random(), то всегда будет 0
    Можно умножит например на два, то есть получить диапазон от 0 до 1.99999 -> от 0 до 1
    Если умножить например 6 до получить диапазон от 0 до 5.99999

    Для получения необходимых данных при поиске диапазона Min - Max

    Пример:
      числа от 5 min включительно до 10 max включительно
      Все возможные цифры получаем 5,6,7,8,9,10 = 6 цифр
      При этом если умножить на 6, то получим диапазон на 5.99999
      ПОЭТОМУ необходимо всегда добавлять + 1 для компенсации
        Math.floor(Math.random() * (max - min + 1))
      НО на данном этапе получаем не то что нужно,
        диапазон равен 0, 1, 2, 3, 4, 5
        нужен 5, 6, 7, 8, 9, 10
      НЕОБХОДИМО добавить к полученному диапазону + min
*/

  const getRandomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  console.log(`Получения рандомного значения от ${5} до ${10} ${getRandomRange(5, 10)}`);

  // ! Методы случайного перемешивания массива

  // # !!ТОЛЬКО ЕСЛИ В МАССИВЕ ЧИСЛА и они идут по Возрастанию равномерно
  const shuffleNumber = array => {
    const random = array.map(Math.random);
    return array.slice().sort((a, b) => random[a] - random[b]);
  };

  // # НО МОЖНО ПОПРОБОВАТЬ РЕАЛИЗОВАТЬ ЧЕРЕЗ ВТОРУЮ ФУНКЦИЮ
  const arrShuffle = [0, 1, 2, 5, 100];

  const shuffleOne = array => {
    const random = array.map(Math.random);
    return array.slice().sort((a, b) => random[a] - random[b]);
  };

  const getMixedArray = array => {
    // Равномерно заполненный массив из индексов для возможности применения функции shuffleOne
    const indexes = array.map((elem, index) => index);
    // Рандомно перемещенный массив из индексов
    const newIndexes = shuffleOne(indexes);
    // Новый массив
    const newArray = array.map((item, index) => array[newIndexes[index]]);
    return newArray;
  };

  // console.log(getMixedArray(arrShuffle));

  // # Метод - 1 Sort (Самый короткий способ) - но менее эффективный
  /*
    Метод sort у JS массивов в качестве аргумента принимает функцию-компаратор.
    Эта функция должна принимать два элемента массива и возвращать число.
    Если число положительное, алгоритм сортировки считает, что первый элемент больше;
    Если отрицательное — значит, первый элемент меньше;
    Если же компаратор возвращает нуль, то в рамках данной сортировки элементы как бы равны.
    Если под видом компаратора передать функцию, которая будет возвращать положительное или отрицательное число случайным образом, то массив окажется отсортирован в «случайном» порядке.
  */

  const arrSort = [1, 2, 3, 4, 5];

  arrSort.sort((numberA, numberB) => {
    return Math.random() - 0.5;
  });

  console.log(`Sort случайного перемешивания массива ${arrSort}`);

  // # Метод - 2 Aлгоритм Фишера-Йетса (ES5) ИЗМЕНЯЕТ ПЕРВОНАЧАЛЬНЫЙ МАССИВ
  const arrSort2 = [1, 2, 3, 4, 5];

  /*
    Берём последний элемент и меняем его местами со случайно выбранным элементом не правее его
    (в том числе, возможно, и с ним самим).
    Затем повторяем ту же операцию для предпоследнего элемента
    Потом для предпредпоследнего и так далее.
  */

  const shuffle = arr => {
    let j;
    let temp;

    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));

      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  shuffle(arrSort2);
  console.log(`Aлгоритм Фишера случайного перемешивания массива ${arrSort2}`);

  // # Метод - 3 Aлгоритм Фишера-Йетса (ES6) НЕ ИЗМЕНЯЕТ ПЕРВОНАЧАЛЬНЫЙ МАССИВ
  const shuffle2 = arr => {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  };

  // # Метоод 4 - Aлгоритм Фишера-Йетса (ES6) + While ИЗМЕНЯЕТ ПЕРВОНАЧАЛЬНЫЙ МАССИВ
  const shuffle3 = arr => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  };
})();

(function() {
  /*
    ! Понятие сложности алгоритма
      На вход приходит массив с 10 000 элементов

    * O(1), константная — 1 (одна) операция;
    * O(log n), логарифмическая (например, бинарный поиск) — ~13 (чуть более тринадцати) операций;
    * О(n), линейная — 10 000 (десять тысяч) операций;
    * O(n * log n) - линейно алгоритмическая сложность (универсальные сортировоки)
    * О(n^2), квадратичная — 100 000 000 (сто миллионов) операций;
    * O(n^3), кубическая (если бы у нас был тройной вложенный цикл) — 1 000 000 000 000 (один триллион) операций;
    * O(n!), факториал от числа n (поиск всех перестановок, пример — и задачи коммивояжера) — 10 000 000 000 000 000 000 000 000… и еще очень много нулей.

    # Сложность O(n * log n) — это лучшая сложность универсальных сортировок

    ! Практически все встроенные методы работы с массивами имеют O(n)
    arr.push() - arr.pop() добавление и удаления с конца массива = O(1)
    arr.shift() arr.unshift() добавления и удаления с начала массива = O(n)
    Поэтому реализация stack - Базируется на LIFO — last in, first out (последним вошел — первым вышел)
  */

  function doubleCycle() {
    const arr = [16, 5, 7];
    // За каждый элемент массива нужно сделать полную итерацию по массиву
    // Имея три элемента в массиве внутри вложенного цикла, проделаем 9 операций
    // * Эта сложность называется квадратичной и обозначается О(n^2)

    for (let i = 0; i < arr.length; i++) {
      // array[i] -> 16 5 7
      for (let j = 0; j < arr.length; j++) {
        // array[i] -> 16 16 16  5 5 5  7 7 7
        // array[j] -> 16 5 7  16 5 7  16 5 7
      }
    }

    // Если добавить внутрь вложенный цикл
    arr.forEach(num => console.log(num));
    // * То сложность не увеличится: O(n)Линейная + квадратичная n^2,
    // Она останется прежней, квадратичной
    // Big O указывает на самую быстрорастущую сложность алгоритма
    return arr;
  }

  // console.log(doubleCycle()); //  [ 16, 5, 7 ]

  const array = [3, 2, 6, -1, 10];
  // https://www.youtube.com/watch?v=a6132mLen1s

  // ! Сортировка пузырьком О(n^2)
  const bubbleSort = arr => {
    const sort = arr.slice();
    const length = sort.length;

    for (let step = 0; step < length; step++) {
      for (let i = 0; i < length - step; i++) {
        // length - step при каждом цикле, чтобы лишний раз не проверять
        // И не запускать внутренний цикл
        // Самый весомый элемент уже находиться в конце массива: 10

        if (sort[i] > sort[i + 1]) {
          [sort[i + 1], sort[i]] = [sort[i], sort[i + 1]];
        }
      }
    }
    return sort;
  };

  console.log(bubbleSort(array));
})();

(function() {
  /*
    // ! Бинарный (Двоичный) поиск O(log n)
    https://www.youtube.com/watch?v=074rf3JuLiE&t=1693s

      # Формула середины массива: low + (high - low) / 2
      (high - low) / 2 -> индекс центрального элемента
      в момент поиска указатель high и low будут смешаться и
      + low, необходим для смещения и компенсации откинутой части массива

      ! Пример:
        в массиве [1, 2, 3, 4, 5, 6, 7] необходимо найти цифру 6
        необходимо уйти в право подмассив [5, 6, 7]
        Чтобы найти центральную точку в этом подмассиве,
        low равен индексу 4 = цифра 5, hight до сих пор равен 6 = цифра 7
        (6 - 4) / 2 = 1 -> и если бы не было + low => тогда бы 1 указывала
        на второй элемент в массиве = цифра 2.
        Для компенсации как раз и необходимо прибавить + low
        4 + (6 - 4) / 2 = 5 индекс указывает на искомую цифру 6
  */

  // Обязательно отсортированный массив
  const arr = [1, 2, 3, 4, 5, 6, 7];

  function binarySearch(arr, key) {
    let low = 0; // индекс первого элемента в массиве
    let high = arr.length - 1; // индекс последнего элемента в массиве

    // Закончиться, high станет пустым, либо в массиве нет искомого числа,
    while (low <= high) {
      // Индекс центрального элемента
      let middle = low + (high - low) / 2;

      if (key < arr[middle]) {
        high = middle - 1;
      } else if (key > arr[middle]) {
        low = middle + 1;
      } else {
        // Ключ равняется центральному элементу
        // Возвращаем индекс того элемента который равен ключу, искому значению
        return middle;
      }
    }

    // Если элемента нет в массиве
    return -1;
  }

  console.log('Бинарный поиск искомого числа', binarySearch(arr, 2));

  const arr2 = [1, 2, 3, 4, 5, 6, 7];

  function binarySearch2(arr, search) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
      const middle = Math.floor((left + right) / 2);

      if (arr[middle] >= search) {
        right = middle;
      } else {
        left = middle + 1;
      }
    }

    return arr[right] === search ? right : -1;
  }

  console.log('Бинарный поиск искомого числа', binarySearch2(arr2, 3));
})();

(function() {
  // ! Debounce и Throttling

  /*
    Debounce — функция будет выполнена только тогда, когда после
    последней попытки вызова прошло определённое время.
    Задержка начинает заново отсчитываться с каждой новой попыткой вызова.
    Например если повесить debounce на onscroll с временем 100ms, то
    функция выполнится через 100ms после прекращения скрола.

    debounce возвращает функцию, которая будет перезапускать таймер с переданным значением ms.
    Таким образом, оригинальная функция будет вызвана через ms после последнего вызова debouncedFn.
  */

  // ! 1
  function debounce(originalFn, ms) {
    let timeout;
    return (...args) => {
      // очистить таймаут каждый раз, когда вызывается функция
      clearTimeout(timeout);
      // вызовите исходную функцию один раз через "ms" после того, как истек последний вызов
      timeout = setTimeout(() => originalFn(...args), ms);
    };
  }

  // ! 2
  function debounceTwo(f, t) {
    return function(args) {
      let previousCall = this.lastCall;
      this.lastCall = Date.now();

      if (previousCall && this.lastCall - previousCall <= t) {
        clearTimeout(this.lastCallTimer);
      }
      this.lastCallTimer = setTimeout(() => f(args), t);
    };
  }

  /*
    Throttling — функция будет выполняться не чаще одного раза в
    указанный период, даже если она будет вызвана много раз в течение этого периода.
    Например если повесить throttle на onscroll с временем 100ms, то функция будет выполнятся каждые 100ms пока происходит скролинг.
  */

  function throttle(originalFn, ms) {
    // Игнорируется ли запросы ?
    let isThrottled = false;

    // Аргументы последнего вызова
    let saveArgs;
    // Текущий контекст
    let savedThis;

    function wrapper() {
      // Игнорируем
      if (isThrottled) {
        saveArgs = arguments;
        savedThis = this;
        return;
      }

      // Вызов переданной функции
      originalFn.apply(this, arguments);
      // После первого вызова, должен перестать принимать остальные вызовы
      isThrottled = true;

      // После необходимого времени заново начинаю принимать запросы
      setTimeout(() => {
        isThrottled = false;

        // ! Обработка последнего вызова
        if (saveArgs) {
          wrapper.apply(savedThis, saveArgs);
          savedThis = null;
          saveArgs = null;
        }
      }, ms);
    }

    wrapper();
  }
})();
