import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './stores/userSlice';
import  { navSlice } from './stores/navSlice';
import { stockSlice } from './stores/stockSlice';
const store = configureStore({
  reducer:{
    setUser: userSlice.reducer,
    setNav: navSlice.reducer,
    setStock: stockSlice.reducer
  }
});
export default store;