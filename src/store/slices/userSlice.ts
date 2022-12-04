import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  auth: boolean;
  email: string;
}

const initialState: IUserState = {
  email: '',
  auth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: IUserState, action: PayloadAction<IUserState>) {
      state.email = action.payload.email;
      state.auth = action.payload.auth;
    },
    removeUser(state: IUserState) {
      state.email = '';
      state.auth = false;
    },
  },
});
