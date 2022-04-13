/*
  Глава 1: Знакомство с алгоритмами
  Логирифм - операция, обратная возведенью в степень.

  Бинарный поиск - скорость выполнения O(log n) - логарифмическое время

  log(128) ~ 2 в 7 степени = 128 - Ответ: 7 операций

  Для  бинарного поиска в худшем случае потребуется не более log(n) проверок
  Для списка из 8 элеменИтов log(8) === 3, потому что 2 в третьей степени === 8

  ! Бинарный поиск работает только в том случае, если список отсортирован.
*/

// Отсортированный массив
const tmp = [1, 3, 5, 7, 9];

function binarySearch(list, item) {
  let low = 0;
  let high = list.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const guess = list[mid];

    if (guess === item) {
      return mid;
    }

    if (guess > item) {
      high = mid - 1;
    }

    if (guess < item) {
      low = mid + 1;
    }
  }

  return null;
}

// binarySearch(tmp, 9); // ?

{
  /* Глава 2: Сортировка выбором О(n^2) - квадратичная */

  // Функция для поиска наименьшего элемента массива
  function findSmallest(arr) {
    // Для хранения наименьшего значения
    let smallest = arr[0];
    // Для хранения индекса наименьшего значения
    let smallestIndex = 0;

    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];

      if (element < smallest) {
        smallest = element;
        smallestIndex = i;
      }
    }

    return smallestIndex;
  }

  function findSmallestReducer(arr) {
    return arr.reduce(
      (acc, item, i) => {
        if (item < acc.smallest) {
          acc.smallest = item;
          acc.smallestIndex = i;
        }

        return acc;
      },
      {
        smallest: arr[0],
        smallestIndex: 0,
      }
    );
  }

  // findSmallestReducer([5, 3, 6, 2, 10]); //=> { smallest: 2, smallestIndex: 3 }

  // Функция сортировки
  function selectionSort(arr) {
    const cloneArr = arr.slice();
    const newArr = [];

    while (cloneArr.length) {
      // const smallestIndex = findSmallest(cloneArr);
      // const smallest = cloneArr[smallestIndex];

      // Через Reducer
      const { smallest, smallestIndex } = findSmallestReducer(cloneArr);
      newArr.push(smallest);
      // Уменьшаю на найденный минимальный элемент в первоначальном массиве
      //=> cloneArr - [ 5, 3, 6, 2, 10 ] => [ 5, 3, 6, 10 ] =>[ 5, 6, 10 ] => [ 6, 10 ] => [ 10 ]
      cloneArr.splice(smallestIndex, 1);
    }

    return newArr;
  }

  selectionSort([5, 3, 6, 2, 10]); // ? [ 2, 3, 5, 6, 10 ]
  // selectionSort([5, 3, 6, 2, 10]); //=> [ 2, 3, 5, 6, 10 ]

  // https://medium.com/@alivander/%D1%81%D0%BE%D1%80%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0-%D0%B2%D1%8B%D0%B1%D0%BE%D1%80%D0%BE%D0%BC-javascript-a5610af309c8
  const selectionSort2 = arr => {
    for (let i = 0; i < arr.length; i++) {
      let indexMin = i;

      for (let j = i + 1; j < arr.length; j++) {
        // От знака > или < зависит в как отсортируется массив в большую или меньшую сторону
        if (arr[indexMin] < arr[j]) {
          indexMin = j;
        }
      }

      if (indexMin !== i) {
        [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
      }
    }

    return arr;
  };

  // selectionSort2([5, 3, 6, 2, 10]); //=> [ 10, 6, 5, 3, 2 ]

  // Сумма чисел
  function sum(arr) {
    if (!arr.length) return 0;
    return arr.pop() + sum(arr);
  }

  // sum([1, 2, 3, 5]); //=> 11

  // Наибольшее число в списке
  function max(arr) {
    if (arr.length === 2) {
      return arr[0] > arr[1] ? arr[0] : arr[1];
    }
    const subMax = max(arr.slice(1));

    return arr[0] > subMax ? arr[0] : subMax;
  }

  // max([3, 11, 1, 25, 3, 526, 5, 10]); //=> 526
}

{
  /* Глава 4: Быстрая сортировка.
   Стратегия разделяй и властвуй - основана на разбиении задачи на уменьшающиеся фрагменты.
   Если вы используете стратегию "разделяй и властвуй" со списком, то базовым случаем, скорее всего,
    является пустой массив или массив из одного элемента.

  Стратегия разделяй и властвуй, следовательно, массив должен разделяться до тех пор, пока не приведем к базову случаю.

  1. Выбрать опорный элемент
  2. Разделить массив на два подмассива: элементы, меньшие опорного и элементы, большего  опорного
  3. Рекурсивно применить быструю сортировку к двум подмассивам

  Алгоритм быстрой сортировки уникален тем, что его скорость зависит от выбора ОПОРНОГО элемента arr[0]

  С быстрой сортировкой дела обстоят сложнее. В худщем случае быстрая сортировка работает за О(n^2) - квадратичная
  Ничем не лучше сортировки выбором! Но это в худший случай, а в среднем быстрая сортировка выполняется
    за O(n * log n) - линейно алгоритмическая сложность.
*/

  function quickSort(arr) {
    // Базовый случай: массивы с 0 и 1 элементы уже отсортированы
    if (arr.length < 2) return arr;

    // Рекурсивный случай
    // выбираем опорный элемент
    const pivot = arr[0];

    let updatedArr = arr.slice(1);
    let less = updatedArr.filter(n => n <= pivot);
    let greater = updatedArr.filter(n => n > pivot);

    // От меньшего к большему
    return [...quickSort(less), pivot, ...quickSort(greater)];
  }

  // quickSort([10, 5, 36, 2, 3]); //=> [ 2, 3, 5, 10, 36 ]
}

/* Глава 6: Поиск в ширину
    Поиск в ширину выполняется за время О(количество людей + количество ребер)
    Что обычно записывается в форме O(V+E)(V - количество вершин, Е-количество ребер)

    Граф без весом называется невзвешенным графом.
    Для вычисления (невзвешенного графа) - используется поиск в ширины
*/

{
  const graph = {};
  // Ключи - это ноды, массив это ребры на другие ноды
  graph['you'] = ['alice', 'bob', 'claire'];
  graph['bob'] = ['anuj', 'peggy'];
  graph['alice'] = ['peggy'];
  graph['claire'] = ['thom', 'jonny'];
  graph['anuj'] = [];
  graph['peggy'] = [];
  graph['thom'] = [];
  graph['jonny'] = [];

  const isPersonSalles = person => person.endsWith('m');

  function search(name) {
    // Начальная node и ее связи в виде массива
    const fistNode = graph[name];

    // Очередь поиска (FIFO: First In, First Out)
    const searchQueue = [...fistNode];

    // Массив для используемый для отслеживания уже проверенных node
    const searched = [];

    while (searchQueue.length) {
      // Первое имя из очереди
      const person = searchQueue.shift();

      // Человек проверяется в том случае, если он не проверялся ранее
      if (!searched.includes(person)) {
        if (isPersonSalles(person)) {
          // Нашлась искомая node
          console.log('Продавец Манго', person); // Продавец Манго thom
          return true;
        } else {
          const nextNode = graph[person];

          searchQueue.push(...nextNode);
          searched.push(person);
        }
      }
    }

    // Продавка Манго нет в графе
    return false;
  }
  // search('you'); // ?
}

{
  /* Глава 7: Алгоритм Дейкстры
    В графе ищется путь с наименьшим весом.

    Когда работаем с алгоритмом Дейкстры, с каждым ребром графа связывается число, называемое весом.
     - Граф с весами называются взвешенным графом. (Алгоритм Дейкстры)
     - Граф без весом называется невзвешенным графом. (Поиск в ширину)

    В графах также могут присутствовать циклы: Пусть начинающий из А может вернуться к узлу А.

      - Граф (Направленный, Ориентированный) - В ориентированном графе направление имеет значение.
          т.е. ребро 2 -> 3 означает, что ребро направлено. Существует только ребро от 2 до 3 и нет ребра от 3 до 2.
          Поэтому вы можете перейти от вершины 2 к вершине 3, но не от 3 к 2.

      - Граф (Ненаправленный, Неориентированный) - В неориентированном графе 2-3 означает, что ребро не имеет направления,
          т.е. 2-3 означает, что вы можете перейти как от 2 к 3, так и от 3 к 2.
            В Ненаправленном графе каждое новое ребро добавляет еще один цикл.

      ! Алгоритм Дейстры работает только с направленными ациклическими графами, которые
        нередко обозначаются сокращением (DAG - Direacted Acyclic Graph)
      ! Алгоритм Дейстры не может быть применен при наличие ребер с отрицательным весом.
        # Если необходимо найти кратчайший путь в графе, содержащем с ребра отрицательным весом,
          для этого необходимо применить алгоритмом: Беллмана-Форда.


    Алгоритм:
      1) Пока остаются необработанные узлы
      2) Взять узел, ближайший к началу
      3) Обновить стоимость для его соседей
      4) Если стоимость каких-либо соседей были обновлены,
        обновить и родителей
      5) Пометить узел как обработанный
      6) Вернуться на шаг 1

  */
  // Граф для поиска
  const graph = {
    start: {
      a: 6,
      b: 2,
    },
    a: {
      fin: 1,
    },
    b: {
      a: 3,
      fin: 5,
    },
    fin: {},
  };

  function findLowerCostNode(costs, processend) {
    const lowerCost = Infinity;
    const lowerCostNode = null;

    for (const node in costs) {
      const cost = costs[node];

      // Если это узел с наименьшей стоимостью из уже виденных и он не был обработан
      if (cost < lowerCost && !processend.includes(node)) {
        lowerCost = cost;
        lowerCostNode = node;
      }
    }

    return lowerCostNode;
  }

  function dijkstra(graph) {
    // Хеш-таблица для стоимости переходов
    const costs = {};

    // Хеш-таблица для родителей
    const parents = {};

    // Массив для уже обработанных узлов
    const processend = [];

    // Найти узел с наименьшей стоимостью среди необработанных
    const node = findLowerCostNode(costs);

    // while() {

    // }
  }
}

{
  /*
     В техни­ческой терминологии:
      на каждом шаге выбирается локально-оптимальное решение,
      а в итоге вы получаете глобально-оптимальное решение.

    Иногда идеальное - враг хорошего. В некоторых случаях достаточно алгоритма, способного решить задачу
    достаточно хорошо. И в таких областях жадные алгоритмы работают просто отлично, потому что они просто
    реализуются, а получен­ное решение обычно близко к оптимуму
  */

  /*

    Задача о покрытии множества

    Вы открываете собственную авторскую программу на радио и хотите, чтобы вас слушали во всех штатах.
    Нужно решить, на каких радиостанциях должна транслироваться ваша передача.
    Каждая станция стоит денег, поэтому количество станций не­обходимо свести к минимуму.

    Выбрать станцию, покрывающую наибольшее количество штатов, еще не входящих в покрытие.
    Если станция будет покрывать некоторые штаты, уже входящие в покрытие, это нормально.
  */

  // Штаты которые необходимо покрыть
  const states = ['mt', 'wa', 'or', 'id', 'nv', 'ut', 'са', 'az'];

  /* Ключи - названия станций, а значения - сокращенные обозначения шта­тов, входящих в зону охвата */
  const stations = {
    kone: new Set(['id', 'nv', 'ut']),
    ktwo: new Set(['wa', 'id', 'mt']),
    kthree: new Set(['or', 'nv', 'са']),
    kfour: new Set(['nv', 'ut']),
    kfive: new Set(['ca', 'az']),
  };

  const getIntersection = (setA, setB) => new Set([...setA].filter(x => setB.has(x)));
  const getDifference = (setA, setB) => new Set([...setA].filter(x => !setB.has(x)));

  // выбирает подмножество,
  // в которое входит больше всего непокрытых элементов
  function getBestSubset(setToCover, subsets) {
    let bestSubset = undefined;
    let covered = new Set();

    Object.keys(subsets).forEach((subset, i) => {
      // сколько еще непокрытых штатов обслуживает станция
      let subsetCovered = getIntersection(setToCover, subsets[subset]);

      if (subsetCovered.size > covered.size) {
        bestSubset = subset;
        covered = subsetCovered;
      }
    });

    return bestSubset;
  }

  function greedySet(set, subsets) {
    let setToCover = new Set(set);
    // оптимальный набор подмножеств
    const finalSet = new Set();

    while (setToCover.size) {
      // получить лучшую станцию
      let bestSubset = getBestSubset(setToCover, subsets);

      // добавить ее в финальный набор
      finalSet.add(bestSubset);
      // убрать из набора штатов уже покрытые
      setToCover = getDifference(setToCover, subsets[bestSubset]);

      // Или так
      // subsets[bestSubset].forEach(item => {
      //   setToCover.delete(item)
      // })
    }

    return finalSet;
  }

  greedySet(states, stations); // ?
}
