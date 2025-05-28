import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  useInfo: any;
}

const initialState: AuthState = {
  useInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.useInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearUserInfo: (state) => {
      state.useInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUserInfo, clearUserInfo } = authSlice.actions;
export default authSlice.reducer;
