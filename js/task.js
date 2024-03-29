'use strict';

/*
TODO ЗАДАЧИ:
  * 1) Определились 8 четвертьфиналистов Лиги чемпионов
  * 2) Любовный треугольник
  * 3) Ханойская башня
  * 4) Перенос груза с автомобиля на автомобиль
  * 5) CODEWARS: Вернуть первую самую длинную строку
  * 6) Отсортировать книги по имени автора #Point-free
  * 7) Яндекс: Бинарном векторе (Массиве) самую длинную последовательность единиц
  * 8) Яндекс: в массиве найти сумму чисел равную k
  * 9) Яндекс: Объединение отсортированных массивов
  * 10) Яндекс: Сжатие строки
  * 11) Яндекс: Сжатие целочисленного массива
  * 12) Яндекс: Отсортировать массив только по нечетным значениям
  * 13) Яндекс: Функция рандомного hex цвета + из rgb в hex
  * 14) Яндекс: Генерация рандомного баннера
  * 15) Яндекс: Посчитать сумму в многомерном массиве
  * 16) Яндекс: Проверка массива на монотоность
  * 17) Жадный Алгоритм: Нахождения оптимального заправки от точки А до точки Б
  * 18) Проверить последовательность скобок валидной
  * 19) Яндекс: Восстановить маршрут поездки по билетам
  * 20) Банкомант: Выдача купюр из переданной суммы
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

  // !1
  (function () {
    console.log('%c 1) ОПРЕДЕЛИЛИСЬ 8 ЧЕТВЕРТЬФИНАЛИСТОВ ЛИГИ ЧЕМПИОНОВ', consoleLogStyles);

    /* ЗАДАЧА
      ! Определились 8 четвертьфиналистов Лиги чемпионов.
      Среди них - 4 английские команды.
      Какова вероятность, что при жеребьёвке в четвертьфинале будет хотя бы одна английская пара?
    */

    /*
    Логика:
      Во время цикла я беру каждый элемент исходного массива, смотрю на остаток от деления на необходимую ширину (2) из 8 элементов - будет 4 пары.
      Если остаток равен 0 - то я в массив (acc), добавляю значение с первым элементом который завернут в массив, если значение не равно 0, то я беру массив(acc)
      в нем беру тот самый массив в который добавлял первое значение, и в конец этого массива добавляю еще один элемент исходного массива.
      Суть в том, что массивы будут формироваться внутри acc, только в тот момент когда i % width === 0,
      в остальных случаях будут добавляться внутрь вложенного массива
    */

    const teams = [
      {
        name: `Манчестер Сити`,
        country: `Англия`,
      },
      {
        name: `Манчестер Юнайтед`,
        country: `Англия`,
      },
      {
        name: `Ливерпуль`,
        country: `Англия`,
      },
      {
        name: `Тоттенхэм`,
        country: `Англия`,
      },
      {
        name: `Барселона`,
        country: `Испания`,
      },
      {
        name: `Ювентус`,
        country: `Италия`,
      },
      {
        name: `Порту`,
        country: `Португалия`,
      },
      {
        name: `Аякс`,
        country: `Голландия`,
      },
    ];

    // # Функция рандомной (Сортировки) команд
    const sortTeam = arr => {
      const newArr = arr.slice();
      for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
      }
      return newArr;
    };

    // # Функция группировки команд (Жеребьевка)
    const getPairs = arr =>
      arr.reduce((rows, key, i) => {
        i % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key);
        return rows;
      }, []);

    // # Функция проверки страны: Англия (Выборка)
    const isTeamCountry = (arr, country) => arr.every(team => team.country === country); //  team.country.includes(state)

    // # Основная функция
    const drawTeam = arr => getPairs(sortTeam(arr)).filter(pair => isTeamCountry(pair, `Англия`));

    // Функция по созданию Тегов:li
    const createHtmlTeams = arr =>
      arr.map(team =>
        team.reduce((acc, command) => {
          return (acc += `<li>Страна: <b>${command.country}</b>, Команда: <b>${command.name}</b></li>\n`);
        }, ``)
      );

    // Функция отрисовки HTML
    const addlistELement = arr => {
      const listELement = document.createElement('ul');
      listELement.innerHTML = `<p>Есть хотя бы одна английская пара: <b>${
        arr.length ? `Да` : `Нет`
      }</b></p>`;
      document.body.appendChild(listELement);
      arr.forEach(item => listELement.insertAdjacentHTML('beforeend', item));
      /* 	listELement.insertAdjacentHTML('beforeend', [...arr]) */
    };

    // Отрисовывает В HTML
    // addlistELement(createHtmlTeams(drawTeam(teams)));
  })();

  // ! 2
  (function () {
    console.log('%c 2) ЛЮБОВНЫЙ ТРЕУГОЛЬНИК', consoleLogStyles);

    /* ЗАДАЧА
      ! Любовный треугольник
      Задача - реализовать функцию, getLoveTrianglesCount которая вычисляет количество любовных треугольников
      Найти, а такие тройки что на N-й позиции будет число M, на позиции M будет число K, а на позиции K будет число N

        https://github.com/ossset/love-triangle
    */

    function getLoveTrianglesCount(preferences = []) {
      return (
        preferences.reduce((acc, current) => {
          if (acc.includes(current)) return acc;

          const second = preferences[current - 1];

          if (second === current || acc.includes(second)) return acc;

          const third = preferences[second - 1];

          if (third === current || third === second || acc.includes(third)) {
            return acc;
          }

          const last = preferences[third - 1];

          if (last === second || last === third || current !== last) return acc;

          return [...acc, current, second, third];
        }, []).length / 3
      );
    }

    console.log(
      `Количество любовных треугольников: ${getLoveTrianglesCount([2, 3, 1, 5, 6, 4])}`
      // getLoveTrianglesCount([3, 9, 12, 6, 13, 16, 15, 3, 14, 5, 4, 1, 10, 2, 4, 4, 10, 14, 11])
    );

    /*
    ! Возможные решения

    * 1
    let x = preferences.length;
    let y = 0;
    for (let i = 0; i<x; i++) {
        let a = preferences[i] - 1;
        if (a == i) continue;
        let b = preferences[a] - 1;
        if (b == a) continue;
        let c = preferences[b] - 1;
        if (b ==c) continue;
        if (c == i) {
            y++;
        }
    }
    return y/3;

    * 2
    var count=0;
    var lovers = [];
    for (i=1;i<preferences.length+1;i++){
      var a= i;
      var b = preferences[a-1];
      var c= preferences[b-1];

      if (lovers.indexOf(i)==-1 && a!=b && b!=c){
        if (preferences[c-1]==a){
          count++;
          lovers.push(a);
          lovers.push(b);
          lovers.push(c);
        }
      }
  */
  })();

  // ! 3
  (function () {
    console.log('%c 3) ХАНОЙСКАЯ БАШНЯ', consoleLogStyles);

    /* ЗАДАЧА
      ! Ханойская башня
      Есть три стержня, на одном из них нанизаны диски, каждый последующий диск меньше предыдущего.
      Стержни необходимо двигать только по одному, при этом нельзя, класть диск большего размера на меньший.

        A (point1) - основной на котором находятся первоначально диски
        B (point2) - конечный на который необходимо передвинуть все диски которые находятся в A
        С (temp) - вспомогательный для перемещения в конечный B

      Для того чтобы передвинуть последний диск, мне необходимо передвинуть все верхнии диски
      на другой свободный стержень, и так до первого диска (наименьшего диска).
      То есть для того, чтобы передвинуть N - диск, необходимо передвинуть N - 1 дисков на другой свободный стержень

      N диск - передвинуть из стрежня point1 в стрежень point2:
        (N - 1) дисков из point1 передвигаю в точку -> temp
        Последний диск (N) диск point1 в point2
    */

    const hanoi = (amount, point1, point2, temp) => {
      if (amount === 0) return;

      hanoi(amount - 1, point1, temp, point2);
      console.table(`Из стержня ${point1} в стрежень ${point2}`);
      hanoi(amount - 1, temp, point2, point1);
    };

    console.log(hanoi(3, 'A', 'B', 'C'));
    /*
      Из стержня A в стрежень B

      Из стержня A в стрежень C

      Из стержня B в стрежень C

      Из стержня A в стрежень B

      Из стержня C в стрежень A

      Из стержня C в стрежень B

      Из стержня A в стрежень B
  */
  })();

  // ! 4
  (function () {
    console.log('%c 4) ПЕРЕНОС ГРУЗА С АВТОМОБИЛЯ НА АВТОМОБИЛЬ', consoleLogStyles);

    /* ЗАДАЧА
      ! Перенос груза с автомобиля на автомобиль
      Вам необходимо создать приложение для автоматизации работы погрузочных кранов,
      позволяющих перемещать плиты между грузовыми автомобилями на крупной строительной площадке.

      Приложение должно предоставлять кранам последовательность разгрузки,
      оптимальную для переноса груза с автомобиля на автомобиль, учитывая следующее:
      ● плиты размещаются на автомобилях одна над другой (от 3 до 8 штук в высоту), и отсортированы по весу (от тяжелых - снизу, к легким - сверху)
      ● кран может снимать и перемещать только самую верхнюю плиту с грузовика, и при разгрузке не может устанавливать более тяжелые плиты на более легкие
      ● перенос груза с загруженного автомобиля на пустой нужно осуществить используя только одно дополнительное место для временного хранения плит

      Входящие параметры:
      Количество плит на автомобиле, который требуется разгрузить (от 3 до 8)

      Выходные данные:
      Стратегия перемещения плит с автомобиля на автомобиль:
      ● #1 slot_a -> slot_c
      ● #2 slot_a -> slot_b
      ● #1 slot_c -> slot_b
      ● ...
      где: slot_a - разгружаемый автомобиль, slot_b - дополнительное место для промежуточного хранения плит,
      slot c - пустой автомобиль, куда нужно перенести весь груз, #n - номер перемещаемой плиты.
    */

    // Машина с первоначальным грузом (плит)
    const car1 = [300, 200, 100];

    // Количество плит в первой машине
    const slabNumber = car1.length;

    // Машина куда стоит переложить груз
    const car2 = [];

    // Место для промежуточного хнанения плит
    const bufferPlace = [];

    const crane = (slabs, from, to, buffer) => {
      if (slabs >= 1) {
        crane(slabs - 1, from, buffer, to);
        moveSLab(from, to);
        crane(slabs - 1, buffer, to, from);
      }
    };

    const moveSLab = (from, to) => {
      to.push(from.pop());
    };

    crane(slabNumber, car1, car2, bufferPlace);
    console.log(`Перенесенный груз на второй автомобиль: ${car2}`); // [ 300, 200, s100 ]
  })();

  // !5
  (function () {
    console.log('%c 5) CODEWARS: ВЕРНУТЬ ПЕРВУЮ САМУЮ ДЛИННУЮ СТРОКУ', consoleLogStyles);
    // Вернуть первую длинную строку,
    // состоящую из k последовательных строк, взятых в массиве

    /* ЗАДАЧА
      ! https://www.codewars.com/kata/consecutive-strings/train/javascript

      Дается массив strarr строк и целое число k.
      Задача-вернуть первую самую длинную строку, состоящую из k последовательных строк, взятых в массиве

      longest_consec(["зона", "Авигея", "тета", "форма", "жизнь", "как", "тета", "Авигея"], 2) --> "abigailtheta"

      n - длина массива строк

      Если функция принимает: n = 0 или k > n или k <= 0 возвращает, то функция
      должна вернуть ""

    */

    // ! Решение через цикл
    function longestConsec(strarr, k) {
      if (!strarr.length || k > strarr.length || k <= 0) return '';

      let newStr = '';

      for (let i = 0; i <= strarr.length - k; i++) {
        let str = strarr.slice().splice(i, k).join('');

        if (newStr.length < str.length) {
          newStr = str;
        }
      }
      return newStr;
    }

    // ? Решение через Reduce
    const longestConsec2 = (strarr, k) => {
      if (k > strarr.length || k <= 0) return '';

      return strarr.reduce((full, item, i, arr) => {
        const currentStr = arr.slice(i, i + k).join('');
        return currentStr.length > full.length ? currentStr : full;
      }, '');
    };

    // console.log(
    // longestConsec2(["Sergei", "programmer1", "Mixail", "programmer2", "Alex56", "programmer32222222222"], 3));

    // ? Решение через Рекурсию

    function longestConsec(strarr, k) {
      if (k > strarr.length || k <= 0) return '';

      let newStr = longestConsec(strarr.slice(1), k);
      let str = strarr.slice(0, k).join('');

      if (newStr.length <= str.length) {
        newStr = str;
      }

      return newStr;
    }

    // console.log(
    //   longestConsec3(['Sergei', 'programmer1', 'Mixail', 'programmer2', 'Alex56', 'programmer3'], 3)
    // );

    // ? Частичное решение через подгруппы (подмассивы)
    /*
      * Исходный массив
      [ "Sergei", "programmer1", "Mixail", "programmer2", "Alex56", "programmer3"], 3)

      ! 1) В цикле преобразовываю копию исходного массива,
      в многомерный массив, где подмассивом является группы исходя из (k)

      Три элемента в группе:
      [
        [ 'Sergei', 'programmer1', 'Mixail' ],
        [ 'programmer2', 'Alex56', 'programmer3' ]
      ]

      ! 2) Каждую группу внутри функции getStr, через join() преобразую к строке,
      после чего выбираю самую длинную, и сохраняю это строку в переменную.

      ! 3) На каждой последующей итерации сдвигаю в убираю первый элемент массива,
      тем самым передвигаюсь вправо, и создаю новую группу

      [ [ 'programmer1', 'Mixail', 'programmer2' ],
      [ 'Alex56', 'programmer3' ] ]

      [ [ 'Mixail', 'programmer2', 'Alex56' ], [ 'programmer3' ] ]

      [ [ 'programmer2', 'Alex56', 'programmer3' ] ]

      [ [ 'Alex56', 'programmer3' ] ]

      [ [ 'programmer3' ] ]

      Получается далеко не самый оптимальный код,
      но он работал выдавал практически все тексты,
      кроме строк,которые равны по длине.

      Так как у меня при первой группировки происходило запись
      [
        [ 'Sergei', 'programmer1', 'Mixail' ],
        [ 'programmer2', 'Alex56', 'programmer3' ]
      ]

      [ 'programmer2', 'Alex56', 'programmer3' ] - это самая длинная строка,

      Хотя правильный ответ был 'programmer1', 'Mixail', 'programmer2']
    */

    // * Функция для группировки
    const getGroup = (arr, group) =>
      arr.reduce((acc, str, index) => {
        if (index % group === 0) acc.push([str]);
        else acc[acc.length - 1].push(str);
        return acc;
      }, []);

    // * Функция для нахождения самой длинной строки в группе
    const getStr = arr => {
      const maxLength = arr.reduce((acc, itemGroup) => {
        const newStr = itemGroup.join('');
        return acc.length >= newStr.length ? acc : newStr;
      }, '');

      return maxLength;
    };

    // * Основная функция
    function longestConsecGroup(strarr, k) {
      if (!strarr.length || k > strarr.length || k <= 0) return '';

      let newStr = '';

      for (let i = 0; i < strarr.length; i++) {
        let str = getStr(getGroup(strarr.slice(i), k));

        if (newStr.length < str.length) {
          newStr = str;
        }
      }
      return newStr;
    }

    // console.log(
    //   longestConsecGroup(
    //     ["Sergei", "programmer1", "Mixail", "programmer2", "Alex56", "programmer3"], 3)
    // );
  })();

  // !6
  (function () {
    console.log('%c 6) ОТСОРТИРОВАТЬ КНИГИ ПО ИМЕНИ АВТОРА #POINT-FREE', consoleLogStyles);

    const authors = {
      1: { name: 'Author C' },
      2: { name: 'Author B' },
      3: { name: 'Author A' },
    };

    const books = [
      {
        id: 1,
        type: 'T',
        title: 'Book1',
        authorID: 1,
      },
      {
        id: 2,
        type: 'T',
        title: 'Book2',
        authorID: 2,
      },
      {
        id: 3,
        type: 'R',
        title: 'Book3',
        authorID: 3,
      },
    ];

    // # Pure functions with points
    function isTechnology(book) {
      return book.type === 'T';
    }

    function toBookView(book) {
      return Object.freeze({
        title: book.title,
        author: authors[book.authorID].name,
      });
    }

    function ascByAuthor(book1, book2) {
      if (book1.author < book2.author) return -1;
      if (book1.author > book2.author) return 1;
      return 0;
    }

    // # Callbacks with points
    function getBooksUsingPoints() {
      return books
        .filter(book => isTechnology(book))
        .map(book => toBookView(book))
        .sort((book1, book2) => ascByAuthor(book1, book2));
    }
    // console.log(getBooksUsingPoints()); // [ { title: 'Book2', author: 'Author B' }, { title: 'Book1', author: 'Author C' } ]

    // # Point-free callbacks
    function getBooks() {
      return books.filter(isTechnology).map(toBookView).sort(ascByAuthor);
    }
    console.log(getBooks()); // [ { title: 'Book2', author: 'Author B' }, { title: 'Book1', author: 'Author C' } ]
  })();

  // !7
  (function () {
    console.log(
      '%c 7)ЯНДЕКС: БИНАРНОМ ВЕКТОРЕ САМУЮ ДЛИННУЮ ПОСЛЕДОВАТЕЛЬНОСТЬ ЕДИНИЦ',
      consoleLogStyles
    );

    // ! Бинарном векторе самую длинную последовательность единиц и вывести её длину
    const arr = [1, 0, 1, 1, 1, 0];

    function getVector(numbers) {
      let current = 0;
      let best = 0;

      for (const number of numbers) {
        if (number === 1) {
          current++;
          best = Math.max(current, best);
        } else {
          current = 0;
        }
      }

      return best;
    }

    console.log(
      `Самая длинная последовательность единиц в массиве ${arr}:
   `,
      getVector(arr)
    );
  })();

  // !8
  (function () {
    console.log('%c8)ЯНДЕКС: В МАССИВЕ НАЙТИ СУММУ ЧИСЕЛ РАВНУЮ K', consoleLogStyles);

    /*
    Яндекс №1.
    Поиск чисел в массиве с определённой суммой
    Дан массив целых чисел и целое число k.
    Нужно определить, есть ли в массиве два числа, сумма которых равна k .

    https://vk.com/@unilecs-task-18-naiti-vse-pary-chisel-v-massive-summa-kotoryh-ravna
  */

    const arr = [10, 15, 3, 7];

    // # Решение №1 через while
    function filter(nums, k) {
      // numbers [ 3, 7, 10, 15 ]
      const numbers = nums.slice().sort((a, b) => a - b);

      let first = 0;
      let last = numbers.length - 1;

      // last -> 3 -> 2 -> sum = 10 -> return true
      while (first < last) {
        // 3 + 15 = 18 > 10
        // 3 + 10 = 13 > 10
        // 3 + 7 = 10 === 10
        let sum = numbers[first] + numbers[last];

        if (sum === k) {
          return true;
        }

        if (sum < k) {
          first++;
        } else {
          last--;
        }
      }
      return false;
    }

    console.log(filter(arr, 10));

    // # Решение №2 через Цикл
    function filter2(nums, k) {
      // [10, 15, 3, 7];
      let sum;

      for (let i = 0; i < nums.length - 1; i++) {
        // i -> 0 -> 1 -> 2 -> 3
        for (let j = i + 1; j < nums.length; j++) {
          // i -> 0 0 0 -> 1 1 1
          // j -> 1 -> 2 -> 3 -> срабатывает следующая итерация цикла(i++)
          sum = nums[i] + nums[j]; //  25 13 17 18 22 10
          if (sum === k) return true;
        }
      }

      return false;
    }

    console.log(filter2(arr, 10));

    // # Решение №3 через Цикл
    function filter3(nums, k) {
      for (let i = 0; i < nums.length - 1; i++) {
        let x = k - nums[i]; // 0 -5 7

        for (let j = i + 1; j < nums.length; j++) {
          // nums[j] -> 15 3 7 3 7 7
          if (x === nums[j]) return true;
        }
      }

      return false;
    }
    console.log(filter3(arr, 10));
  })();

  // ! 9
  (function () {
    console.log('%c9)ЯНДЕКС: Объединение отсортированных массивов', consoleLogStyles);
    /*
    # Яндекс №2 Объединение отсортированных массивов

    Вам даны два отсортированных целочисленных массива nums1 и nums2,
    нужно поместить все элементы nums2 в nums1
    так чтобы элементы итогового массива остались отсортированными.

    количество элементов в массивах nums1 и nums2 равны m и n соотвественно;
    можно считать, что в массиве nums1 зарезервированно
    место для всех элементов (n + m) и заполнены нулями;
    результат должен сохраниться в переменной nums1,
    результат функции явно возвращать не обязательно
  */

    /*
    #[46,55,88,0,0,0,0] 3 [18,29,80,90] 4

   * @param {number[]} nums1 - первый отсортированный массив
   * @param {number} m - количество значимых элементов в nums1
   * @param {number[]} nums2 - второй отсортированный массив
   * @param {number} n - количество элементов в nums2
   * @return {void} Не возвращайте ничего, вместо этого модифицируйте nums1.
   */

    // ! Данные должны быть Мутабельными

    (function () {
      const nums1 = [46, 55, 88, 0, 0, 0, 0];
      const nums2 = [18, 29, 80, 90];

      function merge(nums1, m, nums2, n) {
        nums1
          .slice(0, m) // копирую из массива 1 все числа
          .concat(nums2) // объединяю с массивов 2
          .sort((a, b) => a - b) // сортирую их
          .forEach((number, i) => (nums1[i] = number)); // заменяю полученными значениями оригинал массива 1
      }

      merge(nums1, 3, nums2, 4);

      console.log('№2 -> Новый объеденный массив nums1', nums1);
    })();

    // # Решение №2
    (function () {
      const nums1 = [46, 55, 88, 0, 0, 0, 0];
      const nums2 = [18, 29, 80, 90];

      function merge(nums1, m, nums2, n) {
        // nums1.splice(0, m))  [ 46, 55, 88 ] -> возвращает удаленные элементы
        nums1.splice(
          0, // удаляю с первого c нулевого индекса
          n, // первые три числа - > остается 4 нуля
          ...nums1 // через деструктуризацию добавляю новый объединенный, отсортированный массив
            .splice(0, m) // удаляю все три элемента из массива, тем самым оставляю место для массива 2
            .concat(nums2) // объединяю массивы
            .sort((a, b) => a - b) // сортирую объеденный массив
        );
      }

      merge(nums1, 3, nums2, 4);

      console.log('№2 -> Новый объеденный массив nums1', nums1);
    })();
  })();

  // ! 10
  (function () {
    console.log('%c10)ЯНДЕКС: СЖАТИЕ СТРОКИ', consoleLogStyles);

    // * ('AAABbbbBcCCC') => 'A3Bb3BcC3'
    // * 'AAAABBBCCletterYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB'
    //=> A4B3C2letterYZD4E3F3A6B28

    const str = 'AAABbbbBcCCCg';

    /*
    # Алгоритм: ('AAABbbbBcCCC') => 'A3Bb3BcC3'

    1) Происходит сравнение первой со следующей буквой, в последовательности букв

    2) Если буква не совпадает со следующей буквой, тогда происходит запись в result
    буквы которая не совпадает + count, если эта буква, встречается больше одного раза.
    Так же обновляется буква prev, и count - обнуляется
*/

    const compression = str => {
      let result = '';
      let count = 1;

      for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
          count++;
        } else {
          // A3 A3B A3Bb3 A3Bb3B A3Bb3Bc A3Bb3BcC3
          result += str[i] + (count > 1 ? count : '');
          count = 1;
        }
      }

      return result;
    };
    console.log('Сжатие строки: ', compression(str));

    /*
    # Алгоритм: ('AAABbbbBcCCC') => 'A3Bb3BcC3'

    1) Происходит сравнение буквы prev (Первой буквы) с последующими буквами,
    если она совпадает, то увеличиваем счетчик: count
    как только, последующие буквы не равны prev

    2) Происходит запись в result, буквы prev + count, если эта буква, встречается
    больше одного раза. Так же обновляется буква prev, и count - обнуляется

    3) Так как на втором шаге мы записывает в result, предыдущую букву letter
    и только потом обновляем ее новым значением letter
    тогда данный алгоритм, не учитывает последнии элементы передавемой строки
    Для этого необходимо снова обновить, result за пределами цикла
*/

    const compression2 = str => {
      let result = '';
      let prev = str[0];
      let count = 0;

      for (const letter of str) {
        // 1
        if (letter === prev) {
          count++;
        } else {
          // 2
          result += prev + (count > 1 ? count : '');
          prev = letter;
          count = 1;
        }
      }
      // 3
      result += prev + (count > 1 ? count : '');
      return result;
    };

    console.log(compression2(str));

    /*
      # Алгоритм: ('AAABbbbBcCCC') => 'A3Bb3BcC3'
      1. () -> Группа символов.
      2. (.) -> Точка соответствует любому отдельному символу, кроме разрыва строки
      3. \1 -> Соответствует тому же тексту, который был недавно сопоставлен - 1й группой захвата
      4. {1,} -> Указывается, сколько раз символ или группа символов могут повторяться
      5. Внутри функции str -> получает совпадения AAA -> A -> A3
    */

    const compression3 = str => str.replace(/(.)\1{1,}/g, str => str[0] + str.length);

    console.log(compression3(str));
  })();

  // ! 11
  (function () {
    console.log('%c11)ЯНДЕКС: СЖАТИЕ ЦЕЛОЧИСЛЕННОГО МАССИВА', consoleLogStyles);
    // Сжатие целочисленного массива
    // ([3, 2, 1, 5, 6, -1, 10]) => "-1,1-3,5-6,10"
    // const arr = [3, 2, 1, 5, 6, -1, 10];

    const arr = [4, 0, 1, 5, 6, 10];
    /*
      # Алгоритм
      1) Необходимо отсортировать массив

      2) Надо начинать с сравнивать с предыдущего элемента sorted[i - 1] + 1
      Для того чтобы последний элемент который больше на 1, тоже проходил в проверку.

      3) Но при первом проходе предыдущий элемент равен null
      поэтому сразу добавляем его в tmp

      4) pointer - переменная которая перезаписывается элементами которые больше 1 чем предыдущие.    Цикл не идет дальше пока есть такие элементы

      5) Если есть хоть один который больше предыдущего,
      то мы записываем его в tmp и через запятую добавляем, элемент который не прошел предыдущую проверку
      Цикл не идет

      6) Если в массиве первый и последующий не проходят проверки
      или в массиве не оказалось элементов которые можно сжать или же,
      тогда просто добавляем их в tmp
  */

    // # 3
    const zipArr = arr => {
      // 1 [ -1, 1, 2, 3, 5, 6, 10 ]
      const sorted = arr.slice().sort((a, b) => a - b);

      let result = '';
      let pointer = null;

      for (let i = 0; i < sorted.length; i++) {
        // 3
        if (i === 0) {
          result += sorted[i];
          continue;
        }

        // 2 Если элемент больше на 1 чем предыдущий, то он перезаписывает pointer
        if (sorted[i] === sorted[i - 1] + 1) {
          // 4
          pointer = sorted[i];
          continue;
        }

        // 5 Если хоть один элемент который больше на 1 чем предыдущий
        if (pointer !== null) {
          result = `${result}-${pointer},${sorted[i]}`;
          pointer = null;
          continue;
        }

        // 6 Если в массиве нет элементов для сжатия или первый и последующий не проходят проверки
        result = `${result},${sorted[i]}`;
      }

      // Если в конце массива будут идти последовательные элементы, то из-за
      // continue - они запишутся в pointer, но в result не попадут
      // Необходимо в конце проверить
      pointer !== null ? (result += `-${pointer}`) : result;

      return result;
    };

    console.log(zipArr(arr));

    // # 2
    function zipArr2(arr) {
      // [ 0, 1, 4, 5, 6, 10 ]
      const sorted = arr.sort((a, b) => a - b);

      let pointer = null;

      const result = sorted.reduce((acc, item, index, arr) => {
        if (!index) return `${item}`;
        // item -> 1 4 5 6 1
        // (arr[index - 1] + 1) -> 1 2 5 6 7
        const isItNext = item === arr[index - 1] + 1;

        if (isItNext) {
          pointer = item;
          return acc;
        }

        if (pointer !== null) {
          acc = `${acc}-${pointer},${item}`;
          pointer = null;
          return acc;
        }

        return `${acc},${item}`;
      }, '');

      return result;
    }

    // console.log(zipArr([3, 2, 1, 5, 6, -1, 10]));
    console.log('Сжатие целочисленного массива', zipArr2(arr));

    // # 3
    const zip = arr => {
      // [ 0, 1, 4, 5, 6, 10 ]
      const sorted = arr.slice().sort((a, b) => a - b);

      // Будем наполнять переменную range в случае если следующее значение больше на единицу
      // В противном случае — очищаем переменную range
      let range = [];
      let output = [];

      for (let i = 0; i < sorted.length; i++) {
        range.push(sorted[i]);

        if (sorted[i] === sorted[i + 1] - 1) {
          // sorted[i] 0, 4, 5
          range.push(sorted[i + 1]);
        } else {
          // sorted[i] - 1, 6, 10
          let item = sorted[i];

          if (range.length > 1) {
            item = [range.shift(), range.pop()].join('-');
          }

          range = [];
          output.push(item);
        }
      }

      return output.toString();
    };

    console.log('Сжатие целочисленного массива2', zip(arr));
  })();

  // ! 12
  (function () {
    console.log('%c12)ЯНДЕКС: ОТСОРТИРОВАТЬ МАССИВ ТОЛЬКО ПО НЕЧЕТНЫМ ЗНАЧЕНИЯМ', consoleLogStyles);

    // Отсортировать массив только по нечетным значениям
    // Четные элементы остаются на своих позициях, а нечетные меняют свою позицию по возрастанию
    const arr = [4, 3, 7, 2, 6, 1, 5, 8, 9];

    const sortOdd = arr => {
      // Можно написать item % 2 !== 0 заменить на item % 2, так она возвращает 0 -> false
      const sortedOddNumbers = arr.filter(num => num % 2 !== 0).sort((a, b) => a - b);
      let i = 0;

      return arr.map(num => (num % 2 ? sortedOddNumbers[i++] : num));
    };

    console.log('Отсортировать массив только по нечетным значениям', sortOdd(arr));
  })();

  // ! 13
  (function () {
    console.log('%c13)ЯНДЕКС: ФУНКЦИЯ РАНДОМНОГО HEX ЦВЕТА + из RGB в HEX', consoleLogStyles);

    // Конвертировать цвет rgb() в HEF и обратно
    // https://webhamster.ru/mytetrashare/index/mtb0/4024
    // https://www.codewars.com/kata/513e08acc600c94f01000001/train/javascript

    // #Вспомогательная функция: Получения из числа шестнадцатеричное представление
    function hex(n) {
      let str = Number(n).toString(16).toUpperCase();
      if (str.length < 2) str = '0' + str;
      return str;
    }

    // # Конвертация из RGB в HEX
    function convertToHex(r, g, b) {
      const param = [...arguments];

      return param
        .map(num => {
          if (num < 0) return hex(0);
          if (num > 255) return hex(255);
          return hex(num);
        })
        .join('');
    }

    const hef = convertToHex(173, 255, 47); //  ADFF2F
    console.log('Конвертация из RGB в HEX', hef);

    // # Вспомогательная функция: Группировка в подмассивы
    const getGroup = (arr, group) =>
      arr.reduce((acc, item, index) => {
        if (index % group === 0) acc.push([item]);
        else acc[acc.length - 1].push(item);
        return acc;
      }, []);

    // # Конвертация из HEX в RGB
    function convertToRga(str) {
      const rgb = str => parseInt(str, 16);
      const param = str.split('');
      const group = getGroup(param, 2);
      // Можно заменить на group.flatMap( item => rgb(item.join('')))
      const result = group.reduce((acc, item) => [...acc, rgb(item.join(''))], []);

      return result.join(', ');
    }

    console.log('Конвертация из HEX в RGB', convertToRga(hef)); // 173, 255, 47

    // # Функция рандомного HEX цвета:
    function getRandomHexColor() {
      const MAX_RGA = 255;
      const randomNumber = () => Math.floor(Math.random() * (MAX_RGA + 1));
      const convertToHex = num => Number(num).toString(16).padStart(2, 0);
      const randomHex = Array.from({ length: 3 }, () => convertToHex(randomNumber()));
      return '#' + randomHex.join('');
    }

    // # Функция №2 рандомного HEX цвета:
    const generateHex = () => {
      const hex = Math.floor(Math.random() * 256 ** 3)
        .toString(16)
        .padStart(6, '0')
        .toUpperCase();
      return `#${hex}`;
    };

    console.log('Рандомный HEX цвет', getRandomHexColor());
  })();

  // ! 14
  (function () {
    console.log('%c14)ЯНДЕКС: ГЕНЕРАЦИЯ РАНДОМНОГО БАННЕРА', consoleLogStyles);

    // Массив с баннерами, w (weight) - вес, означает на сколько баннер должен выводиться чаще чем другие
    // относительно того на сколько больше или меньше вес других баннеров
    // Банеров может быть сколько угодно, вес может быть дробным, но всегда положительным

    // Необходимо написать функцию которая добавляет Random баннер
    const banners = [
      // Первый баннер встречается в 13 раз реже чем соседний
      { w: 10, id: 1 },
      { w: 38, id: 2 },
      { w: 130, id: 3 },
    ];

    // # Вставить рандомный баннер относительно своего веса в массив баннеров
    function getRandomBanners(banners) {
      const max = banners.reduce((acc, { w }) => Math.max(acc, w), 0);
      const min = banners.reduce((acc, { w }, i, arr) => Math.min(acc, w), Infinity);
      const randomRange = Math.floor(Math.random() * (max - min + 1)) + min;

      return [
        ...banners.filter(({ w }) => w <= randomRange),
        { w: randomRange, id: 10 },
        ...banners.filter(({ w }) => w >= randomRange),
      ];
    }

    console.log('Вставленный рандоной ширины Баннер', getRandomBanners(banners));
    // [ { w: 10, id: 1 }, { w: 38, id: 2 },{ w: 55, id: 10 },{ w: 130, id: 3 } ]

    // # Вернуть id - того банера который ближе всего относительно рандмного числа суммы всех баннеров
    function getRandomBannerId(banners) {
      const sum = banners.reduce((acc, { w }) => acc + w, 0);
      const random = Math.floor(Math.random() * (sum + 1));

      let countWeight = 0;

      for (const { w, id } of banners) {
        countWeight += w;

        // Если вес баннера стал больше чем сумма всех остальных
        // банеров к рандомному числу - это ближайший баннер
        if (countWeight >= random) {
          return id;
        }
      }
    }

    console.log('Вернуть id - того банера который ближе всего', getRandomBannerId(banners));
  })();

  // ! 15
  (function () {
    console.log('%c15)ЯНДЕКС: ПОСЧИТАТЬ СУММУ В МНОГОМЕРНОМ МАССИВЕ', consoleLogStyles);

    const arr = [[1, [1, 2], 2], '6x'];

    const getSum = arr => {
      return arr.reduce((acc, item) => {
        if (Array.isArray(item)) {
          return acc + getSum(item);
        }
        return acc + (parseInt(item) || 0);
      }, 0);
    };

    console.log('Сумма чисел в многомерном массиве', getSum(arr));

    const getSum2 = arr => arr.flat(Infinity).reduce((acc, item) => acc + parseInt(item), 0);
  })();

  // ! 16
  (function () {
    console.log('%c16)ЯНДЕКС: ПРОВЕРКА МАССИВА НА МОНОТОНОСТЬ', consoleLogStyles);

    // Проверка массива на монотонность
    const isMonotone = arr => {
      // В какую сторону будет начинаться монотонность: слева направо или справа налево
      const isPositive = arr[0] >= arr[arr.length - 1];

      // i = 1 -> потому что будет сравниваться с предыдущим
      // isPositive - false
      // arr[i] >= arr[i - 1 ~ 1 >= 1, 5 >= 1, 9 >= 5, 15 >= 9
      for (let i = 1; i < arr.length; i++) {
        const isCorrect = isPositive ? arr[i] <= arr[i - 1] : arr[i] >= arr[i - 1];
        if (!isCorrect) return false;
      }

      return true;
    };

    console.log('Является ли массив монотонным?', isMonotone([1, 1, 5, 9, 15]));
    // console.log(isMonotone([0, 1, 1, 5, 9, 9, 15]));
    // console.log(isMonotone([2, 2, 0, -1]));
  });

  // ! 17
  (function () {
    console.log(
      '%c17)Жадный Алгоритм: Нахождения оптимального заправки от точки А до точки Б',
      consoleLogStyles
    );

    const arr = [0, 375, 550, 750, 950];

    // ! Жадный Алгоритм
    // ! Как найти оптимальную остановку для заправки

    // # Функция нахождения оптимального колличества остановок
    function minStopsCount(stations, capacity) {
      const arr = [];
      // Оптимальное количество остановок от точки А до точки B
      let result = 0;
      // индекс остановки
      // никогда не будет больше чем индекс последний остановки
      let currentStop = 0;

      // * Будем ехать, пока не доедим до последней остановки
      while (currentStop < stations.length - 1) {
        // Следующая заправка на которой выгодней всего заправиться
        // Она должна быть дальше всех, по при этом расстояние до нее
        // Должно быть меньше чем capacity
        let nextStop = currentStop;

        // nextStop < stations.length - не выходим за пределы максимальной точки
        // stations[nextStop + 1] - stations[currentStop] - можем ли мы доехать до следующей заправки
        while (
          nextStop < stations.length - 1 &&
          stations[nextStop + 1] - stations[currentStop] <= capacity
        ) {
          // * Не выйдем из этого цикла пока один из условий не будет false;
          // Индекс наибольнее дальней, но достижимой заправки
          nextStop++;
        }

        // * Мы не можем доехать не до одной заправки
        if (currentStop === nextStop) {
          return -1;
        }

        // Если следующая точка не является конечной точкой, является заправкой
        if (nextStop < stations.length - 1) {
          result++;
        }

        currentStop = nextStop;
      }

      return result;
    }

    console.log('Минимальное количество остановок:', minStopsCount(arr, 400));

    const roads = [0, 200, 375, 550, 750, 950, 1200, 1300, 1500, 1600, 1800];

    // # Определения на каком километре, необходимо сделать остановку для заправки
    // capacity вместимость бензобака в машине
    const minStops = (stations, capacity) => {
      // Мутируемая копия входящего массива
      let tmp = stations.slice();
      // Массив с оптимальными остановками
      let result = [];
      // Длина массива с остановками которые возможно проехать согласно capacity
      let stopCount = 0;
      // Сколько километров от последней выгодной до следующей остановки еще можно проехать
      let capacityCount = capacity;
      // Функция получения остановок на прохождения которых хватит бензина
      const getStops = (arr, x) => arr.filter(item => x >= item);

      while (tmp.length > 0) {
        // Массив остановок на которые хватит бензина
        const stops = getStops(tmp, capacityCount);
        // Остановка на которой следует заправиться
        const lastStop = stops[stops.length - 1];

        // Если 0 значит не хвататет capacity для следующей остановки или когда бензина хватает до конца перечисленных остановок
        if (lastStop === 0 || stops.length === tmp.length) return result;

        // На сколько еще километров хватит бензина
        capacityCount = lastStop + capacity;
        // Сохраняю остановку до которой хватило бензина (самая оптимальная)
        result.push(lastStop);
        // Обрезаю массив, на длину которую уже прошли.
        tmp.splice(0, stops.length);
      }

      return result;
    };

    console.log('Нужно сделать остановку для заправки: ', minStops(roads, 400)); // [ 375, 750, 950, 1300, 1600 ]
  })();

  // ! 18
  (function () {
    console.log('%c18) Проверить последовательность скобок валидной', consoleLogStyles);

    /*
      По условиям: на вход нам приходит строка, содержащая только символы скобок.
      Следующие символы скобочек: ( ) { } [ ].
      Необходимо написать функцию, которая проверит такую строку и вернет в результате true или false —
      в зависимости от того, является ли данная последовательность скобок валидной или нет.
    */

    function isValid(str) {
      let stack = [];

      const brackets = {
        ')': '(',
        '}': '{',
        ']': '[',
      };

      for (let i = 0; i < str.length; i++) {
        const current = str[i]; // ?
        // Cкобка: закрывающая
        if (isCloseBrackets(current)) {
          // Необходимо проверить, что для закрывающей скорбки в стеке лежит открывающая скобка
          // ! в стеке лежит или закрывающая скобка не равна
          if (brackets[current] !== stack.pop()) return false;
        } else {
          // Если открывающаяся
          stack.push(current);
        }
      }

      return stack.length === 0;
    }

    function isCloseBrackets(character) {
      return [')', '}', ']'].includes(character);
    }

    // isValid("()") //=>  true
    isValid('()[]{}'); //=> true
    isValid('(]'); //=> false
    isValid('([)]'); //=> false
    isValid('{[]}'); //=> rue

    function isValid2(str) {
      let stack = [];

      const BracketsMap = {
        '(': ')',
        '[': ']',
        '{': '}',
      };

      for (let i = 0; i < str.length; i++) {
        const current = str[i];

        if (BracketsMap[current]) {
          stack.push(current);
          continue;
        }

        if (BracketsMap[stack.pop()] !== current) return false;
      }

      return stack.length === 0;
    }

    isValid2('[()[{}]{}]'); // ?
    // isValid2('(]'); // ?
  })();

  // ! 19
  (function () {
    console.log('%c19) Яндекс: Восстановить маршрут поездки по билетам', consoleLogStyles);

    // Что приходит на вход
    const input = [
      { from: 'С.Петербург', to: 'Минск' },
      { from: 'Киев', to: 'Новосибирск' },
      { from: 'Череповец', to: 'Москва' },
      { from: 'Минск', to: 'Киев' },
      { from: 'Москва', to: 'С.Петербург' },
    ];

    // Что должно быть на выходе
    const output = [
      { from: 'Череповец', to: 'Москва' },
      { from: 'Москва', to: 'С.Петербург' },
      { from: 'С.Петербург', to: 'Минск' },
      { from: 'Минск', to: 'Киев' },
      { from: 'Киев', to: 'Новосибирск' },
    ];

    // Создания Хэш мапов с направлениями по городам
    const sortPaths = sites => {
      const { fromMap, toMap } = sites.reduce(
        (acc, { from, to }) => {
          acc.fromMap[from] = to;
          acc.toMap[to] = from;

          return acc;
        },
        { fromMap: {}, toMap: {} }
      );

      // Нахождение первого начала пути: { from: 'Череповец', to: 'Москва' }
      const findFirstSite = sites.find(site => {
        return !toMap[site.from];
      });

      const results = sites.reduce(
        (acc, _site, index) => {
          const prevFrom = acc[index]?.to; // Москва С.Петербург Минск Киев Новосибирск
          const nextTo = fromMap[prevFrom]; // Петербург Минск Киев Новосибирск undefined

          if (nextTo) {
            acc.push({
              from: prevFrom,
              to: nextTo,
            });
          }

          return acc;
        },
        [findFirstSite]
      );

      return results;
    };

    // JSON.stringify(sortPaths(input)) === JSON.stringify(output); //=> true
  });
})();

// ! 20
(function () {
  console.log('%c20) Банкомант: Выдача купюр из переданной суммы', consoleLogStyles);
  /*

    ! Задача Банкомант (Простая версия) -> когда бесконечное количество купюр и удобный номинал

    Есть купюры и монеты номиналами: 1, 5, 10, 50, 100, 1000, 5000.
    В банкомате неограниченное количество купюр каждого номинала.
    Мы хотим снять со счета n рублей.

    Нужно определить минимальное суммарное количество купюр и монет,
    которое может выдать банкомат, чтобы сумма получилась ровно n.

    Будет неограниченное количество банкнот в банкомате, а также "удобные" номиналы


    Жадное решение, будем выбирать купюры по убыванию.
  */

  // # Решение через: Деление или остаток от деления %
  function getAmountBills(sum) {
    // Номиналы купюр
    const denominations = [1, 5, 10, 50, 100, 1000, 2000, 5000];
    let currentSum = sum;

    return denominations.reduceRight(
      (acc, denomination) => {
        // Чтобы лишний раз не умножать и не удалять 0 в currentSum: (2 1 0 0 0 1) ~ 2 1 1 1
        if (currentSum >= denomination) {
          // Количество купюр которое влазит в текущию сумму
          // Например: 11006 / 5000 ~ 2 два раза
          const curentAmount = Math.floor(currentSum / denomination); // 2 1 1 1
          // Вычитаем из полученной суммы выбранный номинал копюр * их вмещаемое колличество
          currentSum -= denomination * curentAmount;
          // ! Можно заменить и удалять при помощи остатка от деления
          // currentSum %= denomination

          acc.amountBills += curentAmount;
          acc.bills.push(...Array(curentAmount).fill(denomination));
        }

        return acc;
      },
      {
        amountBills: 0, // Количество выданных купюр
        bills: [], // Купюра которые вмещаются
      }
    );
  }

  // console.log(getAmountBills(11006)); //=> { amountBills: 5, bills: [ 5000, 5000, 1000, 5, 1 ] }

  // # Решение через: While
  function iWantToGet(amountRequired) {
    if (amountRequired <= 0) return [];

    const availableBanknotes = [100, 50, 20, 10];
    let sum = amountRequired;

    return availableBanknotes.reduce((results, banknote) => {
      // Проверям на то сколько раз можно отнять купюру из переданной суммы
      // 260 - 100 = 160 - 100 = 60 - 100 = -40 -> stop, можно отнять только 2 раза
      while (sum - banknote >= 0) {
        sum -= banknote;
        results.push(banknote);
      }

      return results;
    }, []);
  }

  // console.log(iWantToGet(260)); //=> [ 100, 100, 50, 10 ]

  /*
    ! Задача Банкомант (Сложная версия) -> будет ограниченное количество банкнот в банкомате и они будут нестандартного номинала

    Если мы не можем выдать ту сумму которую просят, по причине недостаточно денег или
    сумма с не подходящим номиналом: 5, то ничего не выдаем.
  */

  const banknotesLimits = { 1000: 5, 500: 2, 100: 5, 50: 5, 30: 6 };

  // # Через рекурсию
  function iWantToGetHard(amountRequired, limmits) {
    /* Рекурсивная функция */
    const collect = (amount, nominals) => {
      // Базовый случай
      if (amount === 0) return {};

      // Базовый случай: Невалидные случаи
      if (!nominals.length) return undefined;

      // текущий номинал купюр
      let currentNominals = nominals[0];

      // Количество доступных банкнот выбранного номинала
      let countBanknote = limmits[currentNominals];

      // Какое количество банкнот текущего номинала нам необходимо
      // Количество купюр которое влазит в текущию сумму
      let neededBanknote = Math.floor(amount / currentNominals);

      // То количество банкнот данного номинала которое будет выдаваться
      // Так как для выдачи необходимо например две купюры 100, но осталось 0, все израсходывали (countBanknote: 0), или же neededBanknote: 2, countBanknote: 100
      // НО необходимо отдать только доступную банкноту
      let numberOfBanknote = Math.min(countBanknote, neededBanknote);

      /*
        Цикл for: Алгоритм который для замены и поиска доступного номинала, чтобы тот покрыл полностью сумму
        Например сумма 120: выдает 100 -> остается 20, но такого номинала нет и срабатывает: Невалидные случаи.
        Но выдать текущую сумму можно при помощи номиналом: 30 * 4 = 120
       */

      for (let i = numberOfBanknote; i >= 0; i--) {
        // Вычитаем из полученной суммы выбранный номинал копюр * их вмещаемое колличество
        // оставшиеся номиналы минус уже проверянные
        let results = collect(amount - currentNominals * i, nominals.slice(1));

        if (results) {
          // До того момента когда есть что выдавать
          return i ? { [currentNominals]: i, ...results } : results;
        }
      }
    };

    const nominals = Object.keys(limmits)
      .map(Number)
      .sort((a, b) => b - a); // [ 1000, 500, 100, 50, 30 ]

    return collect(amountRequired, nominals);
  }

  // console.log(iWantToGetHard(110, banknotesLimits)); //=> { 30: 2, 50: 1 }
  // console.log(iWantToGetHard(120, banknotesLimits)); //=> { 30: 4 }
  // console.log(iWantToGetHard(240, banknotesLimits)); //=> { 30: 3, 50: 1, 100: 1 }
})();
