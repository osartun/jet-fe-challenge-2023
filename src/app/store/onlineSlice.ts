import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const onlineSlice = createSlice({
  name: "online",
  initialState: {
    isConnected: false,
  },
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setIsConnected } = onlineSlice.actions;

export default onlineSlice.reducer;
