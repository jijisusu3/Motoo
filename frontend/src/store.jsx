import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './stores/userSlice';
import  { navSlice } from './stores/navSlice';
const store = configureStore({
  reducer:{
    setUser: userSlice.reducer,
    setNav: navSlice.reducer,
  }
});
export default store;