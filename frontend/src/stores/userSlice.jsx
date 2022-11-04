import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {
    isLoggin: false, 
    token: "",
    likeList: [],
    haveList: [],
    data: {},
  },
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user.isLoggin = true
      state.user.token = action.payload.token
      state.user.likeList = action.payload.user.favoriteStockCode
      localStorage.setItem('login-token',state.user.token)
      state.user.data = action.payload.user
    },
    setLogout: () => {
      window.localStorage.removeItem('login-token')
      console.log('로그아웃')
      window.location.replace("/login")
    },
  }
})
export default userSlice;
export const {setLogin, setLogout} = userSlice.actions;

// export const asyncUpFetch = 