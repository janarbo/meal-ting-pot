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
        logoutUser: (state) => {
            state.userInfo = {};
            state.userToken = null;
        },
    },
});

export default userSlice.reducer;
export const { setUser, logoutUser } = userSlice.actions;
