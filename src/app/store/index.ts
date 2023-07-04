import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import roomsReducer from "./roomsSlice";
import turnsReducer from "./turnsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    rooms: roomsReducer,
    turns: turnsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
