import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  value: Room[];
}

const initialState: State = {
  value: [],
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
