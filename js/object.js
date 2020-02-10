'use strict';

/*
TODO ЗАДАЧИ:
  * 1) Массив уникальных объектов (удаления дубликатов)
  * 2) Проверка на существование свойств в объекте
  * 3) Из двух массивов собрать, один массив объектов
  * 4)
  * 5)
  * 6)
  * 7)
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
})();
