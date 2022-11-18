import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api2 = "https://k7b204.p.ssafy.io/api2/";

const initialState = {
  schoolData: {},
  schoolBattleData: {},
};

const schoolGet = createAsyncThunk("school/listGet", async (data) => {
  return axios.get(`${api2}school`, data).then((response) => {
    return response.data;
  });
});


const schoolPageGet = createAsyncThunk("school/pageGet", async (data) => {
  return axios.get(`${api2}schoolpage`, data).then((response) => {
    return response.data;
  });
});

export const schoolSlice = createSlice({
  name: "schoolSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(schoolGet.fulfilled, (state, action) => {
      state.schoolData = action.payload;
    });
    builder.addCase(schoolPageGet.fulfilled, (state, action) => {
      state.schoolBattleData = action.payload;
    });
  },
});

export { schoolGet, schoolPageGet };
