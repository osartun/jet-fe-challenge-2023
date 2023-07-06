import { configureStore } from "@reduxjs/toolkit";

import onlineReducer from "./onlineSlice";
import userReducer from "./userSlice";
import roomsReducer from "./roomsSlice";
import gamePlayReducer from "./gamePlaySlice";

const store = configureStore({
  reducer: {
    online: onlineReducer,
    user: userReducer,
    rooms: roomsReducer,
    gamePlay: gamePlayReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
