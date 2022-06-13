import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IState {
    email: string | null
    
}

const initialState = {
    email: null,
   
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state: IState, action: PayloadAction<IState>) {
            state.email = action.payload.email;
        },
        removeUser(state: IState) {
            state.email = null;
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
