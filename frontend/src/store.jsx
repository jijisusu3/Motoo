import {configureStore} from '@reduxjs/toolkit';
import userSlice from './stores/userSlice';
const store = configureStore({
  reducer:{
    setUser: userSlice.reducer
  }
});
export default store;