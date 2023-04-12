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
            state.user = payload.account;
            state.token = payload.access_token;
        }
    }
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
