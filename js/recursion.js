'use strict';

/*
TODO ЗАДАЧИ:
  * 1) СУММА ЧИСЕЛ В МАССИВ
  * 2) ФАКТОРИАЛ
  * 3) ЧИСЛА ФИБОНАЧЧИ
  * 4) АЛГОРИТМ ЕВКЛИДА
  * 5) ЗАДАЧА №1: ПРОИЗВЕДЕНИЕ ИХ ВСЕХ
  * 6) ЗАДАЧА №2 НАЙТИ ЗНАЧЕНИЕ ВО ВЛОЖЕННОМ ОБЪЕКТЕ
  * 7) ЗАДАЧА №3 КОЛИЧЕСТВО ЦЕЛЫХ ЧИСЕЛ В МНОГОМЕРНОМ МАССИВЕ
  * 8) ЗАДАЧА №4 СУММА КВАДРАТОВ ЧИСЕЛ В МНОГОМЕРНОМ МАССИВЕ
  * 9) ЗАДАЧА №5 НОВЫЙ МАССИВ ИЗ K ПОВТОРОВ
  * 10) ЗАДАЧА №6 ВЕРНУТЬ ПЕРВУЮ САМУЮ ДЛИННУЮ СТРОКУ
*/

(function () {
  // ? Стили для console.log
  const consoleLogStyles = [
    'color: green',
    'background-color: yellow',
    'font-size: 12px',
    'border: 1px solid red',
    'padding: 5px',
  ].join(';');

  /*
    ! Рекурсия - способ решения задачи с помощью подзадач, постановка которых
    ! аналогична исходой задачи

    Рекуррентный случай — это то, что вообще должна делать рекурсивная функция,
    это её описание

    Базовый (Крайний) случай - это то, к чему должна стремиться рекурсия
    По его достижению прекращается выполнение работы или вычисления,
    и полученный результат возвращается обратно

    Базовый случай всегда проверяется первым.
    Если нет, то строгаем матрёшки дальше
  */

  (function () {
    console.log('%c 1) СУММА ЧИСЕЛ В МАССИВЕ', consoleLogStyles);

    // # Сумма чисел в массиве
    const sumArrayItems = list => {
      // list: [ 1, 2, 3, 4 ] -> [ 2, 3, 4 ] -> [ 3, 4 ] -> [ 4 ]
      switch (list.length) {
        // Если массив пустой
        case 0:
          return 0;
        case 1:
          return list[0]; // в массиве один элемент
        default:
          return list[0] + sumArrayItems(list.slice(1)); // -1 первый элемент
        // в противном случае результат -
        // это первый элемент массива плюс оставшиеся элементы
      }
    };

    console.log(sumArrayItems([1, 2, 3, 4])); // 10

    // # Сумма чисел в массиве через собственный Reduce
    function sumReduce(arr, fn, initial) {
      // initial  0 1 3 6

      if (!arr.length) return initial;

      if (arr.length === 1) return fn(initial, arr[0]);

      return sumReduce(arr.slice(1), fn, fn(initial, arr[0]));
    }

    const funcSum = (a, b) => a + b;

    console.log(sumReduce([1, 2, 3, 4], funcSum, 0));
  })();

  (function () {
    console.log('%c 2) ФАКТОРИАЛ', consoleLogStyles);

    // ! Факториал - произведение всех натуральных чисел от 1 до n включительно
    // factorial(4) - 1 * 2 * 3 * 4 = 24

    // # Факториал
    function factorial(n) {
      if (n === 1) return 1;
      return n * factorial(n - 1);
    }

    console.log(factorial(4));
  })();

  (function () {
    console.log('%c 3) ЧИСЛА ФИБОНАЧЧИ', consoleLogStyles);

    /*
        ! Числа Фибоначчи
        Числа Фибоначчи очень часто используют как объяснение такого подхода как мемоизация.
        Мемоизация - это подход, который позволяет нам сохранять результаты промежуточных решений, для того чтобы в следующих расчетах не повторять тоже самое.

        Принцип невероятно прост, в данном случае мы выделяем массив - все значения которого == 0, и записываем все получившиеся вычисления, таким образом имеем следующий код:
    */

    // Последовательность начинается с 0, 1 потом последующие числа складываются.

    // # Фибоначи
    const fibonacchi = n => {
      if (n === 0) return 0;
      if (n === 1) return 1;
      return fibonacchi(n - 1) + fibonacchi(n - 2);
    };

    fibonacchi(5); // 5

    // # Пример с усовершенствованной рекурсией числа запоминаются в массиве
    let results = [0, 1];
    function fibonacchi2(n) {
      if (n <= 1) return n;

      if (!results[n]) {
        results[n] = fibonacchi2(n - 1) + fibonacchi2(n - 2);
      }
      return results[n];
    }

    console.log(fibonacchi2(7));
  })();

  (function () {
    console.log('%c 4) АЛГОРИТМ ЕВКЛИДА', consoleLogStyles);

    // ! Алгоритм Евклида

    /*
      Алгоритм Евклида – это алгоритм нахождения наибольшего
      общего делителя (НОД) пары целых чисел
      https://younglinux.info/algorithm/euclidean



      * НОД — это наибольший общий делитель.
      http://spacemath.xyz/nod_i_nok/

      Наибольшим общим делителем чисел a и b называется наибольшее число,
      на которое a и b делятся без остатка.

      * Первый способ (самый долгий) НОД
      Например a = 12, b = 9
      Делитель без остатка 12 = (1, 2, 3, 4, 6, 12)
      Делитель без остатка 9 = (1, 3, 9)

      Наибольшим и общим делителем чисел 12 и 9
      ! является число 3

      Если какое-то число без остатка разделилось на другое, его называют
      * кратным этого числа.
    */

    // # Через цикл Рекурсию №1
    function evklid(a, b) {
      // a -> 30 18 12 6
      if (b === 0) return a;
      return evklid(b, a % b);
    }

    // console.log( evklid(30, 18)) // 6

    // # Через цикл Рекурсию №2
    function gcd(a, b) {
      return b ? gcd(b, a % b) : a;
    }

    // console.log( gcd(30, 18)) // 6

    // # Через цикл
    function gcd2(a, b) {
      while (b) {
        [a, b] = [b, a % b];
      }
      return a;
    }

    // console.log( gcd2(30, 18)) // 6
  })();

  (function () {
    console.log('%c 5) ЗАДАЧА №1 ПРОИЗВЕДЕНИЕ ИХ ВСЕХ', consoleLogStyles);

    /*
      ! Задача № 1
      Напишите функцию которая принимает массив чисел
      и возвращает произведение их всех.
    */

    function productOfArray(array) {
      if (array.length === 0) return 1;
      return array[0] * productOfArray(array.slice(1));
    }

    const sixty = productOfArray([1, 2, 3, 10]); // 60
    const six = productOfArray([1, 2, 3]); // 6
  })();

  (function () {
    console.log('%c 6) ЗАДАЧА №2 НАЙТИ ЗНАЧЕНИЕ ВО ВЛОЖЕННОМ ОБЪЕКТЕ', consoleLogStyles);

    /*
      ! Задача № 2
      Напишите функцию, которая ищет значение во вложенном объекте.
      Возвращает true, если объект содержит это значение.
    */

    const nestedObject = {
      data: {
        info: {
          stuff: {
            thing: {
              moreStuff: {
                magicNumber: 44,
                something: 'foo2',
              },
            },
          },
        },
      },
    };

    function contains(obj, value) {
      // eslint-disable-next-line guard-for-in
      for (let key in obj) {
        if (typeof obj[key] === 'object') {
          return contains(obj[key], value);
        }

        if (obj[key] === value) {
          return true;
        }
      }
      return false;
    }

    console.log(contains(nestedObject, 44)); // true
    console.log(contains(nestedObject, 'foo')); // false
  })();

  (function () {
    console.log('%c 7) ЗАДАЧА №3 КОЛИЧЕСТВО ЦЕЛЫХ ЧИСЕЛ В МНОГОМЕРНОМ МАССИВЕ', consoleLogStyles);

    /*
      ! Задача № 3
      Верните общее количество целых чисел из многомерного массива
    */

    // # Разворачивает многомерный массив и оставляя только цифры
    function totalIntegers(arr) {
      return arr.reduce((acc, item) => {
        if (Array.isArray(item)) {
          return acc.concat(totalIntegers(item));
        } else if (Number.isInteger(item)) {
          return acc.concat(item);
        } else {
          // Если не цифра, просто возвращаю массив
          return acc;
        }
      }, []);
    }
    const totalNumber = totalIntegers([[[5], 3], 0, 2, ['foo'], [], [4, [5, 6]]]).length; // 7
  })();

  (function () {
    console.log('%c 8) ЗАДАЧА №4 СУММА КВАДРАТОВ ЧИСЕЛ В МНОГОМЕРНОМ МАССИВЕ', consoleLogStyles);
    /*
      ! Задача № 4
      Суммирует квадраты чисел в многоуровневом массиве
    */

    function sumSquares(arr) {
      if (arr.length === 0) return 0;
      let total = 0;

      arr.forEach(item => {
        if (Array.isArray(item)) {
          total += sumSquares(item);
        } else {
          total += item * item;
        }
      });

      return total;
    }

    console.log(sumSquares([[1, 2], 3, [2]])); // 18
    console.log(sumSquares([[[[[[[[[1]]]]]]]]])); // 1
  })();

  (function () {
    console.log('%c 9) ЗАДАЧА №5 НОВЫЙ МАССИВ ИЗ K ПОВТОРОВ', consoleLogStyles);

    /*
      ! Задача № 5
      Функция должна возвращать массив, содержащий повторы переданных чисел, в k количестве.
    */

    function replicate(k, number) {
      if (k <= 0) return [];
      return [number].concat(replicate(k - 1, number));
    }

    console.log(`Массив из 3 значений и повторов 5`, replicate(3, 5)); //  [ 5, 5, 5 ]
    // # Встроенный способ
    // console.log(Array(3).fill(5)); //
  })();

  (function () {
    console.log('%c 10) ЗАДАЧА №6 CODEWARS: ВЕРНУТЬ ПЕРВУЮ САМУЮ ДЛИННУЮ СТРОКУ', consoleLogStyles);
    // Вернуть первую длинную строку,
    // состоящую из k последовательных строк, взятых в массиве

    function longestConsec(strarr, k) {
      if (k > strarr.length || k <= 0) return '';

      let newStr = longestConsec(strarr.slice(1), k);
      let str = strarr.slice(0, k).join('');

      if (newStr.length <= str.length) {
        newStr = str;
      }

      return newStr;
    }

    console.log(
      `Самая длинная строка: `,
      longestConsec(['zone', 'abigail', 'theta', 'form', 'libe', 'zas', 'theta', 'abigail'], 2)
    );
  })();
})();
