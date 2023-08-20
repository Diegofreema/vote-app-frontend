import { createSlice } from '@reduxjs/toolkit';

const isAdmin = localStorage.getItem('isAdmin');
const isLoggedIn = localStorage.getItem('isLoggedIn');
const initialState = {
  isLoggedIn: isLoggedIn ? isLoggedIn : false,
  username: '',
  user: {
    username: '',
  },
  isAdmin: isAdmin ? isAdmin : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      localStorage.setItem('isLoggedIn', action.payload);

      state.isLoggedIn = action.payload;
    },
    SET_USERNAME(state, action) {
      localStorage.setItem('username', JSON.stringify(action.payload));
      state.username = action.payload;
    },
    SAVE_USER(state, action) {
      const profile = action.payload;
      state.user.username = profile.username;
    },
    SET_ISADMIN(state, action) {
      localStorage.setItem('isAdmin', action.payload);
      state.isAdmin = action.payload;
    },
  },
});

export const { SET_LOGIN, SET_USERNAME, SAVE_USER, SET_ISADMIN } =
  authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserName = (state) => state.auth.username;
export const selectUser = (state) => state.auth.user;
export const selectIsADmin = (state) => state.auth.isAdmin;
export default authSlice.reducer;
