let gameBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let currentPlayer = 'X'; // текущий игрок - крестики

function makeMove(row, col) {
  if (gameBoard[row][col] === 0) {
    // проверяем, что ячейка пустая
    gameBoard[row][col] = currentPlayer; // ставим крестик или нолик
    // переключаем игрока
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// function checkWin(combs, board, player) {
//   for (let i = 0; i < combs.length; i++) {
//     const [a, b, c] = combs[i];

//     if (board[a] === player && board[b] === player && board[c] === player) {
//       return true;
//     }
//   }
//   return false;
// }

const combs3 = [
  // горизонтали
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // вертикали
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // диагонали
  [0, 4, 8],
  [2, 4, 6],
];

const getCombination = size => {
  const data = Array.from({ length: size * size }, (_, index) => index);

  const horizontals = data.reduce((acc, item, index, arr) => {
    if (index % size === 0) {
      acc.push([item]);
    } else {
      acc.at(-1).push(item);
    }

    return acc;
  }, []);

  const verticals = horizontals[0].map((_, index) => horizontals.map(item => item[index]));

  const diagonals = horizontals.reduce(
    (acc, item, index) => {
      const left = item[index];
      const right = item[horizontals.length - 1 - index];

      acc[0].push(left);
      acc[1].push(right);

      return acc;
    },
    [[], []]
  );

  return [
    // горизонтальные линии
    ...horizontals,
    // вертикальные линии
    ...verticals,
    // диагонали
    ...diagonals,
  ];
};

// console.log(JSON.stringify(getCombination(3), null, 2) === JSON.stringify(combs3, null, 2));

const combs6 = [
  // горизонтальные линии
  [0, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29],
  [30, 31, 32, 33, 34, 35],
  // вертикальные линии
  [0, 6, 12, 18, 24, 30],
  [1, 7, 13, 19, 25, 31],
  [2, 8, 14, 20, 26, 32],
  [3, 9, 15, 21, 27, 33],
  [4, 10, 16, 22, 28, 34],
  [5, 11, 17, 23, 29, 35],
  // диагонали
  [0, 7, 14, 21, 28, 35],
  [5, 10, 15, 20, 25, 30],
];

// console.log(JSON.stringify(getCombination(6), null, 2) === JSON.stringify(combs6, null, 2));

const board = ['X', 0, 0, 0, 'X', 0, 0, 0, 'X'];

const checkWin = (board, player) => {
  // Квадратный корень из 9 ~ 3
  const size = Math.sqrt(board.length);

  const combinations = getCombination(size);
  return combinations.some((combination, i) => combination.every(index => board[index] === player));
};

checkWin(board, 'X'); // ?

// const matrix = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
// ];

// matrix.forEach((subArr, index, arr) => {
//   subArr[index] // ?
//   subArr[arr.length - 1 - index] // ?
// })
