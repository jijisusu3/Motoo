import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  detail: {},
  category: {},
  shortStockData: {},
};

const categoryGet = createAsyncThunk("stock-detail/categoryGet", async () => {
  return axios({
    method: "get",
    url: "api1/category/1",
  }).then((response) => {
    console.log(response.data);
  });
});

export const stockDetailSlice = createSlice({
  name: "stockDetailSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(categoryGet.fullfield, (state, action) => {
      state.category = action.payload;
    });
  },
});

export { categoryGet };
