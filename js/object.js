'use strict';

/*
TODO ЗАДАЧИ:
  * 1) Массив уникальных объектов (удаления дубликатов)
  * 2) Проверка на существование свойств в объекте
  * 3) Из двух массивов собрать, один массив объектов
  * 4) Вывести односвязный СПИСОК
  * 5) Развернуть односвязный список
  * 6) Функция для получения целевого значение во вложенном объекте
  * 7) Выборка по комментариям пользователей
  * 8) Составить фразу: Ключи это буквы, свойства в массиве index этих букв
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
    console.log('%c 1) МАССИВ УНИКАЛЬНЫХ ОБЪЕКТОВ (УДАЛЕНИЯ ДУБЛИКАТОВ)', consoleLogStyles);

    const books = [
      {
        name: 'My Sister',
        author: 'Oyinkan Brait',
      },
      {
        name: 'Educated',
        author: 'Tara Westover',
      },
      {
        name: 'My Sister',
        author: 'Oyinkan Brait',
      },
    ];

    // # Получение свойства без дубликатов
    const noDuplicates = (booksDuplicate, name) => {
      return [...new Set(booksDuplicate.map(book => book[name]))];
    };

    console.log(noDuplicates(books, 'name')); //  [ 'My Sister', 'Educated' ]

    // # Удаления дубликатов JSON
    const filteredBooks = [...new Set(books.map(book => JSON.stringify(book)))].map(book =>
      JSON.parse(book)
    );

    // # Второй способ удаления дубликатов

    /*
      При первой итерации, так как внутри newBooks, нету никакого объекта, в него помещается
      через .concat(bookA) - первый объект.
      На второй итерации у массива newBooks вызывается метод filter
      у помещенного первого объекта newBooks берутся ключи Object.keys(bookB)
      и через функцию every(key) сравнивается каждое свойства bookA[key] !== bookB[key]
      у объекта(ов) который лежат уже в newBooks (bookB), и те которые были изначально переданы bookA
      если полученные значения не равны, то этот объект помещается внутрь newBooks

      Если внутри метода every bookA[key] !== bookB[key] = например при сравнении какого-либо свойства выпадет false
      то следующее свойство author не сравнивается, оно дает false и внутрь filter попадает false
    */
    const filteredBooks2 = booksDuplicate =>
      booksDuplicate.reduce(
        (newBooks, bookA) =>
          newBooks
            .filter(bookB => Object.keys(bookB).every(key => bookA[key] !== bookB[key]))
            .concat(bookA), // Добавляю в массив newBooks
        []
      );

    console.log(filteredBooks2(books));
    // [ { name: 'Educated', author: 'Tara Westover' }, { name: 'My Sister', author: 'Oyinkan Braithwaite' } ]

    // # Третий способ удаления дубликатов, через струтру данных Set
    const filteredBooks3 = booksList => {
      const keys = new Set();
      return booksList.filter(book => {
        const cols = Object.keys(book).sort(); // ! Можно без sort
        // cols : [ 'author', 'name' ]  [ 'author', 'name' ] [ 'author', 'name' ]
        const key = cols.map(field => book[field]).join(` `);
        // key - превращаю все ключи и свойства в строки
        const has = keys.has(key);
        // проверяю есть ли он в SET
        // has : false false true
        if (!has) keys.add(key);
        // Если нет добавляю в SET
        return !has;
      });
    };
    // console.log(filteredBooks3(books))
    //  [ { name: 'My Sister', author: 'Oyinkan Braithwaite' },  { name: 'Educated', author: 'Tara Westover' } ]

    // # Четвертый способ через структуру данных Map
    // ! Map поддерживает уникальность ключа
    const filteredBooks4 = booksList =>
      Array.from(new Map([...booksList.map(book => [book.name, book.author])])).map(
        ([name, author]) => ({
          name,
          author,
        })
      );

    // filteredBooks4(books) //  [ { name: 'My Sister', author: 'Oyinkan Brait' }, { name: 'Educated', author: 'Tara Westover' } ]

    // # Пятый способ удаления дубликатов
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
  })();

  // !2
  (function() {
    console.log('%c 2) ПРОВЕРКА НА СУЩЕСТВОВАНИЕ СВОЙСТВ В ОБЪЕКТЕ', consoleLogStyles);

    // * Проверка на существование свойств в объекте

    const hero = {
      name: 'Batman',
      isVillian: false,
    };

    /*
      Функция принимает три параметра
      object
      propertyName - название свойства которое ищу
      defaultValue - значение которое будет возвращать,
      если свойства которое ищу нету
    */

    // ! Плохо
    function getProp(object, propertyName, defaultValue) {
      if (!object[propertyName]) {
        return defaultValue;
      }
      return object[propertyName];
    }

    // # Еcли свойства есть и ее ключ не boolean, то все ок
    // getProp(hero, 'name', 'Unknown') // Batman
    // # НО все плохо есть ключ false
    // getProp(hero, 'isVillian', true)) // true - хотя свойства существует

    // ! Хорошо
    function getProp2(object, propertyName, defaultValue) {
      if (!(propertyName in object)) {
        return defaultValue;
      }
      return object[propertyName];
    }

    // # Использовать in при проверки
    // getProp2(hero, 'isVillian', true) // false

    // ! Хорошо 2 (Укороченный вариант)
    function getPropFixed(object, propertyName, defaultValue) {
      return propertyName in object ? object[propertyName] : defaultValue;
    }
    console.log(getPropFixed(hero, 'isVillian', true));
  })();

  // !3
  (function() {
    console.log('%c 3) ИЗ ДВУХ МАССИВОВ СОБРАТЬ, ОДИН МАССИВ ОБЪЕКТОВ', consoleLogStyles);

    /*
      Создайте функцию getData.
      У неё должно быть два параметра.
      Первый параметр — массив с ключами.
      Второй — массив с массивами данных.

      Каждому элементу из массива ключей подходит элемент с таким же индексом в массиве значений.
      Есть один нюанс: значений может оказаться больше или меньше, чем ключей.
      Если значений не хватает, то создавать пустой ключ не надо.
      А если значений больше, то их не нужно включать в объект — для них нет ключей.
    */

    // Массив ключей
    const arrKeys = ['имя', 'любимый цвет', 'любимое блюдо', 'любимая игрушка'];

    // Массив значений
    const arrValues = [
      ['Василий', 'красный', 'борщ', 'машинка'],
      ['Мария', 'голубой'],
      ['Иннокентий', 'жёлтый', 'пельмени', '18', 'Азовское'],
    ];

    function getData(keys, values) {
      return values.reduce((acc, value) => {
        // Собираемый объект
        const obj = {};

        keys.forEach((key, indexKeys) => {
          // Если в массиве values, больше или меньше элементов, чем в keys
          // Тогда в объект ничего не добавляется.
          if (value[indexKeys] !== undefined) {
            obj[key] = value[indexKeys];
          }
        });

        acc.push(obj);

        return acc;
      }, []);
    }

    console.log(
      `Из массива ключей ${arrKeys}
    массива значений ${arrValues}S
    собран новый массив объектов: `,
      getData(arrKeys, arrValues)
    );

    /*
    [
      {
        'имя': 'Василий',
        'любимый цвет': 'красный',
        'любимое блюдо': 'борщ',
        'любимая игрушка': 'машинка'
      },
      {
        'имя': 'Мария',
        'любимый цвет': 'голубой'
      },
       {
        'имя': 'Иннокентий',
        'любимый цвет': 'жёлтый',
        'любимое блюдо': 'пельмени',
        'любимая игрушка': '18'
      }
    ]
  */
  })();

  // ! 4
  (function() {
    console.log('%c 4) ВЫВЕСТИ ОДНОСВЯЗНЫЙ СПИСОК', consoleLogStyles);

    /*
        Напишите функцию printList(list)
     * Задачи:
     * 1.Выводит элементы списка по очереди, при помощи цикла.
     * 2.Выводит элементы списка в обратном порядке, при помощи цикла.
     * 3.Выводит элементы списка по очереди, при помощи рекурсии.
     * 4.Выводит элементы списка в обратном порядке, при помощи рекурсии.
        Для списка выше 5.она должна выводить 4,3,2,1
     */

    const list = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null,
          },
        },
      },
    };

    // # Задача 1 (выводит элементы списка по очереди, при помощи цикла)
    const printList = list => {
      // Массив элементов списка по очереди
      const arr = [];

      let tmp = list;
      while (tmp) {
        arr.push(tmp.value);
        tmp = tmp.next;
      }
      return arr;
    };
    console.log(`При помощи цикла`, printList(list)); //  [ 1, 2, 3, 4 ]

    // # Задача 2 (в обратном порядке) Циклом
    const printReverseList2 = list => {
      const arr = [];
      // const arrReverse = [];
      let tmp = list;

      while (tmp) {
        arr.push(tmp.value);
        tmp = tmp.next;
      }

      return arr.reverse();
    };
    console.log(`При помощи цикла (в обратном порядке)`, printReverseList2(list)); //  [ 4, 3, 2, 1 ]

    // # Задача 3 Рекурсивный вариант
    const arr = [];
    const printList2 = list => {
      arr.push(list.value);

      if (list.next) {
        printList2(list.next);
      }

      return arr;
    };
    console.log(`Рекурсивный вариант`, printList2(list)); //  [ 1, 2, 3, 4 ]

    // # Задача 4 (в обратном порядке) Рекурсивный вариант
    const arr2 = [];
    const printReverseList = list => {
      if (list.next) {
        printReverseList(list.next);
      }
      arr2.push(list.value);

      return arr2;
    };
    console.log(`Рекурсивный вариант (в обратном порядке)`, printReverseList(list));
    // [ 4, 3, 2, 1 ]
  })();

  // !5
  (function() {
    console.log('%c 5) РАЗВЕРНУТЬ ОДНОСВЯЗНЫЙ СПИСОК', consoleLogStyles);
    const list = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null,
          },
        },
      },
    };

    function revertList(list) {
      let tmp = list;
      let myList = null;

      while (tmp) {
        myList = { value: tmp.value, next: myList };
        tmp = tmp.next;
      }

      return myList;
    }

    console.log('Развернутый односвязный список', revertList(list));
  })();

  // !6
  (function() {
    console.log('%c 6) ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ЦЕЛЕВОГО ЗНАЧЕНИЕ ВО ВЛОЖЕННОМ ОБЪЕКТЕ', consoleLogStyles);

    // !Как вернуть целевое значение во вложенном объекте JSON на основе заданного ключа.

    const data = {
      level1: {
        level2: {
          level3: 'some data',
        },
      },
    };

    const dig = (obj, target) =>
      target in obj
        ? obj[target]
        : Object.values(obj).reduce((acc, val) => {
            if (acc !== undefined) return acc;
            if (typeof val === 'object') return dig(val, target);
          }, undefined);

    console.log('Целевое значение во вложенном объекте', dig(data, 'level3'));
  })();

  // !7
  (function() {
    console.log('%c 7) ВЫБОРКА ПО КОММЕНТАРИЯМ ПОЛЬЗОВАТЕЛЕЙ', consoleLogStyles);

    const comments = [
      {
        id: `#com1`,
        author: { id: `aut1`, name: `John Doe` },
        text: `Cool!`,
        postId: `#post1`,
      },
      {
        id: `#com2`,
        author: { id: `aut1`, name: `John Doe` },
        text: `Cool!`,
        postId: `#post2`,
      },
      {
        id: `#com3`,
        author: { id: `aut2`, name: `Anthony Hopkins` },
        text: `Nice comment, John! :)`,
        postId: `#post1`,
      },
      {
        id: `#com4`,
        author: { id: `aut1`, name: `John Doe` },
        text: `Thanks!`,
        postId: `#post1`,
      },
    ];

    // # Выборка всех сообщений `#post1`
    const getTextCOmments = arr =>
      arr.filter(comment => comment.postId === `#post1`).map(comment => comment.text);

    console.log(`Выборка всех сообщений #post1$`, getTextCOmments(comments));
    //  [ 'Cool!', 'Nice comment, John! :)', 'Thanks!' ]

    // # Выборка только разных авторов, без повторений + Найти имена Авторов
    const getAutorIdCommnets = arr =>
      arr
        .map(comment => comment.author)
        .filter(
          (author, index, currentList) => currentList.findIndex(item => item.id === author.id) === index
          //  [ { id: 'aut1', name: 'John Doe' }, { id: 'aut2', name: 'Anthony Hopkins' } ]
        )
        .map(author => author.name);

    console.log(
      `Выборка только разных авторов, без повторений + Найти имена Авторов`,
      getAutorIdCommnets(comments)
    );
    //  [ { id: 'aut1', name: 'John Doe' }, { id: 'aut2', name: 'Anthony Hopkins' } ]

    // # Сколько всего было оставлено комментарий Авторами
    const getCounterComments = arr =>
      arr.reduce((acc, item) => {
        return { ...acc, [item.author.id]: (acc[item.author.id] || 0) + 1 };
      }, {});

    console.log(`Сколько всего было оставлено комментарий Авторами`, getCounterComments(comments));
    // { aut1: 3, aut2: 1 }
  })();

  // ! 8
  (function() {
    console.log(
      '%c 8) Составить фразу: Ключи это буквы, свойства в массиве index этих букв',
      consoleLogStyles
    );

    const input = {
      ' ': [5],
      d: [10],
      e: [1],
      H: [0],
      l: [2, 3, 9],
      o: [4, 7],
      r: [8],
      w: [6],
    };

    const buildString = m => {
      if (!m) return '';

      return Object.entries(m)
        .reduce((res, [letter, indexLetter]) => {
          indexLetter.forEach(number => (res[number] = letter));

          return res;
        }, [])
        .join('');
    };

    console.log(
      'Hello world' === buildString(input) && 'First Case',
      '' === buildString() && 'Second Case'
    );
  })();
})();
