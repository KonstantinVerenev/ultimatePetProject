import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  email: string | null;
  uid: string | null;
};

const initialState: UserState = {
  email: null,
  uid: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { email, uid } = action.payload;

      state.email = email;
      state.uid = uid;
    },
    removeUser(state) {
      state.email = null;
      state.uid = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
