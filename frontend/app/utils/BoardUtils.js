const hasTile = [
  [false, false, true, false],
  [true, true, true, false],
  [true, false, false, false],
  [true, true, false, false],
  [false, true, false, false],
  [false, true, true, true],
  [false, false, false, true],
  [false, false, true, true],
  [true, true, true, false],
  [true, false, false, false],
  [true, true, false, false],
  [false, true, false, false],
  [false, true, true, true],
  [false, false, false, true],
  [true, true, true, true],
  [true, false, false, false],
  [true, true, false, false],
  [false, true, false, false],
  [false, true, true, true],
  [false, false, false, true],
  [false, false, true, true],
  [true, true, true, false],
  [true, false, false, false],
  [true, true, false, false],
  [false, true, false, false],
  [false, true, true, true],
  [false, false, false, true],
];

const tileTypes = ['empty', 'fact', 'quiz', 'education', 'chance', 'empty'];

const getRandomTile = (score, active) => {
  const type = Math.floor(Math.random() * tileTypes.length);
  return {
    score,
    type: tileTypes[type],
    active: active || false,
    advance: 1,
  };
};

export const makeBoard = (activeTile) => {
  const board = [];
  let score = 1;

  let prevRow = null;

  hasTile.forEach((row, i) => {
    const newRow = [];

    const isInverse = inverseDirection(row, prevRow);
    prevRow = row;

    let tilesInRow = row.filter(Boolean).length;
    let tileScore = isInverse ? score + tilesInRow - 1 : score;

    row.forEach((hasTile, j) => {
      if (hasTile) {
        newRow.push(getRandomTile(tileScore, activeTile === tileScore));
        tileScore = isInverse ? tileScore - 1 : tileScore + 1;
      } else {
        newRow.push(null);
      }
    });

    score += tilesInRow;
    board.push({ tiles: newRow });
  });

  return board;
};

export const updateActiveTile = (board, activeTile) => {
  return board.map((row) => {
    return {
      tiles: row.tiles.map((tile) => {
        if (tile && tile.score === activeTile) {
          return { ...tile, active: true };
        } else if (tile) {
          return { ...tile, active: false };
        } else {
          return null;
        }
      }),
    };
  });
};

const inverseDirection = (row, prevRow) => {
  if (!prevRow) return false;

  const { minIndex, maxIndex } = getMinMaxTrueIndex(row);
  const { minIndex: prevMin, maxIndex: prevMax } = getMinMaxTrueIndex(prevRow);

  return minIndex < prevMax;
};

function getMinMaxTrueIndex(arr) {
  let minTrueIndex = Infinity;
  let maxTrueIndex = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      minTrueIndex = Math.min(minTrueIndex, i);
      maxTrueIndex = Math.max(maxTrueIndex, i);
    }
  }

  // If there are no true values in the array
  if (minTrueIndex === Infinity) {
    return { minIndex: -1, maxIndex: -1 };
  }

  return { minIndex: minTrueIndex, maxIndex: maxTrueIndex };
}
