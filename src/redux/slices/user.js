import { createSlice } from '@reduxjs/toolkit';
import axios from '../../helpers/axios';
//import jwt from "jsonwebtoken";
import { JWT_KEY } from '../../constants/defaultValues';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: false,
    user: null,
    userToken:null
  },
  reducers: {
    // START LOADING
    startLoading: (state) => {
      state.loading = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.loading = false;
      state.userToken = null;
      state.error = action.payload;
    },
    // LOGIN USER
    loginUserSuccess(state, action) {
      state.loading = false;
      state.error = false;
      state.user = action.payload.user;
      state.userToken = action.payload.token;
    },
  },
})

export const { startLoading, hasError, loginUserSuccess } = userSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.post('/api/user/login',credentials);
    /*const token = jwt.sign({ user: response.data.user }, JWT_KEY,{
      expiresIn:  credentials.remember ? '30 days' : '1 days'       
    });*/
    const token=JWT_KEY;
    const payload = {user: response.data.user, token};
    dispatch(loginUserSuccess(payload));
    
  } catch (error) {
    console.log(error)
    dispatch(hasError(error));
  }
}

export default userSlice.reducer
