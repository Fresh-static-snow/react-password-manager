import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWebsitePassword } from '../../models/websitePassword';

const initialState: IWebsitePassword = {
  password: '',
  website: '',
  user: '',
};

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setWebsitePassword(
      state: IWebsitePassword,
      action: PayloadAction<IWebsitePassword>
    ) {
      state.password = action.payload.password;
      state.website = action.payload.website;
      state.user = action.payload.user;
    },
    resetWebsitePassword(state: IWebsitePassword) {
      state.password = '';
      state.website = '';
      state.user = '';
    },
  },
});
