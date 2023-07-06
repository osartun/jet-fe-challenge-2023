import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  gameState: GameState;
  list: Turn[];
  gameOver: GameOver | null;
}

const initialState: State = {
  gameState: "wait",
  list: [],
  gameOver: null,
};

export const gamePlaySlice = createSlice({
  name: "gamePlay",
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<GameState>) => {
      state.gameState = action.payload;
    },
    addTurn: (state, action: PayloadAction<Turn>) => {
      state.list = [...state.list, action.payload];
    },
    setGameOver: (state, action: PayloadAction<GameOver>) => {
      state.gameOver = action.payload;
    },
    reset: (state) => {
      state.gameOver = null;
      state.gameState = "wait";
      state.list = [];
    },
  },
});

export const { setGameState, addTurn, setGameOver, reset } =
  gamePlaySlice.actions;

export default gamePlaySlice.reducer;
