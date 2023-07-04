import { configureStore } from "@reduxjs/toolkit";

import usernameReducer from "./usernameSlice";
import roomsReducer from "./roomsSlice";

const store = configureStore({
  reducer: {
    username: usernameReducer,
    rooms: roomsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
