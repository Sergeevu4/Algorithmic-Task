'use strict';

/*
  TODO ЗАДАЧИ:
  * 1) Object.prototype: Проверка является ли массив массивом
  * 2) Spread: Быстрый способ вывести значение массива - строкой
  * 3) FOR...OF: Вывести индекс элементов
  * 4) JOIN: Преобразование массива в строку
  * 5) SPLIT: Обратное преобразование из строки в массив
  * 6) JSON: Для возможности переиспользования массива
  * 7) Найти количество элементов, у которых конец строки совпадает с искомым значением
	* 8) Слово или текст с Заглавной буквы
	* 8) Сколько букв в слове
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
    console.log('%c 1) Object.prototype: Проверка является ли массив массивом', consoleLogStyles);

    const arrayNumber = [12, 2, 2, 2, 1, 2];
    console.log(Object.prototype.toString.call(arrayNumber));

    // --------------------------------------------------------------------------------------------------------

    // ! 2
    console.log('%c 2) Spread: Быстрый способ вывести значение массива - строкой', consoleLogStyles);

    const arrayNumber2 = [54, 23, 3, 2, 53, 1];
    console.log(...arrayNumber2);

    // --------------------------------------------------------------------------------------------------------

    // ! 3
    console.log('%c 3) FOR...OF: Вывести индекс элементов', consoleLogStyles);

    function loopForIndex() {
      for (let [index, elem2] of arrayNumber2.entries()) {
        console.log('Индекс', index, 'Значение', elem2);
      }
    }

    loopForIndex();

    // --------------------------------------------------------------------------------------------------------

    // ! 4
    console.log('%c 4) JOIN: Преобразование массива в строку', consoleLogStyles);

    const arrayNumberString = arrayNumber.join('+');
    console.log(arrayNumberString);

    // --------------------------------------------------------------------------------------------------------

    // ! 5
    console.log('%c 5) SPLIT: Обратное преобразование из строки в массив', consoleLogStyles);

    const backToArrayNumber = arrayNumberString.split('+');
    console.log(backToArrayNumber);

    // --------------------------------------------------------------------------------------------------------

    // ! 6
    console.log('%c 6) JSON: Для возможности переиспользования массива', consoleLogStyles);

    const arrayNumberJson = JSON.stringify(arrayNumber);
    console.log('JSON: Преобразует значение в строку ', arrayNumberJson);

    const backToArrayNumberJson = JSON.parse(arrayNumberJson);
    console.log('JSON: Возврат в массив переиспользования ', backToArrayNumberJson);
  })();

  // ! 7
  (function() {
    console.log(
      '%c 7) Найти количество элементов, у которых конец строки совпадает с искомым значением',
      consoleLogStyles
    );

    /* Задача необходимо найти нужные отчёты за год.
		Название каждого документа хранится в формате 03052012 (03 — день, 05 — месяц, 2012 — год).
		Нужно написать программу, которая сможет определить количество отчётов за необходимый год.
		*/

    // Массив с названиями документов
    const arrayYears = ['01112018', '20092017', '05102017', '12052018', '04072005', '02022018'];

    // Год, за который надо найти документы
    const searchYear = 2018;

    // Решение через includes у строк, если задать просто 4, то указывается с начало длины строку, item.length - 4 (с конца строки)
    const getDocumentsNumbers = (doc, year) => {
      let documentNumber = 0;
      doc.forEach((item) => {
        documentNumber += item.includes(year, item.length - 4) ? 1 : 0;
      });
      return documentNumber;
    };

    console.log(`Количество совпадений ${getDocumentsNumbers(arrayYears, searchYear)}`);

    // Решение через endsWith у строк, проверяет значение с конца длины строки.
    const getDocumentsNumbers2 = (doc, year) => {
      let counter = 0;
      for (let i = 0; i < doc.length; i++) {
        if (doc[i].endsWith(year)) {
          counter++;
        }
      }
      return counter;
    };

    // getDocumentsNumbers2(arrayYears, searchYear);

    // Интересное решение делением на 01112018 % 10000 = 2018
    const getDocumentsNumbers3 = function(array, year) {
      let k = 0;
      for (let i = 0; i < array.length; i++) {
        if (array[i] % 10000 === year) k++;
      }
      return k;
    };

    getDocumentsNumbers3(arrayYears, searchYear);
  })();

  // ! 8
  (function() {
    console.log('%c 8) Слово или текст с Заглавной буквы', consoleLogStyles);

    /* Задача
		Переданное слово, текст независимо от регистра, переделать в слово начинающее
		с Заглавной буквы и остальные прописные
		*/

    // Решение через строку.
    function capitalize2(word) {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }

    console.log(capitalize2('hello'));

    // Решение через строку 2.
    const titleCase = (str) => {
      const lower = str.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    console.log(titleCase('hello'));

    // Деструктуризация Массив
    function capitalize5([first, ...rest]) {
      return first.toUpperCase() + rest.join('').toLowerCase();
    }

    console.log(capitalize5('AWESOME'));

    // Через строку (Исправить первую и последнею букву)
    const textСapitalize = (string) => {
      return string[0].toUpperCase() + string.slice(1, -1) + string[string.length - 1].toLowerCase();
    };

    // console.log(textСapitalize('переданное слово остальные прописныЕ'));

    // Через Деструктуризация Массив (Исправить первую и последнею букву)
    const textСapitalize2 = ([firstLetter, ...restLetter]) => {
      return (
        firstLetter.toUpperCase() + restLetter.slice(1, -1).join('') + restLetter.pop().toLowerCase()
      );
    };

    // Полученные текст сделать с Заглавной буквы, остальные прописные
    const textСapitalize3 = ([firstLetter, ...restLetter]) => {
      return (
        firstLetter.toUpperCase() +
        restLetter
          .slice(1)
          .join('')
          .toLowerCase()
      );
    };

    console.log(textСapitalize3('Переданный ТЕКСТ Остальные прописныe'));
  })();

  // ! 9
  (function() {
    console.log('%c 9) Сколько букв в слове', consoleLogStyles);
    // Задача узнать сколько букв А в слове banana

    const array = ['banana', 'aana'];

    // Самый быстрый способ
    let letter = array[0].split('a').length - 1;

    console.log(`Количество букв А в слове ${letter}`);

    // Решение через Filter
    const mainStr = 'banana';
    const letterCounter = [...mainStr].filter((l) => l === 'a').length;

    // Решение через Reduce
    function countCharacters(letter, string) {
      return string.split('').reduce((acc, elem) => (elem === letter ? acc + 1 : acc), 0);
    }
  })();
})();
