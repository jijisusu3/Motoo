import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api2 = "https://k7b204.p.ssafy.io/api2/";

const initialState = {
  accountsList : {}
};

const accountsListGet = createAsyncThunk("wallet/accountsGet", async (data) => {
  return axios.get(`${api2}account`, data
  ).then((response) => {
    console.log(response.data)
  });
});

export const accountsSlice = createSlice({
  name: "accountsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(accountsListGet.fulfilled, (state, action) => {
      state.category = action.payload;
    });
  },
});
export { accountsListGet };