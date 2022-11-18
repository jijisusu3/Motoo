import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api2 = "https://k7b204.p.ssafy.io/api2/";

const initialState = {
  accountsList: {},
  accountDetail: {},
};

const accountsListGet = createAsyncThunk("wallet/accountsGet", async (data) => {
  return axios.get(`${api2}account`, data).then((response) => {
    return response.data;
  });
});

const accountDetailGet = createAsyncThunk(
  "wallet/accountDetailGet",
  async (data) => {
    return axios
      .get(`${api2}detail?accountId=${data.id}`, data.config)
      .then((response) => {
        return response.data;
      });
  }
);

const accountNamePut = createAsyncThunk(
  "account/accountNamePut",
  async (data) => {
    return axios
      .put(`${api2}account`, data.result, data.config)
      .then((response) => {
        return data.result.name
      });
  }
);

const accountDelete = createAsyncThunk(
  "account/accountDelete",
  async (data) => {
    return axios
      .delete(`${api2}account/${data.id}`, data.config)
      .then((response) => {
        return response.data;
      });
  }
);
const accountCreate = createAsyncThunk(
  "account/accountNamePost",
  async (data) => {
    return axios
      .post(`${api2}account`, data.result, data.config)
      .then((response) => {
        return response.data;
      });
  }
);

export const accountsSlice = createSlice({
  name: "accountsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(accountsListGet.fulfilled, (state, action) => {
      state.accountsList = action.payload;
    });
    builder.addCase(accountDetailGet.fulfilled, (state, action) => {
      state.accountDetail = action.payload;
    });
    builder.addCase(accountNamePut.fulfilled, (state, action) => {
      state.accountDetail.accountName = action.payload;
    });
  },
});
export {
  accountsListGet,
  accountDetailGet,
  accountNamePut,
  accountDelete,
  accountCreate,
};
