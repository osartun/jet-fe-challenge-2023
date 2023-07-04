import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    id: "",
  },
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { setUsername, setUserId } = userSlice.actions;

export default userSlice.reducer;
