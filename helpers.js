import { SIZE } from "./config.js";
import { state, gameBoard, btnNewGame, whosTurn } from "./script.js";

export const cordsToEl = function (row, col) {
  return gameBoard.querySelector(`.cell-${row}-${col}`);
};

export const isValidTarget = function (e) {
  if (!e.target.classList.contains("cell")) return false;
  if (e.target.textContent !== "") return false;

  const cords = e.target.dataset.id.split("");
  if (cords.some((i) => i < 0) || cords.some((i) => i > SIZE)) return false;
  else return true;
};

export const isSizeInARow = function (row, col, addDown, addRight) {
  const sign = cordsToEl(row, col).textContent;
  if (sign === "") return false;

  let cords = [row + addDown, col + addRight];
  let counter = 1;
  for (let i = 1; i < SIZE; i++) {
    if (cordsToEl(...cords).textContent !== sign) break;
    if (cordsToEl(...cords).textContent === sign) counter++;
    cords = [cords[0] + addDown, cords[1] + addRight];
  }

  if (counter === SIZE) return true;
  return false;
};

export const isWin = function () {
  for (let row = 1; row <= SIZE; row++) {
    for (let col = 1; col <= SIZE; col++) {
      let flag = false;
      if (cordsToEl(row, col).textContent === "") break;

      // check distance to right wall
      // check if SIZE in row
      if (SIZE - col + 1 >= SIZE) flag = isSizeInARow(row, col, 0, 1);
      if (flag) return true;

      // check distance to bottom wall
      // check if SIZE in col
      if (SIZE - row + 1 >= SIZE) flag = isSizeInARow(row, col, 1, 0);
      if (flag) return true;

      // check if SIZE in dia
      if (SIZE - row + 1 >= SIZE && SIZE - col + 1 >= SIZE)
        flag = isSizeInARow(row, col, 1, 1);
      if (flag) return true;
    }
  }
  return false;
};

export const isTie = function () {
  for (let row = 1; row <= SIZE; row++) {
    for (let col = 1; col <= SIZE; col++) {
      if (cordsToEl(row, col).textContent === "") return false;
    }
  }
  return true;
};

export const switchPlayers = function () {
  if (state.turn === "X") {
    state.turn = "O";
    whosTurn.textContent = `${state.turn}'s turn!`;
    return;
  }
  if (state.turn === "O") {
    state.turn = "X";
    whosTurn.textContent = `${state.turn}'s turn!`;
    return;
  }
};

export const randomPlayer = function () {
  const rand = Math.random();
  if (rand < 0.5) return "X";
  if (rand > 0.5) return "O";
};
