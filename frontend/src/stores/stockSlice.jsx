import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api1 = "https://k7b204.p.ssafy.io/api1/";
const api2 = "https://k7b204.p.ssafy.io/api2/";

const initialState = {
  detail: {},
  category: {},
  shortStockData: {},
};

const categoryGet = createAsyncThunk("stock-detail/categoryGet", async (id) => {
  return axios({
    method: "get",
    url: `${api1}category/${id}`,
  }).then((response) => {
    const tmp = response.data;
    return tmp;
  });
});

const stockDetailGet = createAsyncThunk("stock-detail", async (num) => {
  return axios.get(`${api1}stocks/detail/${num}`).then((response) => {
    return response.data;
  });
});

const shortStockGet = createAsyncThunk("stock-detail/short", async (num) => {
  return axios.get(`${api1}stocks/short/${num}`).then((response) => {
    console.log('여기맞나');
    console.log(response.data)
    console.log('맞지');
    return response.data;
  });
});

export const stockSlice = createSlice({
  name: "stockSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(categoryGet.fulfilled, (state, action) => {
      state.category = action.payload;
    });
    builder.addCase(stockDetailGet.fulfilled, (state, action) => {
      console.log(action.payload);
      state.detail = action.payload;
      const tmp = {
        price: action.payload.price,
        volumn: action.payload.volumn,
        fluctuation_price: action.payload.fluctuation_price,
        fluctuation_rate: action.payload.fluctuation_rate,
        trading_value: action.payload.trading_value,
        daily: action.payload.daily,
        name: action.payload.name,
      };
      state.shortStockData = tmp;
    });
    builder.addCase(shortStockGet.fulfilled, (state, action) => {
      state.shortStockData = action.payload;
      // console.log(action.payload)
    });
  },
});

export { categoryGet, stockDetailGet, shortStockGet };
