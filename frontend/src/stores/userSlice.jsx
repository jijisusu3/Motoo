import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {
    isLoggin: false,
    token: "",
    quizDay: "2022-11-04",
    likeList: [],
    haveList: [],
    data: {},
  },
};

// const userNameFetch = createAsyncThunk(
//   'username/edit',
//   axios.post("")

// )

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user.isLoggin = true;
      state.user.token = action.payload.token;
      state.user.likeList = action.payload.user.favoriteStockCode;
      localStorage.setItem("login-token", state.user.token);
      state.user.data = action.payload.user;
    },
    setLogout: () => {
      window.localStorage.removeItem("login-token");
      console.log("로그아웃");
      window.location.replace("/login");
    },
  },
});
export default userSlice;
export const { setLogin, setLogout } = userSlice.actions;
