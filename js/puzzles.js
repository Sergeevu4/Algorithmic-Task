/*

  Тестовое задание для прохождения курса Ильи Климова
  http://javascript.ninja/
  https://gist.github.com/xanf/9e11a5faf618a018737a9efd252746da

  ссылка для оплаты
  https://pay.javascript.ninja/jigsaw/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0Ijoiamlnc2F3IiwiciI6ImppZ3Nhdy0yMDIxMDEwNjIzMzA0MTM4Ni05MSIsImlhdCI6MTYwOTk3NTg0NH0.4sTY6C45rmLXYs2wiEOrUbHHrurqWpnjB5tNsUBKEAc
*/

const puzzles = [
  {
    id: 1,
    edges: {
      // ! Нужно повернуть первый пазл
      top: null,
      right: null,
      bottom: { edgeTypeId: 7, type: 'outside' }, // 'inside' если это выемка
      left: { edgeTypeId: 5, type: 'inside' },
    },
    // edges: {
    //   top: null,
    //   right: { edgeTypeId: 7, type: 'outside' }, // 'outside' если это выступ
    //   bottom: { edgeTypeId: 5, type: 'inside' }, // 'inside' если это выемка
    //   left: null,
    // },
  },
  {
    id: 2,
    edges: {
      top: { edgeTypeId: 3, type: 'outside' },
      right: { edgeTypeId: 34, type: 'outside' },
      bottom: null,
      left: null,
    },
  },
  {
    id: 3,
    edges: {
      top: { edgeTypeId: 2, type: 'outside' },
      right: null,
      bottom: { edgeTypeId: 4, type: 'outside' },
      left: { edgeTypeId: 6, type: 'inside' },
    },
  },
  {
    id: 4,
    edges: {
      top: { edgeTypeId: 34, type: 'inside' }, // left: null,
      right: { edgeTypeId: 11, type: 'outside' }, // top: { edgeTypeId: 34, type: 'inside' },
      bottom: { edgeTypeId: 7, type: 'inside' }, // right: { edgeTypeId: 11, type: 'outside' },
      left: null, // bottom: { edgeTypeId: 7, type: 'inside' },
    },
  },
  {
    id: 5,
    edges: {
      top: null,
      right: { edgeTypeId: 2, type: 'inside' },
      bottom: { edgeTypeId: 1, type: 'inside' },
      left: null,
    },
  },
  {
    id: 6,
    edges: {
      top: { edgeTypeId: 11, type: 'inside' },
      right: { edgeTypeId: 10, type: 'outside' },
      bottom: { edgeTypeId: 6, type: 'outside' },
      left: { edgeTypeId: 8, type: 'outside' },
    },
  },
  {
    id: 7,
    edges: {
      top: { edgeTypeId: 3, type: 'inside' },
      right: null,
      bottom: { edgeTypeId: 1, type: 'outside' },
      left: { edgeTypeId: 10, type: 'inside' },
    },
  },
  {
    id: 8,
    edges: {
      top: null,
      right: { edgeTypeId: 15, type: 'outside' },
      bottom: { edgeTypeId: 4, type: 'inside' },
      left: null,
    },
  },
  {
    id: 9,
    edges: {
      top: { edgeTypeId: 8, type: 'inside' },
      right: { edgeTypeId: 15, type: 'inside' },
      bottom: null,
      left: { edgeTypeId: 5, type: 'outside' },
    },
  },
];

// Неиспользуеммая функция для Транспонировать матрицу на 90 градусов
function firstPuzzleRotate90(firstPuzzle) {
  const edgesKey = Object.keys(firstPuzzle.edges);
  const widthMatrix = Math.floor(edgesKey.length / 2);

  const getMatrix = edgesKey.reduce((acc, key, i) => {
    if (i % widthMatrix === 0) acc.push([key]);
    else acc[acc.length - 1].push(key);
    return acc;
  }, []);

  const rotateMatrix = getMatrix
    .map((col, i) =>
      getMatrix
        .slice()
        .reverse()
        .map(row => row[i])
    )
    .flat();

  const newEdges = edgesKey.reduce((acc, edge, i) => {
    acc[rotateMatrix[i]] = firstPuzzle.edges[edge];
    return acc;
  }, {});

  return {
    ...firstPuzzle,
    edges: newEdges,
  };
}

// На сколько буду поворачивать/смещать пазл: (Откуда - Куда) = новое положение (поворот)
const rotateArray = (arr, k) => arr.slice(k).concat(arr.slice(0, k));

function getRotatePuzzle(puzzle, from, to) {
  const edgesKey = Object.keys(puzzle.edges);
  const rotate = rotateArray(edgesKey, from - to);

  const newEdges = edgesKey.reduce((acc, edge, i) => {
    acc[edge] = puzzle.edges[rotate[i]];
    return acc;
  }, {});

  return {
    ...puzzle,
    edges: newEdges,
  };
}

function findPuzzle(puzzles, prevPuzzle) {
  const { edgeTypeId: findId, type } = prevPuzzle;

  return puzzles.reduce(
    (found, puzzle) => {
      Object.entries(puzzle.edges).forEach(([key, value]) => {
        const isFoundPuzzle =
          value &&
          value.edgeTypeId === findId &&
          (type === 'outside' ? value.type === 'inside' : value.type === 'outside');

        if (isFoundPuzzle) {
          found.fromEdgeRotate = key;
          found.foundPuzzle = puzzle;
        }
      });

      return found;
    },
    // От кого края нужно повернуть, Следующий пазл
    { fromEdgeRotate: null, foundPuzzle: null }
  );
}

// То на сколько нужно повернуть пазл
const EDGE_TURN_ENUM = {
  top: 1,
  right: 2,
  bottom: 3,
  left: 4,
};

/* Получения следующего пазла,  */
function getNextPuzzle(puzzles, prevPartPuzzle, toEdgeRotate) {
  const { fromEdgeRotate, foundPuzzle } = findPuzzle(puzzles, prevPartPuzzle);

  const nextPuzzle = getRotatePuzzle(
    foundPuzzle,
    EDGE_TURN_ENUM[fromEdgeRotate],
    EDGE_TURN_ENUM[toEdgeRotate]
  );

  return nextPuzzle;
}

function solvePuzzle(puzzles) {
  const SIZE_MATRIX = Math.sqrt(puzzles.length);

  const currentPuzzles = puzzles.map((puzzle, i) => {
    if (i === 0 && !puzzle.edges.right) {
      const [fromEdgeRotate] = Object.entries(puzzle.edges).find(([_, value]) => value);

      const newPuzzle = getRotatePuzzle(puzzle, EDGE_TURN_ENUM[fromEdgeRotate], EDGE_TURN_ENUM['right']);

      return newPuzzle;
    }

    return puzzle;
  });

  const finishPuzzles = currentPuzzles.reduce((acc, puzzle, i) => {
    // Согласно условию первый пазл всегда первый
    if (i === 0) {
      return acc.concat(puzzle);
    }

    const startNewCol = i % SIZE_MATRIX === 0;

    if (startNewCol) {
      // Первый пазл в ряду кроме последнего
      // Если 100 пазлов 0 10 20 30 40 50 60 70 80
      const firstPuzzleWithRow = i - SIZE_MATRIX;

      const prevPartPuzzle = acc[i - SIZE_MATRIX].edges.bottom;
      const nextPuzzle = getNextPuzzle(puzzles, prevPartPuzzle, 'top');
      return acc.concat(nextPuzzle);
    }

    if (!startNewCol) {
      const prevPartPuzzle = acc[acc.length - 1].edges.right;
      const nextPuzzle = getNextPuzzle(puzzles, prevPartPuzzle, 'left');
      return acc.concat(nextPuzzle);
    }

    return acc;
  }, []);

  return finishPuzzles.map(puzzle => puzzle.id);
}

// console.log(solvePuzzle(puzzles));
