import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  gameState: GameState;
  list: Turn[];
  isOver: boolean;
}

const initialState: State = {
  gameState: "wait",
  list: [],
  isOver: false,
};

export const turnsSlice = createSlice({
  name: "turns",
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<GameState>) => {
      state.gameState = action.payload;
    },
    addTurn: (state, action: PayloadAction<Turn>) => {
      if (action.payload.isFirst) {
        state.gameState = "play";
      }
      state.list = [...state.list, action.payload];
    },
    setGameOver: (state, action: PayloadAction<boolean>) => {
      state.isOver = action.payload;
    },
  },
});

export const { setGameState, addTurn, setGameOver } = turnsSlice.actions;

export default turnsSlice.reducer;
