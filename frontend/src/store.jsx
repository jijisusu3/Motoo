import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./stores/userSlice";
import { navSlice } from "./stores/navSlice";
import { stockSlice } from "./stores/stockSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  setUser: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: {
    setNav: navSlice.reducer,
    setStock: stockSlice.reducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
