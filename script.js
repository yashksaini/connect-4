const startBtn = document.getElementById("startBtn");
const game = document.getElementById("game");
const gameBoard = document.querySelector("#gameBoard");
const showResult = document.querySelector("#showResult");
const resultDisc = document.querySelector("#resultDisc");
const COLS = 7;
const ROWS = 6;

let cells = Array(6)
  .fill(0)
  .map(() => Array(7).fill(0));

let lastValues = Array(7).fill(5);
let player = true; // true means player 1

// Function to draw the board
const drawBoard = () => {
  gameBoard.innerHTML = "";
  for (let j = 0; j < COLS; j++) {
    let rows = "";
    for (let i = 0; i < ROWS; i++) {
      if (cells[i][j] === 1) {
        rows += `<div class="player1 "></div>`;
      } else if (cells[i][j] === 2) {
        rows += `<div class="player2"></div>`;
      } else if (cells[i][j] === 3) {
        rows += `<div class="player1 center"><i class="fa-regular fa-circle"></i></div>`;
      } else if (cells[i][j] === 4) {
        rows += `<div class="player2 center"><i class="fa-regular fa-circle"></i></div>`;
      } else {
        rows += `<div class="dot"></div>`;
      }
    }
    gameBoard.innerHTML += `<div class="col" onclick="rowClick(${j})">${rows}</div>`;
  }
};
// Call function to draw board
drawBoard();

// To start the game
startBtn.addEventListener("click", () => {
  game.classList.remove("hide");
  startBox.classList.add("hide");
});

const rowClick = (value) => {
  let temp = lastValues[value];
  if (temp > -1) {
    if (player) {
      cells[temp][value] = 1;
    } else {
      cells[temp][value] = 2;
    }

    checkWinner(temp, value, player);
    player = !player;
    changeDisc();
    temp--;
  }
  lastValues[value] = temp;
  drawBoard();
};
const verticalCheck = (col, user) => {
  let count = 0;
  let checkValue = 2;
  if (user === true) {
    checkValue = 1;
  }
  for (let i = 0; i < ROWS; i++) {
    if (cells[i][col] === checkValue) {
      count++;
      if (count === 4) {
        i++;
        for (let k = 0; k < 4; k++) {
          i--;
          if (checkValue === 1) {
            cells[i][col] = 3;
          } else {
            cells[i][col] = 4;
          }
        }
        break;
      }
    } else {
      count = 0;
    }
  }
  if (count === 4) {
    return checkValue;
  } else {
    return null;
  }
};
const horizontalCheck = (row, user) => {
  let count = 0;
  let checkValue = 2;
  if (user === true) {
    checkValue = 1;
  }
  for (let j = 0; j < COLS; j++) {
    if (cells[row][j] === checkValue) {
      count++;
      if (count === 4) {
        j++;
        for (let k = 0; k < 4; k++) {
          j--;
          if (checkValue === 1) {
            cells[row][j] = 3;
          } else {
            cells[row][j] = 4;
          }
        }
        break;
      }
    } else {
      count = 0;
    }
  }
  if (count === 4) {
    return checkValue;
  } else {
    return null;
  }
};
const diagonal1Check = (row, col, user) => {
  let count = 0;
  let checkValue = 2;
  if (user === true) {
    checkValue = 1;
  }
  let newRow = row - 5;
  let newCol = col + 5;

  for (let i = 0; i < 11; i++) {
    newRow++;
    newCol--;
    if (getValidDisc(newRow, newCol) === checkValue) {
      count++;
      if (count === 4) {
        newRow++;
        newCol--;
        for (let k = 0; k < 4; k++) {
          newRow--;
          newCol++;
          if (checkValue === 1) {
            cells[newRow][newCol] = 3;
          } else {
            cells[newRow][newCol] = 4;
          }
        }
        break;
      }
    } else {
      count = 0;
    }
  }
  if (count === 4) {
    return checkValue;
  } else {
    return null;
  }
};
const diagonal2Check = (row, col, user) => {
  let count = 0;
  let checkValue = 2;
  if (user === true) {
    checkValue = 1;
  }
  let newRow = row - 5;
  let newCol = col - 5;

  for (let i = 0; i < 11; i++) {
    newRow++;
    newCol++;
    if (getValidDisc(newRow, newCol) === checkValue) {
      count++;
      if (count === 4) {
        newRow++;
        newCol++;
        for (let k = 0; k < 4; k++) {
          newRow--;
          newCol--;
          if (checkValue === 1) {
            cells[newRow][newCol] = 3;
          } else {
            cells[newRow][newCol] = 4;
          }
        }
        break;
      }
    } else {
      count = 0;
    }
  }
  if (count === 4) {
    return checkValue;
  } else {
    return null;
  }
};
const getValidDisc = (row, col) => {
  if (row >= ROWS || row < 0 || col >= COLS || col < 0) return null;

  return cells[row][col];
};

const checkWinner = (i, j, player) => {
  let winner =
    verticalCheck(j, player) ||
    horizontalCheck(i, player) ||
    diagonal1Check(i, j, player) ||
    diagonal2Check(i, j, player);

  if (winner) {
    gameOver(winner);
  }
};

const gameOver = (winner) => {
  player = !player;
  changeDisc();
  showResult.innerHTML = "Winner is Player " + winner;

  // Disable the board
  gameBoard.style.pointerEvents = "none";
};

const changeDisc = () => {
  if (player) {
    resultDisc.className = "player1";
  } else {
    resultDisc.className = "player2";
  }
};
