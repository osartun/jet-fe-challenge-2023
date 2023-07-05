import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
  },
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
