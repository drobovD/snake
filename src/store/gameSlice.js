import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    status: "Start",
    statusValues: {
      Start: "Pause",
      Pause: "Resume",
      Resume: "Pause",
    },
    snake: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
    snakeHead: { x: 1, y: 0 },
    apple: { x: 1, y: 1 },
    snakeSize: 2,
    direction: "d",
    stopCombinations: [
      ["w", "s"],
      ["s", "w"],
      ["a", "d"],
      ["d", "a"],
    ],
    savedKey: "d",
  },
  reducers: {
    changeStatus(state) {
      state.status = state.statusValues[state.status];
    },
    moveSnake(state) {
      if (state.status === "Restart") return;
      let { x, y } = state.snakeHead;
      switch (state.direction) {
        case "w":
          y = y <= 0 ? 9 : y - 1;
          break;
        case "a":
          x = x <= 0 ? 9 : x - 1;
          break;
        case "s":
          y = y >= 9 ? 0 : y + 1;
          break;
        case "d":
          x = x >= 9 ? 0 : x + 1;
          break;
      }
      state.snakeHead = { x, y };
      state.snake.push({ x, y });
      state.snake = state.snake.slice(-state.snakeSize);
    },
    saveKey(state, action) {
      for (let [a, b] of state.stopCombinations) {
        if (a === state.direction && b === action.payload) return;
      }
      state.savedKey = action.payload;
    },
    setDirection(state) {
      state.direction = state.savedKey;
    },
    checkApple(state) {
      let { apple, snakeHead, snake } = state;
      if (apple.x === snakeHead.x && apple.y === snakeHead.y) {
        let appleInSnake = null;
        do {
          apple.x = Math.floor(Math.random() * 10);
          apple.y = Math.floor(Math.random() * 10);
          appleInSnake = snake.find(
            (snakePart) => snakePart.x === apple.x && snakePart.y === apple.y
          );
        } while (appleInSnake);

        state.apple = apple;
        state.snakeSize++;
      }
    },
    checkGameOver(state) {
      let { x, y } = state.snakeHead;
      let snakeWithoutHead = state.snake.slice();
      snakeWithoutHead.pop();
      let crashPlace = snakeWithoutHead.find(snakePart => snakePart.x === x && snakePart.y === y);
      if (crashPlace) state.status = "Restart";
    },
  },
});

export const {
  changeStatus,
  moveSnake,
  saveKey,
  setDirection,
  checkApple,
  checkGameOver,
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
