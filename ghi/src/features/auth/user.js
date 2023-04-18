import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {},
    userToken: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.userInfo = payload.account;
            state.userToken = payload.access_token;
        },
    },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
