"use strict";

import { SIZE } from "./config.js";
import {
  cordsToEl,
  isSizeInARow,
  isTie,
  isValidTarget,
  isWin,
  switchPlayers,
  randomPlayer,
} from "./helpers.js";

export const gameBoard = document.querySelector(".game-board");
export const btnNewGame = document.querySelector(".btn-new-game");
export const whosTurn = document.querySelector(".whos-turn");

export const state = {
  turn: "X",
  gameDone: false,
};

const createGameBoard = function () {
  gameBoard.textContent = "";
  for (let row = 1; row <= SIZE; row++) {
    gameBoard.insertAdjacentHTML("beforeend", `<tr class="row-${row}">`);
    for (let col = 1; col <= SIZE; col++) {
      const rowEl = document.querySelector(`.row-${row}`);
      rowEl.insertAdjacentHTML(
        "beforeend",
        `<td class="cell cell-${row}-${col}" data-id="${row}${col}"></td>`
      );
    }
    gameBoard.insertAdjacentHTML("afterend", `</tr>`);
  }
};

const placeMark = function (e) {
  e.target.textContent = state.turn;

  if (isWin()) {
    state.gameDone = true;
    whosTurn.textContent = `${state.turn} player won!`;
    return;
  }

  if (isTie()) {
    state.gameDone = true;
    whosTurn.textContent = `It's a draw!`;
  }

  if (!state.gameDone) switchPlayers();
};

////////////////////////////////////////////////
////////////////////////////////////////////////
// Init function

const init = function () {
  state.gameDone = false;

  // create board
  createGameBoard();

  // randomly choose who starts
  state.turn = randomPlayer();
  whosTurn.textContent = `${state.turn}'s turn!`;
  // call game function
};
init();

////////////////////////////////////////////////
////////////////////////////////////////////////
// Event listeners

btnNewGame.addEventListener("click", (e) => {
  e.preventDefault();
  init();
});

gameBoard.addEventListener("click", (e) => {
  e.preventDefault();
  if (isValidTarget(e) && !state.gameDone) placeMark(e);
});
