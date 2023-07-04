import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const usernameSlice = createSlice({
  name: "username",
  initialState: {
    value: "",
  },
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setUsername } = usernameSlice.actions;

export default usernameSlice.reducer;
