import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api2 = "https://k7b204.p.ssafy.io/api2/";

const initialState = {
  accountsList : {},
  accountDetail: {}
};

const accountsListGet = createAsyncThunk("wallet/accountsGet", async (data) => {
  return axios.get(`${api2}account`, data
  ).then((response) => {
    return response.data
  });
});

const accountDetailGet = createAsyncThunk("wallet/accountDetailGet", async (data) => {
  return axios.get(`${api2}detail?accountId=${data.id}`, data.config
  ).then((response) => {
    return response.data
  });
});

export const accountsSlice = createSlice({
  name: "accountsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(accountsListGet.fulfilled, (state, action) => {
      state.accountsList = action.payload;
    });
    builder.addCase(accountDetailGet.fulfilled, (state, action) => {
      console.log(action.payload)
      state.accountDetail = action.payload;
    });
  },
});
export { accountsListGet, accountDetailGet };