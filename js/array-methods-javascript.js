'use strict';

// https://learn.javascript.ru/array-methods#perevesti-tekst-vida-border-left-width-v-borderleftwidth

/*
TODO ЗАДАЧИ:

* 1) Добавить класс в строку, но только если его там еще нет
* 2) Удалять класс в строке, но только если он там есть
* 3) Перевести текст вида border-left-width в borderLeftWidth
* 4) Фильтрация по диапазону
* 5) Являются ли строки Анограммами
* 6) Отфильтровать Анаграммы
* 7) Сгруппировать анаграммы Анаграммы
* 8) Оставить уникальные элементы массива
* 9) Найти повторяющийся элементы в массиве и полностью их удалить
* 10) В массиве парных положительных чисел найти непарное число

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
    console.log('%c 1) ДОБАВИТЬ КЛАСС В СТРОКУ, НО ТОЛЬКО ЕСЛИ ЕГО ТАМ ЕЩЕ НЕТ', consoleLogStyles);
    // Задача Добавить класс в строку, но только если его там еще нет

    /*
    В объекте есть свойство className,
    которое содержит список «классов» – слов, разделенных пробелом:
    Создайте функцию addClass(obj, cls), которая добавляет в список класс cls,
    но только если его там еще нет:
    P.S. Функция не должна добавлять лишних пробелов.

  */

    // # Решение learn.javascript.ru
    let objclass = {
      className: 'open menu',
    };

    function addClass(obj, cls) {
      let classes = obj.className ? obj.className.split(' ') : [];

      for (let i = 0; i < classes.length; i++) {
        if (classes[i] === cls) return; // класс уже есть
      }

      classes.push(cls); // добавить

      obj.className = classes.join(' '); // и обновить свойство
    }

    addClass(objclass, 'new');
    addClass(objclass, 'open');
    addClass(objclass, 'me');
    // console.log(objclass) // { className: 'open menu new me' }

    // # Решение через методы массивов и объектов
    let objclass2 = {
      // className: ''
      className: 'open',
    };

    const addClass2 = (obj, cls) => {
      // Превращаем значение объекта в массив
      // НО Если у объекта такого значения(ключа) не существует
      // Добавляем пустой массив
      let classes = obj.className ? obj.className.split(' ') : [];

      // Проверяем свойства которые мы хоти добавить в этом массиве
      // Если true - значит свойства есть, если нет добавляем
      // classes.includes(cls) ? classes : classes.push(cls) - ошибка eslint на тернарный

      if (!classes.includes(cls)) {
        classes.push(cls);
      }

      // Добавляем это свойства + удаляем лишении пробелы с начала и конца
      // Если например в значения ключа className? начинается с пробела или заканчивается пробелом
      obj.className = classes.join(' ').trim();
    };

    addClass2(objclass2, 'new');
    addClass2(objclass2, 'open');
    addClass2(objclass2, 'me');
    addClass2(objclass2, 'me');
    console.log(objclass2); //  { className: 'open new me' }

    // # Решение через регулярное выражение
    let objclass3 = {
      className: '',
    };

    // Если изначально obj.className = ""?, то при решении obj[key] += ' ' + cls
    // добавляется лишний пробел Можно исправить дополнительным условием obj[key].length === 0
    // Но если в объекте вообще отсутствует такой ключ, будет ошибка
    const addClass3 = (obj, cls) => {
      // Проверяю если такого свойства в объекте нету, то создаю пустую строку
      let classes = obj.className || '';
      let rexExp = new RegExp(`${cls}\\b`, 'gi');

      if (!rexExp.test(classes) && classes.length !== 0) {
        obj.className += ' ' + cls;
      } else if (classes.length === 0) {
        obj.className = cls;
      }

      // return objclass3 // нужен возврат console.log
    };

    addClass3(objclass3, 'new');
    addClass3(objclass3, 'new');
    addClass3(objclass3, 'open');
    addClass3(objclass3, 'te');
    // console.log(objclass3) // { className: 'new open te' }
  })();

  // ! 2
  (function() {
    console.log('%c 2) УДАЛЯТЬ КЛАСС В СТРОКЕ, НО ТОЛЬКО ЕСЛИ ОН ТАМ ЕСТЬ', consoleLogStyles);
    /* Задача
      Написать функцию removeClass(obj, cls), которая удаляет класс cls, если он есть:
      Функция должна корректно обрабатывать дублирование класса в строке
      Лишних пробелов после функции образовываться не должно.
    */

    // # Решение через filter
    let objclass = {
      className: 'open menu menu',
    };

    const removeClass = (object, cls) => {
      let classes = object.className ? object.className.split(' ') : [];
      return (object.className = classes
        .filter(item => item !== cls)
        .join(' ')
        .trim());
    };

    removeClass(objclass, 'open');
    // console.log(objclass); //  { className: 'menu menu' }

    // # Решение через reduce
    let objclass2 = {
      className: 'open menu menu',
    };

    const removeClass2 = (object, cls) => {
      let classes = object.className ? object.className.split(' ') : [];

      return classes.reduce((newClass, item, index) => {
        if (!item.includes(cls)) {
          newClass += ' ' + item;
        }
        return (object.className = newClass.trim());
      }, '');
    };

    removeClass2(objclass2, 'open');
    // console.log(objclass2); //  { className: 'menu menu' }

    // # Решение через регулярное выражения, метод test у RegExp + replace у строк
    let objclass3 = {
      className: 'menu new new new open open te',
      // className: "open menu now"
    };

    // Остается пробел если 'menu ' если слово стоит первым и его не перезаписывают
    // Если удалать через RegExp, тогда при в других случаях
    // Возможно не корректная работа, можно исправить через метод у строк trim()
    const removeClass3 = (obj, cls) => {
      let rexExp = new RegExp(`${cls}\\s?\\b`, 'gi');

      if (rexExp.test(obj.className)) {
        obj.className = obj.className.replace(rexExp, '');
      }
    };

    removeClass3(objclass3, 'new');
    removeClass3(objclass3, 'open');
    removeClass3(objclass3, 'te');
    // 	console.log(objclass3); // { className: 'menu ' }

    // # Решение через Цикл (Обратный) и метод splice
    let objclass4 = {
      className: 'open menu menu',
    };

    const removeClass4 = (obj, cls) => {
      /*
        Элементы массива проверяются один за другим. При вызове splice удаляется текущий, i-й элемент, и те элементы, которые идут дальше, сдвигаются на его место.
        Таким образом, на месте i оказывается новый, непроверенный элемент.
        Эту проблему можно решить через обратный цикл
      */

      let classes = obj.className.split(' ');

      for (let i = classes.length; i--; ) {
        if (classes[i] === cls) {
          classes.splice(i, 1);
        }
      }
      obj.className = classes.join(' ');
    };

    removeClass4(objclass4, 'menu');
    console.log(objclass4); // { className: 'open' }
  })();

  // ! 3
  (function() {
    console.log('%c 3) ПЕРЕВЕСТИ ТЕКСТ ВИДА BORDER-LEFT-WIDTH В BORDERLEFTWIDTH', consoleLogStyles);

    /* Задача
      Напишите функцию camelize(str), которая преобразует строки вида «my-short-string» в «myShortString».
      То есть, дефисы удаляются, а все слова после них получают заглавную букву.

      ("background-color") == 'backgroundColor';
      ("list-style-image") == 'listStyleImage';
      ("-webkit-transition") == 'WebkitTransition';
    */

    // # Решение через цикл
    const camelize = str => {
      let arr = str.split('-');

      for (let i = 1; i < arr.length; i++) {
        // i = 1 - потому чтобы, не начинать менять букву у первого слова
        // преобразовать: первый символ с большой буквы
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }

      return arr.join('');
    };
    // console.log(camelize('list-style-image')); // listStyleImage
    // console.log(camelize('-webkit-transition')); // WebkitTransition

    // # Решение через Reduce
    const getCamelCase = str => {
      // Если (-) стоит в начале, на его месте получается пустая строка
      let arr = str.split('-');

      return arr.reduce((newString, item, index) => {
        // Проверяем на пустую строку + если чтобы индекс не был 0,
        // Если в начале нет (-), то чтобы слово первое не преобразовало с Заглавной
        if (item !== '' && index !== 0) {
          // в строку записываем слово с первой заглавной буквы
          // И скопированную остальную часть, кроме первой буквы
          newString += item.charAt(0).toUpperCase() + item.slice(1);
        } else {
          // У первого слова не меняем первую буквы на заглавную
          newString += item;
        }

        return newString;
      }, '');
    };
    // console.log(getCamelCase('list-style-image')); // listStyleImage
    // console.log(getCamelCase('-webkit-transition')); // WebkitTransition

    // # Решение через Reduce + тернарный оператор
    function getCamelCase2(str) {
      return str
        .split('-')
        .reduce(
          (newString, item, index) =>
            item !== '' && index ? newString + item[0].toUpperCase() + item.slice(1) : newString + item,
          ''
        );
    }
    // console.log(getCamelCase2('list-style-image')); // listStyleImage
    // console.log(getCamelCase2('-webkit-transition')); // WebkitTransition

    // # Решение через Map
    const getCamelCase3 = str => {
      /*
        Преобразуем строку в массив
        В Map: Если index = 0 ~ false - тогда item = ''
        Или первое слово у которого буква менять не должна
        Потом через join('') преобразуем обратно в строку + убираем пустую строку
        Если где-нибудь будет --, то будет ошибка
        Она возникает из-за того чтобы -- и более тире
        При преобразовании методом split тире становятся пустыми строками
        На их наличие необходимо проверять  !== ''
        В момент преобразования массива в строку через join() пустые строки пропадают
    */

      return str
        .split('-')
        .map((item, index) => (index ? item[0].toUpperCase() + item.slice(1) : item))
        .join('');
    };
    console.log(getCamelCase3('list-style-image')); // listStyleImage
    console.log(getCamelCase3('-webkit-transition')); // WebkitTransition

    // # Решение For...Of и разделения массива по буквенно + ставка
    // Будет работать некорректно при --
    const camelize2 = str => {
      // Разделяем стоку на массив букв
      let arr = str.split('');

      for (let [index, letter] of arr.entries()) {
        // Проверяем если буква равна -, то тогда находим индекс
        // И через метод splice удаляем - и последующую букву, на букву с заглавной
        if (letter === '-') {
          index;
          arr.splice(index, 2, arr[index + 1].toUpperCase());
        }
      }
      return arr.join('');
    };
    // console.log(camelize2('list-style-image')); // listStyleImage
    // console.log(camelize2('-webkit-transition')); // WebkitTransition
    // console.log(camelize2("-background-color")); // WebkitTransition
  })();

  // ! 4
  (function() {
    console.log('%c 4) ФИЛЬТРАЦИЯ ПО ДИАПАЗОНУ', consoleLogStyles);

    /*
      * Из массива чисел, удалить все числа не входящие в диапазон

      Создайте функцию filterRangeInPlace(arr, a, b),
      которая получает массив с числами arr и удаляет из него все числа
      вне диапазона a..b.
      То есть, проверка имеет вид a ≤ arr[i] ≤ b.
      Функция должна менять сам массив и ничего не возвращать.
      ! Важно: если необходимо менять основной массив, то необходим обратный цикл (reduceRight)
    */

    let arr = [5, 3, 8, 1, 0, 5, 25, 5, 6, 7, 8, 9];

    // # Обратный цикл For
    const filterRangeInPlace = (array, from, to) => {
      // Использую обратный цикл так как при перезаписывании массива по ссылки
      // происходит смещения элементов массива и i
      // Удаляю элементы которые или меньше или больше диапазона
      for (let i = array.length; i--; ) {
        if (array[i] < from || array[i] > to) {
          array.splice(i, 1);
        }
      }
    };

    filterRangeInPlace(arr, 1, 4);
    // console.log(arr); [ 3, 1 ]

    // # ReduceRight с Изменением основного массива
    let arr2 = [5, 3, 8, 1, 0, 5, 25, 5, 6, 7, 8, 9];

    const filterRangeInPlace2 = (array, from, to) => {
      return array.reduceRight((sum, item, i) => {
        return item < from || item > to ? array.splice(i, 1) : null;
      }, array);
    };

    filterRangeInPlace2(arr2, 1, 4);
    // console.log(arr2); // [ 3, 1 ];

    // # Reduce - Не изменяя массив
    let arr3 = [5, 3, 8, 1, 0, 5, 25, 5, 6, 7, 8, 9];

    const filterRangeInPlace3 = (array, from, to) => {
      return array.reduce((acc, item) => {
        !(item < from || item > to) ? acc.push(item) : null;
        // if (!(item < from || item > to)) {
        //   acc.push(item)
        // }
        return acc;
      }, []);
    };

    console.log(
      `Все числа не входящие в дипазон от 1, до 4 в массиве ${arr3}`,
      filterRangeInPlace3(arr3, 1, 4)
    ); // [ 3, 1 ]
  })();

  // ! 5
  (function() {
    console.log('%c 5) ЯВЛЯЮТСЯ ЛИ СТРОКИ АНОГРАММАМИ', consoleLogStyles);

    /*
      ! Проверить являются ли строки анаграммами

      Анаграмма — это игра со словами, когда в результате перестановки букв
      слова или фразы получаем другое слово или фразу.
      Два слова являются анаграммами, если мы можем
      получить одно из другого переставляя буквы местами.

    */

    // # Способ № 1 решить через Sort
    const myOne = ' Меня зовут Сергей Сергеевич Козлов 1994';
    const myTwo = 'взоокл Сергеевич йегрес зовут меня 4199';

    /*
      Функция sort удаляет все пробелы из строки
      Приравнивает все к нижнему регистру
      Разбивает всю строку на массив букв
      Сортируют этот массив по юникоду букв

        Если строки являются анаграммами, то они состоят из одинаковых символов,
        расположенных в разном порядке.
        Сортировка двух строк должна упорядочить символы.
        Теперь остается только сравнить две отсортированные версии строк.

      Выстраивает строки их полученного отсортированного массива

      Этот метод медленный!
    */

    const sort = string => {
      return string
        .replace(/\s+/g, '')
        .toLowerCase()
        .split('')
        .sort()
        .join('');
    };

    /*
      Основная функция провреки строк на Анаграмму
      Функция принимает две строки
      Первым делом сравнивая их на полное совпадение, удаляет пробелы с двух сторон
      Если строки не равны друг другу, вызывает функция sort, которая преобразует строки и сравнивает их
    */

    const isAnagram = (stringOne, stringTwo) => {
      return stringOne.trim() === stringTwo.trim()
        ? 'Ошибка строки равны'
        : sort(stringOne) === sort(stringTwo);
    };

    console.log(`
      Строки являются Анограммами ?
      1) ${myOne}
      2) ${myTwo}
      ${isAnagram(myOne, myTwo)}`); // true

    // # Способ №2 Учитывает русский и английский алфавит
    // Через регулярное выражения удаляет любые знаки и цифры
    const isAnagram2 = (str1, str2) => {
      const normalize = str =>
        str
          .toLowerCase()
          .replace(/[^а-я-a-z]/gi, '') // MyзовутСергейСергеевичКозлов
          .split('')
          .sort()
          .join('');
      return normalize(str1) === normalize(str2);
    };

    // console.log(`Строки Анограммы? : ${isAnagram2(myOne, myTwo)}`); // true

    // # №3 Решения через структуру данных MAP
    function areAnagrams(str1, str2) {
      const charCount = new Map();

      for (const letter of str1.split('')) {
        // Устанавливаю ключ в виде буквы, а значение в виде цифры
        charCount.set(letter, (charCount.get(letter) || 0) + 1);
      }
      // charCount Map { 'h' => 1, 'e' => 1, 'l' => 2, 'o' => 1 }

      for (const letter of str2.split('')) {
        // Если буквы из второй строки нету внутри первой
        if (!charCount.has(letter)) {
          return false;
        }
        // Удаляю значение по ключу (буквы)
        charCount.set(letter, charCount.get(letter) - 1);
      }
      //  charCount Map { 'h' => 0, 'e' => 0, 'l' => 0, 'o' => 0 }

      // Если каждый ключ равен 0, тогда Аннаграмма
      return Array.from(charCount.values()).every(v => v === 0);
    }

    // console.log(areAnagrams("hello", 'olleh')) // true

    // # №4 Решения через Object
    function buildCharObject(str) {
      const charObj = {};
      const clean = str.toLowerCase().replace(/[^a-z-а-я]/, '');

      for (const char of clean) {
        charObj[char] = (charObj[char] || 0) + 1;
      }

      return charObj;
    }

    function anagram(strA, strB) {
      const aCharObj = buildCharObject(strA);
      const bCharObj = buildCharObject(strB);

      console.log(Object.keys(aCharObj));

      if (Object.keys(aCharObj).length !== Object.keys(bCharObj).length) {
        return false;
      }

      for (const char in aCharObj) {
        if (aCharObj[char] !== bCharObj[char]) {
          return false;
        }
      }

      return true;
    }

    // console.log(anagram("hello world", "world hello"));
  })();

  // ! 6
  (function() {
    console.log('%c 6) ОТФИЛЬТРОВАТЬ АНАГРАММЫ', consoleLogStyles);
    // https://learn.javascript.ru/task/filter-anagrams

    const arrAnagram = ['воз', 'киборг', 'корсет', 'ЗОВ', 'гробик', 'костер', 'сектор'];

    // # Решение learn.javascript
    function aclean(arr) {
      // этот объект будем использовать для уникальности
      let obj = {};

      for (let i = 0; i < arr.length; i++) {
        // разбить строку на буквы, отсортировать и слить обратно
        let sorted = arr[i]
          .toLowerCase()
          .split('')
          .sort()
          .join(''); // (*)

        obj[sorted] = arr[i]; // сохраняет только одно значение с таким ключом
      }
      let result = [];

      // теперь в obj находится для каждого ключа ровно одно значение
      // eslint-disable-next-line guard-for-in
      for (let key in obj) {
        result.push(obj[key]);
      }

      return result;
    }

    aclean(arrAnagram); // [ 'ЗОВ', 'гробик', 'сектор' ]

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

  // ! 7
  (function() {
    console.log('%c 6) СГРУППИРОВАТЬ АНАГРАММЫ АНАГРАММЫ', consoleLogStyles);

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

    // # Через Object
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

      // ! ЕСЛИ НУЖНА ГРУППИРОВКА ЭЛЕМЕНТОВ
      // return Object.keys(map).reduce((acc, key) => {
      //   return map[key].length > 1 ? acc.concat([map[key]]) : acc;
      // }, []);

      //  [ [ 'воз', 'ЗОВ' ],[ 'киборг', 'гробик' ],[ 'корсет', 'костер', 'сектор' ] ]
    };

    console.log(aclean3(arrAnagram));

    // # Через структуру данных MAP
    function anagramsGroup(arr) {
      // Очищаю строку от знаков кроме букв, привожу к нижнему регистру и сортирую
      const sort = str =>
        str
          .toLowerCase()
          .replace(/[^a-z-а-я]/g, '')
          .split('')
          .sort()
          .join('');

      // структура данных для хранения массивов с анаграммами
      const map = new Map();

      arr.forEach(item => {
        // Имя ключа в map
        const itemSorted = sort(item);

        // Если ключа нет
        if (!map.has(itemSorted)) {
          // Записываю его по ключу в массив с одним элементом
          map.set(itemSorted, [item]);
        } else {
          // Если по ключи есть еще один элемент добавляю его в массив
          map.get(itemSorted).push(item);
        }
      });

      // Преобразовываю Map c ключами в виде массивов в новый основной массив
      // Фильтрую больше одно для того, чтобы выбрать только те элементы у которых есть анаграммы
      return Array.from(map.values()).filter(item => item.length > 1);
    }

    console.log(anagramsGroup(['стол', 'барокко', 'слот', 'кот', 'кошка', 'ток', 'коробка']));
  })();

  // ! 8
  (function() {
    console.log('%c 8) ОСТАВИТЬ УНИКАЛЬНЫЕ ЭЛЕМЕНТЫ МАССИВА', consoleLogStyles);

    const strings = ['кришна', 'кришна', 'харе', 'харе', 'харе', 'харе', 'кришна', 'кришна', '8-()'];

    // * FILTER
    const unique = arr => arr.filter((item, index, array) => array.indexOf(item) === index);
    console.log(unique(strings)); //  [ 'кришна', 'харе', '8-()' ]

    // * REDUCE
    const unique2 = arr =>
      arr.reduce((newArr, word) => (newArr.includes(word) ? newArr : [...newArr, word]), []); //  [ 'кришна', 'харе', '8-()' ]

    // * SET
    const unique3 = [...new Set(strings)]; //  [ 'кришна', 'харе', '8-()' ]
  })();

  // ! 9
  (function() {
    console.log('%c 9) НАЙТИ ПОВТОРЯЮЩИЙСЯ ЭЛЕМЕНТЫ В МАССИВЕ И ПОЛНОСТЬЮ ИХ УДАЛИТЬ', consoleLogStyles);

    // Полное удаление повторяющихся элементов из массива
    const arr = [1, 3, 4, 5, 6, 4];

    // # 1) Сравниваю индексы
    const filtered = arr.filter((el, i, array) => {
      const firstIndex = array.indexOf(el); //  0 1 2 3 4 2
      const lastIndex = array.lastIndexOf(el); //  0 1 5 3 4 5

      return firstIndex === lastIndex;
    });

    console.log(`Сравниваю индексы indexOf и lastIndexOf`, filtered);

    // # 2) Получаю через деструктуризацию получаю длину массива
    const filtered2 = arr.filter(item => {
      const { length } = arr.filter(currentItem => currentItem === item);
      if (length === 1) {
        return true;
      }

      return false;
    });
    console.log(`Через деструктуризацию длины`, filtered2); // [ 1, 3, 5, 6 ]

    // # 3) Считаю колличесвто повторяющих чисел через объект
    const filtered3 = arr.reduce((result, item) => {
      result[item] = (result[item] || 0) + 1;
      return result;
    }, {}); // { 1: 1, 3: 1, 4: 2, 5: 1, 6: 1 }

    // # 3.1) Фильтрую по объекту filtered4 у которого ключи небольше 1
    const unique = arr.filter(elem => {
      return !filtered3[elem] || filtered3[elem] <= 1;
    });

    console.log(`Через объект`, unique); // [ 1, 3, 5, 6 ]

    // # 4) Решение через структуру данных Map
    // Установить значение false, если ключ был замечен ранее.
    // Если в map по ключу: цифры нет тогда true, если ключ есть тогда false
    // Затем отфильтруйте массив, взяв значение из Map, ключом будет цифра из массива
    // Фильтрую по значению true из Map

    /*
      Map { 1 => true }
      Map { 1 => true, 3 => true }
      Map { 1 => true, 3 => true, 4 => true }
      Map { 1 => true, 3 => true, 4 => true, 5 => true }
      Map { 1 => true, 3 => true, 4 => true, 5 => true, 6 => true }
      Map { 1 => true, 3 => true, 4 => false, 5 => true, 6 => true }
    */

    const filtered4 = array =>
      array.filter(item => {
        const map = array.reduce((acc, digital) => acc.set(digital, !acc.has(digital)), new Map());
        return map.get(item);
      });

    console.log(`Через Map`, filtered4([1, 3, 4, 5, 6, 4, 4]));
    //  [ 1, 3, 5, 6 ]
  })();

  // ! 10
  (function() {
    console.log('%c 11) В МАССИВЕ ПАРНЫХ ПОЛОЖИТЕЛЬНЫХ ЧИСЕЛ НАЙТИ НЕПАРНОЕ ЧИСЛО', consoleLogStyles);

    // # Решение через структуру данных Set
    function findWithPair(numbers) {
      const noPair = new Set();

      numbers.forEach(number => {
        if (!noPair.has(number)) {
          // Если нет цифры, добавляю
          noPair.add(number);
        } else {
          // Если есть удаляю
          noPair.delete(number);
        }
      });

      // В конце в Set остаются только непарные числа
      return [...noPair][0];
    }

    // console.log(findWithPair(pairs)); // 5
  })();
})();
