import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api1 = "https://k7b204.p.ssafy.io/api1/";
const api2 = "https://k7b204.p.ssafy.io/api2/";

const initialState = {
  detail: {},
  category: {},
  shortStockData: {},
  likeList: [],
  realtime: [],
  limitList: [],
  bidask: {},
  schoolStock: {},
  rejectedList: [],
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

const shortStockGet = createAsyncThunk("stock/short", async (num) => {
  return axios.get(`${api1}stocks/trade/${num}`).then((response) => {
    return response.data;
  });
});

const realtimeGet = createAsyncThunk("stock-list/realtime", async (num) => {
  return axios.get(`${api1}list/top`).then((response) => {
    return response.data.result;
  });
});

const likeListGet = createAsyncThunk("stock-list/likeList", async (data) => {
  return axios.get(`${api1}list/favorite`, data).then((response) => {
    return response.data.stocks;
  });
});

const stockSellPost = createAsyncThunk("stock/sellPost", async (data) => {
  return axios
    .post(`${api2}account/sell`, data.result, data.config)
    .then(() => {
    });
});

const limitListGet = createAsyncThunk("stock/limitListGet", async (data) => {
  return axios
    .get(`${api2}trading/waiting/${data.id}`, data.config)
    .then((response) => {
      return response.data.tradings;
    });
});

const rejectedLimitListGet = createAsyncThunk("stock/rejectedLimitListGet", async (data) => {
  return axios
    .get(`${api2}trading/rejected/${data.id}`, data.config)
    .then((response) => {
      return response.data.tradings
    });
});

const limitOrderPut = createAsyncThunk("stock/limitEditPut", async (data) => {
  return axios
    .put(`${api2}trading/${data.tradeId}`, data.result, data.config)
    .then((response) => {
    });
});

const limitOrderDelete = createAsyncThunk("stock/limitEditPut", async (data) => {
  return axios
    .delete(`${api2}trading/${data.tradeId}`, data.config)
    .then((response) => {
    });
});

const bidaskGet = createAsyncThunk("stock/bidaskGet", async (data) => {
  return axios.get(`${api1}stocks/bidask/${data}`).then((response) => {
    return response.data
  })
})

const schoolBestGet = createAsyncThunk("stock/schoolBestGet", async (data) => {
  return axios.get(`${api1}stocks/school-hot`, data).then((response) => {
    return response.data
  })
})

export const stockSlice = createSlice({
  name: "stockSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(categoryGet.fulfilled, (state, action) => {
      state.category = action.payload;
    });
    builder.addCase(stockDetailGet.fulfilled, (state, action) => {
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
    });
    builder.addCase(realtimeGet.fulfilled, (state, action) => {
      state.realtime = action.payload;
    });
    builder.addCase(likeListGet.fulfilled, (state, action) => {
      state.likeList = action.payload;
    });
    builder.addCase(limitListGet.fulfilled, (state, action) => {
      state.limitList = action.payload;
    });
    builder.addCase(bidaskGet.fulfilled, (state, action) => {
      state.bidask = action.payload;
    });
    builder.addCase(schoolBestGet.fulfilled, (state, action) => {
      state.schoolStock = action.payload;
    });
    builder.addCase(rejectedLimitListGet.fulfilled, (state, action) => {
      state.rejectedList = action.payload;
    });
  },
});

export {
  categoryGet,
  stockDetailGet,
  shortStockGet,
  realtimeGet,
  likeListGet,
  stockSellPost,
  limitListGet,
  limitOrderPut,
  limitOrderDelete,
  bidaskGet,
  schoolBestGet,
  rejectedLimitListGet
};
