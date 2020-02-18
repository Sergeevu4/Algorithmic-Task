'use strict';

/*
TODO ЗАДАЧИ:
  * 1) Геометрическая прогрессия
  * 2) Сумма чисел - последовательности
  * 3) Произведение четных чисел - последовательности
  * 4) Делитель числа, кроме единицы и самого числа
  * 5) Количество цифр в числе
  * 6) Количество протеина необходимо на период
  * 7) Палиндром
	* 8) Перевернуть строку задом на перед
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
    console.log('%c 1) ГЕОМЕТРИЧЕСКАЯ ПРОГРЕССИЯ', consoleLogStyles);

    // Стартовое значение, с которого должна начаться последовательность
    let startNumber = 3;

    // Множитель
    let multiplierNumber = 3;

    // Количество чисел
    let quantityNumber = 6;

    // Массив геометрической прогрессии
    let geometricProgression = [];
    // Произведение всех чётных чисел из последовательности

    // Геометрическая прогрессия
    function getGeometricProgression2(start, multiplier, quantity) {
      for (let i = 1; i <= quantity; i++) {
        // console.log(start);
        start *= multiplier;
      }
    }

    getGeometricProgression2(startNumber, multiplierNumber, quantityNumber);

    // Геометрическая прогрессия 2
    function getGeometricProgression(start, multiplier, quantity) {
      for (let i = 0; i < quantity; i++) {
        let progression = start;
        progression *= Math.pow(multiplier, i);
        geometricProgression.push(progression);
      }
    }

    getGeometricProgression(startNumber, multiplierNumber, quantityNumber);

    console.log('Массив геометрической прогрессии', geometricProgression);
  })();

  // ! 2
  (function() {
    // Нужно найти самый быстрый способ посчитать сумму чисел от 1 до lastNumber

    console.log('%c 2) СУММА ЧИСЕЛ - ПОСЛЕДОВАТЕЛЬНОСТИ', consoleLogStyles);

    // Число, до которого идёт последовательность || число итераций
    let lastNumber = 15;

    /*
      Можно воспользоваться формулой
      Арифметической прогрессии (Гаусс)
      n(n + 1) / 2
    */

    // Сумма чисел
    let sum = 0;

    // Задача найти сумму чисел
    function getSum(lastNum) {
      for (let i = 1; i <= lastNum; i++) {
        sum += i;
      }
    }

    getSum(lastNumber);

    console.log('Сумма чисел', sum);
  })();

  // _____________________ ПРОИЗВЕДЕНИЕ ЧЕТНЫХ ЧИСЕЛ ____________________________

  // ! 3
  (function() {
    // Напишите универсальную программу, которая находит произведение всех чётных чисел из последовательности от 1 до n.

    console.log('%c 3) ПРОИЗВЕДЕНИЕ ЧЕТНЫХ ЧИСЕЛ - ПОСЛЕДОВАТЕЛЬНОСТИ', consoleLogStyles);

    // Число, до которого идёт последовательность || число итераций
    let lastNumber = 15;

    // Произведение всех чётных чисел из последовательности
    let multiplicationResult = 1;

    // Задача найти произведение четных чисел
    function getSumEvenNumbers(lastNum) {
      for (let i = 1; i <= lastNum; i++) {
        if (i % 2 === 0) {
          multiplicationResult *= i;
          console.log('произведение ' + multiplicationResult, 'число ' + i);
        }
      }
    }

    getSumEvenNumbers(lastNumber);

    console.log('Произведение четных чисел', multiplicationResult);
  })();

  // ________________________ ДЕЛИТЕЛЬ ЧИСЛА ______________________________________

  // ! 4
  (function() {
    // Напишите программу, которая находит все делители числа, кроме единицы и самого числа.

    console.log('%c 4) ДЕЛИТЕЛЬ ЧИСЛА, КРОМЕ ЕДИНИЦЫ И САМОГО ЧИСЛА', consoleLogStyles);

    // Число у которого необходимо найти делитель
    let divideNumber = 15;

    // Массив делителей числа
    let arrayDivideNumber = [];

    // Задача найти все делители числа, кроме единицы и самого числа.
    function getDivideNumber(divideNum) {
      for (let i = 1; i <= divideNum; i++) {
        if (divideNum % i === 0 && i !== 1 && i !== divideNum) {
          arrayDivideNumber.push(i);
        }
      }
    }

    getDivideNumber(divideNumber);
    console.log(
      'все делители ' + divideNumber + ', кроме единицы и самого ' + divideNumber + ' = ',
      arrayDivideNumber
    );
  })();

  // ! 5
  (function() {
    console.log('%c 5) КОЛИЧЕСТВО ЦИФР В ЧИСЛЕ', consoleLogStyles);

    // Число кторое проверяется
    let digitOfNumber = 424242;

    // Количество цифр в этом числе и запиши результат в переменную
    let quantityNumber = 0;

    function getManyDigitOfNumber(digitOfNum) {
      while (digitOfNum >= 1) {
        digitOfNum /= 10;
        quantityNumber++;
      }
    }

    getManyDigitOfNumber(digitOfNumber);

    console.log('В с числе: ' + digitOfNumber, 'количество цифр = ' + quantityNumber);
  })();

  // ! 6
  (function() {
    // Программа должна считать количество протеина необходимое на период.

    console.log('%c 6) КОЛИЧЕСТВО ПРОТЕИНА НЕОБХОДИМО НА ПЕРИОД', consoleLogStyles);

    const KeksProto = {
      days: 15, // Дней в периоде
      period: 3, // Как часто я ем протеин (раз в три дня)
      workDayAmount: 200, // Количество протеина в будние
      weekendAmount: 100, // Количество протеина в выходные
      total: 0, // сумма необходимого протеина
    };

    function getProtein(days, period, workDayAmount, weekendAmount) {
      for (let i = 1; i <= days; i++) {
        if (i % period === 0) {
          KeksProto.total += workDayAmount;
          if (i % 7 === 6 || i % 7 === 0) {
            KeksProto.total -= weekendAmount;
          }
        }
      }
    }

    getProtein(KeksProto.days, KeksProto.period, KeksProto.workDayAmount, KeksProto.weekendAmount);

    console.log('Сумма необходимого протеина :', KeksProto.total);

    // __________________ Можно оптимизировать ______________
    // for (var i = period; i <= days; i +=period) {
    //   if (i%7 === 6 || i%7 === 0) {
    //     total +=weekendAmount;
    //   } else {
    //     total +=workDayAmount;
    //   }
    // }
  })();

  // ! 7
  (function() {
    // Задача Напиши программу, которая проверяет, является ли число палиндромом.

    /* Палиндромы — это слова или фразы, которые одинаково читаются слева направо и справа налево.
      Среди чисел тоже есть палиндромы.
      Например, 3223 или 1001.
    */

    console.log('%c 7) ПАЛИНДРОМ', consoleLogStyles);

    // Число которое проверяется на палиндромом
    let poly = 5665;

    // «перевёрнутую» версию числа, называется ylop
    let ylop = 0;

    // Если да, значение флага isPalindrome должно быть true, если число не палиндром
    let isPalindrome = false;

    // Для Цикла While
    let polyCheck = poly;

    // Решение через строку
    function getPalindromeString(palindrome) {
      return (isPalindrome =
        parseFloat(
          String(palindrome)
            .split('')
            .reverse()
            .join(''),
          10
        ) === palindrome);
    }

    // Решение через через цикл While
    function getPalindromeWhile() {
      while (polyCheck >= 1) {
        ylop = ylop * 10 + (polyCheck % 10);
        polyCheck = (polyCheck - (polyCheck % 10)) / 10;
      }
      if (poly === ylop) {
        isPalindrome = true;
      }
    }
    getPalindromeWhile();

    getPalindromeString(poly);

    console.log('String: Число является Палиндромовым', isPalindrome);

    /*
      # №2 Решения

      ! Что объединяет все палиндромы ?

      * Каждый палиндром содержит в себе парное количество одинаковых букв,
      * но максимум допускается одна не парная буква
      * Учитывая эту особенность, нам нужно просто посчитать, что в слове не более одной не парной буквы
    */

    function getPalindrome(str) {
      const unmatched = new Set();

      str.split('').forEach(letter => {
        if (unmatched.has(letter)) {
          unmatched.delete(letter);
        } else {
          unmatched.add(letter);
        }
      });

      // в колекции не осталось больше одного символа
      return unmatched.size <= 1;
    }

    console.log(getPalindrome('civic')); // true

    function isPalindromeFun(str) {
      // Очищаем строку от знаков препинания и продим к нижнему регистру
      const clearStr = s => s.toLowerCase().replace(/[^а-я-a-z-0-9]/gi, '');
      return (
        clearStr(str) ===
        clearStr(str)
          .split('')
          .reverse()
          .join('')
      );
    }

    // console.log(isPalindromeFun('Яд, яд, дядя!'));

    // # Через цикл For (Более оптимальное решение)
    function isPalindrome2(str) {
      const clear = str.toLowerCase().replace(/[^а-я-a-z-0-9]/gi, '');
      for (let i = 0; i < clear.length; i++) {
        const letterBack = clear[clear.length - (i + 1)];
        if (clear[i] !== letterBack) return false;
      }
      return true;
    }

    // console.log(isPalindrome2('Сани, плот и воз, зов и толп и нас.'));
    // console.log(isPalindrome2('Сани, плот и воз, зов и толп и нас.'));

    // # Через цикл While (Более оптимальное решение)
    function isPalindrome3(str) {
      const clear = str.toLowerCase().replace(/\s/g, '');

      let left = 0;
      let right = clear.length - 1;

      while (left < right) {
        if (clear[left] !== clear[right]) return false;
        left++;
        right--;
      }

      return true;
    }

    // console.log(isPalindrome3('Сани плот и воз зов и толп и нас'));
  })();

  // ! 8
  (function() {
    console.log('%c 8) ПЕРЕВЕРНУТЬ СТРОКУ', consoleLogStyles);
    // Задача перевернуть строку

    // Через While
    function getTextWhile(str) {
      let i = str.length;
      let newStr = '';

      while (i > 0) {
        --i;
        newStr += str[i];
        console.log(newStr);
      }

      return newStr;
    }
    // getTextWhile('РЕКУРСИЯ')

    // Через Обратный цикл
    function reverseString(str) {
      let newString = '';
      for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i];
      }
      return newString;
    }
    // reverseString('hello');

    // Через Строку Split
    const getTextReversSplit = text => {
      return text
        .split('')
        .reverse()
        .join(''); // ES5
    };

    // Через Оператор Rest
    const getTextReverseRest = text => {
      return [...text].reverse().join(''); // ES6
    };

    // Через Метод Reduce
    const getTextReverseReduce = text => {
      return [...text].reduce((words, letter) => {
        return letter + words;
      }, '');
    };

    // Через рекурсию
    function getTextRev(str) {
      return str ? getTextRev(str.substr(1)) + str[0] : str;
    }

    console.log(`ПЕРЕВЕРНУТАЯ СТРОКА
			${getTextReversSplit('первая')}
			${getTextReverseRest('яавреп')}
			${getTextReverseReduce('12334')}
			${getTextRev('РЕКУРСИЯ')}
		`);
  })();
})();
