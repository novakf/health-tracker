import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { UserType } from '../../types';

const initialState: UserType = {
  id: -1,
  name: '',
  username: '',
  first_name: '',
  weight: 0,
  height: 0,
  age: 0,
  sex: 'M',
  physical_activity: 'LA',
  password: '',
};

const dataSlice = createSlice({
  name: 'user',
  initialState: { Data: initialState },
  reducers: {
    setData(state, { payload }) {
      state.Data = payload;
    },
  },
});

export const userData = () =>
  useSelector((state: RootState) => state.userInfo.Data);
export const isLoggedIn = () =>
  useSelector((state: RootState) => state.userInfo.Data?.id !== -1);

export const { setData: setUserDataAction } = dataSlice.actions;

export default dataSlice.reducer;
