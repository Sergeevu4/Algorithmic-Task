'use strict';

/*
TODO ЗАДАЧИ:
* 1) Массив в обратном порядке
* 2) Сколько раз встречается в массиве или в строке
* 3) Вычислить общую стоимость товаров и выставить покупателю счёт
* 4) Многоуровневый массив в одноуровневый массив
* 5) Найти в объекте: самый сильный герой + сумма силы
* 6) Найти в объекте: поля, которые в исходном объекте были true
* 7) Массив названий книг, преобразовать каждый заголовок в объект и добавить
* 8) Найти количество элементов массива, которые в сумме не превышают limit
* 9) Отрисовать ТЕГИ: li
* 10)*Отфильтровать Анаграммы
* 11)*Сгруппировать анаграммы Анаграммы
* 12)Преобразование массива в объект
* 13)Использования массива функций через Reduce (Трубопровод)
* 14)Найти максимальные значения в Матрице массивов и сложить их
* 15)LODASH mapValues замена стандартным методом
* 16)Массив уникальных объектов
* 17)Медина
* 19)Посчитать среднее из массива чисел
* 18)Среднего значения оценки популярности
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

  // console.log('%cHello There', consoleLogStyles);

  // ! 1
  (function() {
    console.log('%c 1) МАССИВ В ОБРАТНОМ ПОРЯДКЕ', consoleLogStyles);

    const numbers2 = [41, 38, 78, 98, 33];

    // Решение через Reverse + Concat
    const numbersReverse = numbers2.reduceRight((accumulator, currentValue, index) => {
      return accumulator.concat(currentValue);
    }, []);

    console.log('Reduce: Обратный порядок массива', numbersReverse);
  })();

  // ! 2
  (function() {
    console.log('%c 2) СКОЛЬКО РАЗ ВСТРЕЧАЕТСЯ В МАССИВЕ ИЛИ В СТРОКЕ', consoleLogStyles);

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

    // # Второй способ
    // Антипатерн https://www.richsnapp.com/blog/2019/06-09-reduce-spread-anti-pattern
    const count2 = fruitBasket.reduce((acc, item) => ({ ...acc, [item]: (acc[item] || 0) + 1 }), {});

    // # Третий способ, через структуру данных Map
    const str = `adam`;

    function countSymbols(string) {
      const map = new Map();

      for (let i = 0; i < string.length; i++) {
        if (!map.has(string[i])) {
          map.set(string[i], 1);
        } else {
          map.set(string[i], map.get(string[i]) + 1);
        }
      }

      // Встроенный метод преобразования Map в обычный объект
      return Object.fromEntries(map.entries());
    }

    console.log(`Сколько раз встречается символов с строке: ${str}`, countSymbols(str));

    // # Третий способ №2 , через структуру данных Map
    function countSymbols2(string) {
      const map = new Map();

      for (let i = 0; i < string.length; i++) {
        const char = string[i]; // каждый итерируемый символ
        let newValue = 1; // сколько раз мы его встретили, по-умолчанию один
        // если символ уже встречался, т.е. записан в карту, увеличиваем
        if (map.has(char)) newValue += map.get(char);
        // обновляем сколько раз текущий символ встретился
        map.set(char, newValue);
      }

      return Object.fromEntries(map.entries());
    }
  })();

  // ! 3
  (function() {
    console.log('%c 3) ВЫЧИСЛИТЬ ОБЩУЮ СТОИМОСТЬ ТОВАРОВ И ВЫСТАВИТЬ ПОКУПАТЕЛЮ СЧЁТ', consoleLogStyles);

    /*
      Представьте, что у вас есть каталог товаров, у каждого из которых есть определённый набор свойств,
      в том числе и свойство price, которое и возьмём для примера.
      Ваш покупатель выбирает товары и добавляет их в корзину.
      Таким образом, заходя в корзину, пользователь остаётся с выбранными им товарами,
      которые мы, как разработчики, будем считать массивом объектов подобного вида:
    */

    // Массив объектов товаров и их ценой.
    const selected = [{ price: 20 }, { price: 45 }, { price: 67 }, { price: 1305 }];

    /*
      Магазин у вас интернациональный и каждый клиент вправе выбрать ту валюту,
      с помощью которой ему будет удобно рассчитаться.
      Чтобы удобно всё это оформить создадим объект функций “редюсеров”,
      которые будут вычислять стоимость, исходя из курса рубля
    */

    // Объект методов (функций) для подсчета стоимости, каждого из товаров = суммы всех товаров.
    const reducers = {
      rubles(state, item) {
        return (state.rubles += item.price);
      },
      dollars(state, item) {
        return (state.dollars += item.price / 71.6024);
      },
      euros(state, item) {
        return (state.euros += item.price / 79.0133);
      },
      yens(state, item) {
        return (state.yens += item.price / 0.6341);
      },
      pounds(state, item) {
        return (state.pounds += item.price / 101.7829);
      },
    };

    /* Чтобы получить возможность автоматически использовать
    все запрашиваемые callback функции из объекта редюсеров нужно написать ещё одну функцию-обёртку,
    которая будет вычислять все переданные ей значения цен,
    последовательно вызывая функцию-редюсер для каждого типа валют: */

    // Основная функция которая вызывает объект функций
    let combineReducers = function(reducers) {
      return function(state, item) {
        return Object.keys(reducers).reduce(function(nextState, key) {
          reducers[key](state, item);
          return state;
        }, {});
      };
    };

    // Получаем функцию, которая будет всё обрабатывать
    let priceReducer = combineReducers(reducers);
    // и вычисляем общую стоимость, задавая объект с изначальными значениями
    let totalPrice = selected.reduce(priceReducer, {
      rubles: 0,
      pounds: 0,
      dollars: 0,
      euros: 0,
      yens: 0,
    });

    console.log(totalPrice);

    // {
    //   "rubles": 1437,
    //   "pounds": 14.118285095040523,
    //   "dollars": 20.069159692971187,
    //   "euros": 18.186811587416294,
    //   "yens": 2266.204068758871
    // }
  })();

  // ! 4
  (function() {
    console.log('%c  4) МНОГОУРОВНЕВЫЙ МАССИВ В ОДНОУРОВНЕВЫЙ МАССИВ', consoleLogStyles);

    let arr = [1, [2], [3, [[4]]]];

    // Метод основанный на Рекурсии
    function flatten(arr) {
      if (Array.isArray(arr)) {
        return arr.reduce(function(done, curr) {
          return done.concat(flatten(curr));
        }, []);
      } else {
        return arr;
      }
    }

    // Метод основанный на Рекурсии 2
    let arr2 = [1, [2], [3, [[4]]]];
    let flattenReduceArray = (result, item) =>
      Array.isArray(item) ? item.reduce(flattenReduceArray, result) : [...result, item];

    const flat2 = arr2.reduce((acc, item) => {
      return flattenReduceArray(acc, item);
    }, []);

    // console.log(flat2);

    // Преобразование через ToString
    const arr3 = [1, [2], [3, [[4]]]];

    const resultToString = arr3
      .toString()
      .split(',')
      .map(el => parseInt(el, 10));
    console.log(resultToString);

    // Если массив двумерный
    let arrTwo = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let resultArrayTwo = [].concat(...arrTwo);
    console.log(resultArrayTwo);
  })();

  // ! 5
  (function() {
    console.log('%c 5) НАЙТИ В ОБЪЕКТЕ: САМЫЙ СИЛЬНЫЙ ГЕРОЙ + СУММА СИЛЫ', consoleLogStyles);

    const heroes = [
      { name: 'Hulk', strength: 90000 },
      { name: 'Spider-Man', strength: 25000 },
      { name: 'Hawk Eye', strength: 136 },
      { name: 'Thor', strength: 100000 },
      { name: 'Black Widow', strength: 136 },
      { name: 'Vision', strength: 5000 },
      { name: 'Scarlet Witch', strength: 60 },
      { name: 'Mystique', strength: 120 },
      { name: 'Namora', strength: 75000 },
    ];

    // Найти самого сильного героя
    let strongest = {
      strength: 0,
    };

    for (let hero of heroes) {
      if (hero.strength > strongest.strength) {
        strongest = hero;
      }
    }
    console.log('FOR...OF: Самый сильный герой ', strongest);

    // prettier-ignore
    let strongest2 = heroes.reduce((champion, contender) => {
      return contender.strength > champion.strength ? contender : champion;
    }, {strength: 0});

    console.log('Reduce: Самый сильный герой', strongest2);

    // Найти общую силу всех героев
    let combinedStrength = 0;

    for (let hero of heroes) {
      combinedStrength += hero.strength;
    }

    console.log('FOR...OF: Сумма силы всех героев ', combinedStrength);

    let combinedStrength2 = heroes.reduce((sum, hero) => {
      return sum + hero.strength;
    }, 0); // 0!

    console.log('Reduce: Сумма силы всех героев ', combinedStrength2);
  })();

  // ! 6
  (function() {
    console.log('%c 6) НАЙТИ В ОБЪЕКТЕ: ПОЛЯ, КОТОРЫЕ В ИСХОДНОМ ОБЪЕКТЕ БЫЛИ: TRUE', consoleLogStyles);

    const modes = {
      air: true,
      road: true,
      sea: false,
    };

    const newModes = Object.keys(modes)
      .filter(key => modes[key])
      .reduce((prev, key) => {
        return { ...prev, [key]: modes[key] };
      }, {});

    console.log('Reduce: Поля, которые в исходном были true', newModes);
  })();

  // ! 7
  (function() {
    console.log(
      '%c 7) МАССИВ НАЗВАНИЙ КНИГ, ПРЕОБРАЗОВАТЬ КАЖДЫЙ ЗАГОЛОВОК В ОБЪЕКТ И ДОБАВИТЬ ID',
      consoleLogStyles
    );
    /*
        Задача
        Массив названий книг, нужно преобразовать каждый заголовок в объект.
        Дать этому объекту уникальный идентификатор.
      */

    // Массив заголовков книг
    const booksArray = ['Чистый код', 'Код завершен', 'Введение в алгоритмы'];

    // # Первый способ через reduce
    const newArray = booksArray.reduce((objbooks, book, index) => {
      return objbooks.concat({
        id: index + 1,
        title: book,
      });
    }, []);

    // console.log(newArray);

    // # Второй способ через Map
    const newArray2 = booksArray.map((title, index) => ({
      id: index + 1,
      title,
    }));

    console.log(`Массив, объектов книг ${newArray2}`);

    // Новый массив для объектов
    const newArray3 = [];

    // Счетчик
    let counter = 1;

    // # Третий способ через Цикл
    for (let title of booksArray) {
      newArray3.push({
        id: counter,
        title,
      });
      counter += 1;
    }

    // console.log(newArray3);
  })();

  // ! 8
  (function() {
    console.log(
      '%c 8) НАЙТИ КОЛИЧЕСТВО ЭЛЕМЕНТОВ МАССИВА, КОТОРЫЕ В СУММЕ НЕ ПРЕВЫШАЮТ LIMIT',
      consoleLogStyles
    );

    // # Найти индексы массива, которые при сложении элементов массива, должны быть равны преданному значению.

    const arrSum = [2, 7, 11, 15];
    const limitSum = 9;

    const twoSum = (nums, target) => {
      let limit = 0;
      return nums.reduce((arrIndex, item, index) => {
        return (limit += item) <= target ? [...arrIndex, index] : arrIndex;
      }, []);
    };

    console.log(twoSum(arrSum, limitSum)); // [ 0, 1 ]
  })();

  // ! 9
  (function() {
    console.log('%c 9) ОТРИСОВАТЬ ТЕГИ: <li>', consoleLogStyles);

    // Map, Set итерируемые структуры данных поэтому работает spread оператор

    const hashtags = new Set([`cinema`, `entertainment`, `myselft`, `cinema`]);

    // Новые элементы Dom li
    const hashtagsMarkdown = [...hashtags].reduce((acc, it) => (acc += `<li>${it}</li>\n`), ``);

    console.log(hashtagsMarkdown);

    /*
      <li>cinema</li>
      <li>entertainment</li>
      <li>myselft</li>
    */
  })();

  // ? 10
  (function() {
    console.log('%c 10) ОТФИЛЬТРОВАТЬ АНАГРАММЫ', consoleLogStyles);

    const arrAnagram = ['воз', 'киборг', 'корсет', 'ЗОВ', 'гробик', 'костер', 'сектор'];

    // # Через reduce Мой
    // prettier-ignore
    const aclean2 = (arr) => {
			return Object.values(
				arr.reduce((acc, word) => {
					acc[word.toLowerCase().split('').sort().join('')] = word;
					return acc;
				}, {}),
			);
		};

    console.log(aclean2(arrAnagram)); //  [ 'ЗОВ', 'гробик', 'сектор' ]

    // # Через reduce Способ Михаила
    // prettier-ignore
    const sort = (item) =>
			item.toLowerCase().split('').sort().join('');

    const aclean4 = arr =>
      arr.reduce((acc, item) => (acc.map(sort).includes(sort(item)) ? acc : [...acc, item]), []);

    aclean4(arrAnagram); //  [ 'воз', 'киборг', 'корсет' ]
  })();

  // ? 11
  (function() {
    console.log('%c 11) СГРУППИРОВАТЬ АНАГРАММЫ АНАГРАММЫ', consoleLogStyles);

    /*
     * Как отмечалось ранее - задача в том, что нужно сгруппировать анаграммы, а в исходном массиве они могут идти в любом порядке.
     */

    const arrAnagram = ['воз', 'киборг', 'корсет', 'ЗОВ', 'гробик', 'костер', 'сектор'];

    /*
     * Сортирует строки в массиве так,
     * что анаграммы располагаются друг за другом.
     * Реализация представляет собой разновидность
     * алгоритма блочной сортировки.
     */

    const aclean3 = arr => {
      const map = arr.reduce((acc, str) => {
        // сгруппируем анаграммы в хеш-таблице
        const key = str
          .toLowerCase()
          .split('')
          .sort()
          .join('');
        if (acc[key]) {
          acc[key].push(str);
        } else {
          acc[key] = [str];
        }
        return acc;
      }, {});

      // return map
      /*  { 'взо': [ 'воз', 'ЗОВ' ],
          'бгикор': [ 'киборг', 'гробик' ],
          'екорст': [ 'корсет', 'костер', 'сектор' ]
        }
    */

      // приводим хеш-таблицу обратно к массиву
      return Object.keys(map).reduce((acc, key) => {
        return acc.concat(map[key]);
      }, []);

      //  [ 'воз', 'ЗОВ', 'киборг', 'гробик', 'корсет', 'костер', 'сектор' ]
    };
  })();

  // ! 12
  (function() {
    console.log('%c 12) ПРЕОБРАЗОВАНИЕ МАССИВА В ОБЪЕКТ', consoleLogStyles);
    // https://www.richsnapp.com/blog/2019/06-09-reduce-spread-anti-pattern

    // ! Встроенный метод
    console.log(
      //  { banana: 1, orange: 2, meat: 4 }
      Object.fromEntries([
        ['banana', 1],
        ['orange', 2],
        ['meat', 4],
      ])
    );

    const array = [
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ];

    // Через деструктуризацию [key, val] превратил из массива ['a', 1]
    // Разные переемные (['a', 1])
    const result = array.reduce((obj, [key, val]) => {
      // obj[key] = val
      // return obj
      return { ...obj, [key]: val };
    }, {});

    // Так будет эффективней
    const result2 = array.reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {});

    console.log(`Переработанный массив в объект: ${result}`); // { a: 1, b: 2, c: 3 }
  })();

  // ! 13
  (function() {
    console.log('%c 13) ИСПОЛЬЗОВАНИЯ МАССИВА ФУНКЦИЙ ЧЕРЕЗ REDUCE (ТРУБОПРОВОД)', consoleLogStyles);

    // increment - increment
    const increment = input => input + 1;
    // decrement - Уменьшения
    const decrement = input => input - 1;
    const double = input => input * 2;
    const halve = input => input / 2;

    // pipeline - Трубопровод
    const pipeline = [increment, double, decrement];

    const pipelineResult = pipeline.reduce((total, func) => func(total), 1);
    console.log(pipelineResult);
    /*
      Начальное значение = 1
        1. increment: 1 + 1 = 2
        2. double: 2 * 2 = 4
        3. decrement: 4 - 1 = 3
        total = 3
    */
  })();

  // ! 14
  (function() {
    console.log('%c 14) НАЙТИ МАКСИМАЛЬНЫЕ ЗНАЧЕНИЯ В МАТРИЦЕ МАССИВОВ И СЛОЖИТЬ ИХ', consoleLogStyles);

    const matrix = [
      [7, 10, 1, 5, 2],
      [6, -1, 7, 2, 3],
      [1, 2, 4, -8, 2],
      [-6, 4, 8, 2, 0],
    ];

    const max = (a, b) => (a > b ? a : b);

    const res = matrix
      // Перебирается каждый массив и находиться в нем максимальное значение
      // После все эти значение складываются между собой
      .map(row => row.reduce(max))
      .reduce((acc, rowMax) => acc + rowMax);

    console.log(res); // 29
  })();

  // ! 15
  (function() {
    console.log('%c 15) LODASH MAPVALUES ЗАМЕНА СТАНДАРТНЫМ МЕТОДОМ', consoleLogStyles);
    /*
      # mapValues:
      Создает новый объект с такими же ключами, как у исходного,
      значения получаются вызовом callback-функции к каждому элементу
    */

    const users = {
      fred: { user: 'fred', age: 40 },
      pebbles: { user: 'pebbles', age: 1 },
    };

    function mapValues(obj, map) {
      return Object.keys(obj).reduce((all, key) => {
        all[key] = map(obj[key], key, obj);
        return all;
      }, {});
    }

    console.log(
      mapValues({ a: '', b: '', c: '' }, (val, key) => {
        return key;
      })
    ); //  { a: 'a', b: 'b', c: 'c' }

    console.log(
      mapValues(users, val => {
        return val.age;
      })
    ); //  { fred: 40, pebbles: 1 }
  })();

  // ! 16
  (function() {
    console.log('%c 16) МАССИВ УНИКАЛЬНЫХ ОБЪЕКТОВ', consoleLogStyles);

    /*
      ! Необходимо быть внимательным с тем, что при разном расположении свойств
        ответ будет false

        const a = { name: 'andrei', age: 18}
        const b = { age: 18, name: 'andrei' }
        console.log(JSON.stringify(a) === JSON.stringify(b)) // false
    */

    function isEqual(objectA, objectB) {
      return JSON.stringify(objectA) === JSON.stringify(objectB);
    }

    function unique(array) {
      return array.reduce((uniqueArray, currentElement) => {
        const isDuplicated = uniqueArray.find(element => isEqual(element, currentElement));
        return isDuplicated ? uniqueArray : [...uniqueArray, currentElement];
      }, []);
    }

    console.log(unique([{ a: 'x' }, { a: 'z' }, { a: 'z' }, { a: 'x' }, { a: 'x' }]));
    //  [ { a: 'x' }, { a: 'z' } ]

    // # Удаления дубликатов JSON
    const filteredBooks = [...new Set(books.map(book => JSON.stringify(book)))].map(book =>
      JSON.parse(book)
    );
  })();

  // ! 17
  (function() {
    console.log('%c 17) МЕДИАНА', consoleLogStyles);

    /*
    ! Среднее арифметическое значение - сумма чисел деленное на их количество

    ! Медиана - это центральная число (середина), в упорядоченном наборе чисел

    * Медиана на четном количестве чисел (элементов):
      Вычитаем из длины массива единицу и делим на два -> (arrSort.length - 1) / 2
      Полученное число используем для поиска по индексу

    * Медиана на нечетном количестве чисел (элементов):
      Делим длину массива на два и вычитаем единицу, находим левый индекс -> sorted[middle - 1]
      Делим длину массива на два, находим правый индекс
      После из полученных значений находим среднее арифметическое на основе полученных данных
      Это число и будет медианой: (sorted[middle - 1] + sorted[middle]) / 2;

      ?  const middle = Math.floor((start + (end - start)/2);
  */

    const arrMedian = [108, 232, 509, 609, 1109, 634];

    function getMedian(arr) {
      if (!arr.length) return 0;
      // Обязательно необходимо отсортировать массив + sort изменяет массив
      const sorted = arr.slice().sort((a, b) => a - b);
      // Середина - можно написать так -> (arrSort.length - 1) / 2
      const middle = Math.floor(sorted.length / 2);

      // Медиана на четном количестве в массиве
      if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
      }

      // Медиана на нечетном количестве в массиве
      return sorted[middle];
    }

    // console.log(getMedian(arrMedian)); // 559
  })();

  // ! 18
  (function() {
    console.log('%c 18) ПОСЧИТАТЬ СРЕДНЕЕ ИЗ МАССИВА ЧИСЕЛ', consoleLogStyles);

    const averageNumbers = [29.76, 41.85, 46.5];
    // average Numbers

    // * Первый способ внутри Reduce
    // Необходимо проверка, так как на каждой итерации в total прибавляется
    // amount и если сразу делить на длину массива, то тогда каждое число будет
    // делиться на длину массива.
    const average = averageNumbers.reduce((total, amount, index, array) => {
      total += amount;
      if (index === array.length - 1) {
        return total / array.length;
      } else {
        return total;
      }
    }, 0);

    console.log(`Среднее ${average}`); //  39.37

    // * Второй способ разделить за пределами Reduce
    const average2 = averageNumbers.reduce((acc, val) => acc + val, 0) / averageNumbers.length;
    // console.log(average2);

    // * Третий способ через
    // prettier-ignore
    const average3 = averageNumbers.reduce(
			(total, amount, index, array) => (
				index === array.length - 1 ? (total += amount) / array.length : (total += amount)
      ), 0)

    // console.log(average3);
  })();

  // ! 19
  (function() {
    console.log('%c 19) СРЕДНЕГО ЗНАЧЕНИЯ ОЦЕНКИ ПОПУЛЯРНОСТИ', consoleLogStyles);

    // !
    const victorianSlang = [
      {
        term: 'doing the bear',
        found: true,
        popularity: 108,
      },
      {
        term: 'katterzem',
        found: false,
        popularity: null,
      },
      {
        term: 'bone shaker',
        found: true,
        popularity: 609,
      },
      {
        term: 'smothering a parrot',
        found: false,
        popularity: null,
      },
      {
        term: 'damfino',
        found: true,
        popularity: 232,
      },
      {
        term: 'rain napper',
        found: false,
        popularity: null,
      },
    ];

    // ! 1) Императивный способ ( ЦИКЛ )
    function averageCycle(arr) {
      let popularitySum = 0;
      let itemsFound = 0;
      let item = null;

      for (let i = 0; i < arr.length; i++) {
        item = arr[i];

        // Отфильтровываем выражения, которые не были найдены в книгах.
        if (item.found) {
          itemsFound++;
          popularitySum += item.popularity;
        }
      }

      return popularitySum / itemsFound;
    }
    console.log(averageCycle(victorianSlang)); // 316.3333333333333

    // ! 2) Декларативный способ ( Функциональный стиль )
    function average(arr) {
      // * Вспомогательные функции:

      function isFound(item) {
        return item.found;
      }

      function getPopularity(item) {
        return item.popularity;
      }

      function addScores(runningTotal, popularity) {
        return runningTotal + popularity;
      }

      // * Вычисления:

      // Отфильтровываем выражения, которые не были найдены в книгах.
      const foundSlangTerms = arr.filter(isFound);

      // Извлекаем оценки популярности, получая массив чисел.
      const popularityScores = foundSlangTerms.map(getPopularity);

      // Находим сумму всех оценок популярности.
      const scoresTotal = popularityScores.reduce(addScores, 0);

      return scoresTotal / popularityScores.length;
    }

    console.log(average(victorianSlang)); // 316.3333333333333

    // ! 2.1
    function average1(arr) {
      // Отфильтровываем выражения, которые не были найдены в книгах.
      const foundSlangTerms = arr.filter(item => item.found);
      // Извлекаем оценки популярности, получая массив чисел.
      const popularityScores = foundSlangTerms.map(item => item.popularity);
      // Находим сумму всех оценок популярности.
      const scoresTotal = popularityScores.reduce((acc, item) => acc + item, 0);
      return scoresTotal / popularityScores.length;
    }

    console.log(average1(victorianSlang)); // 316.3333333333333

    // ! 2.2
    function average2(arr) {
      /*
        Чтобы объединить все в цепочку вызовов всех функций
        и можно было бы обойтись без промежуточных переменных
        нужен какой-то другой способ нахождения количества элементов в массиве:
        popularityScores.length
      */

      // * Вспомогательные функции:

      // Отфильтровываем выражения, которые не были найдены в книгах.
      function isFound(item) {
        return item.found;
      }

      // Находим сумму всех оценок популярности.
      function getPopularity(item) {
        return item.popularity;
      }

      // Для представления нескольких значений, возвращаемых return, мы используем объект.
      function addScores({ totalPopularity, itemCount }, popularity) {
        return {
          totalPopularity: totalPopularity + popularity,
          itemCount: itemCount + 1,
        };
      }

      // * Вычисления:

      // Объект который становиться аккамулятором внутри reduce
      const initialInfo = { totalPopularity: 0, itemCount: 0 };

      const popularityInfo = arr
        .filter(isFound)
        .map(getPopularity)
        .reduce(addScores, initialInfo);

      // Вычисляем и выводим в консоль среднее значение.

      // popularityInfo -> { totalPopularity: 949, itemCount: 3 }
      const { totalPopularity, itemCount } = popularityInfo;

      return totalPopularity / itemCount;
    }

    console.log(average2(victorianSlang)); // 316.3333333333333

    // ! 2.3
    function average3(arr) {
      const initialInfo = { totalPopularity: 0, itemCount: 0 };
      const popularityInfo = arr
        .filter(item => item.found)
        .map(item => item.popularity)
        .reduce(({ totalPopularity, itemCount }, item) => {
          return {
            totalPopularity: totalPopularity + item,
            itemCount: itemCount + 1,
          };
        }, initialInfo);

      // popularityInfo -> { totalPopularity: 949, itemCount: 3 }
      const { totalPopularity, itemCount } = popularityInfo;
      return totalPopularity / itemCount;
    }

    console.log(average3(victorianSlang)); // 316.3333333333333

    // ! 2.4 (Reduce без объекта)
    function average4(arr) {
      return arr
        .filter(item => item.found)
        .map(item => item.popularity)
        .reduce((total, item, index, array) => {
          return index === array.length - 1
            ? // Если да
              (total += item) / array.length
            : // Если нет
              (total += item);
        }, 0);
    }

    // console.log(average4(victorianSlang)); // 316.3333333333333

    // ! 2.5 (Reduce без объекта + Один цикл)
    //
    function average5(arr) {
      // ! Обязательно соблюдать название переменных при диструктуризации ?
      const { totalPopularity, itemCount } = arr.reduce(
        (acc, obj, index, array) => {
          const { found, popularity } = obj;

          if (found) {
            acc.totalPopularity += popularity;
            acc.itemCount++;
          }

          return acc;
        },
        { totalPopularity: 0, itemCount: 0 }
      );

      return totalPopularity / itemCount;
    }

    // console.log(average5(victorianSlang)); // 316.3333333333333
  })();
})();
