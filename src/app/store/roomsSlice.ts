import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  list: Room[];
  current: Room | null;
}

const initialState: State = {
  list: [],
  current: null,
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.list = action.payload;
    },
    setCurrentRoom: (state, action: PayloadAction<Room>) => {
      state.current = action.payload;
    },
  },
});

export const { setRooms, setCurrentRoom } = roomsSlice.actions;

export default roomsSlice.reducer;
