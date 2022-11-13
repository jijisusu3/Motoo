import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api1 = "https://k7b204.p.ssafy.io/api1/";
const api2 = "https://k7b204.p.ssafy.io/api2/";

const initialState = {
  schoolData: {},
};

const schoolGet = createAsyncThunk("school/listGet", async (data) => {
  return axios.get(`${api2}school`, data).then((response) => {
    return response.data
  })
});
const schoolPut = createAsyncThunk("school/schoolPut", async (data) => {
  return axios.put(`${api2}school/`, data.result, data.config).then((response) => {
    return response.data
  })
});

export const schoolSlice = createSlice({
  name: "schoolSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(schoolGet.fulfilled, (state, action) => {
      state.schoolData = action.payload;
    });
    builder.addCase(schoolPut.fulfilled, (state, action) => {
      console.log("여기는 학교등록 thunk~!!")
    });
  },
});

export { schoolGet, schoolPut };
