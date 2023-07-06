import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface RoomsState {
  list: Room[];
  current: Room | null;
}

const initialState: RoomsState = {
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
