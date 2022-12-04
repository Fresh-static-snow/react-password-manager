import { configureStore } from "@reduxjs/toolkit";
import { passwordSlice } from "./slices/passwordsSlice";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    password: passwordSlice.reducer,
  },
});
export const allActions = { ...userSlice.actions, ...passwordSlice.actions };
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
