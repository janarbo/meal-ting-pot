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
<<<<<<< HEAD
            state.user = payload.account;
            state.token = payload.access_token;
        }
    }
=======
            state.userInfo = payload.account;
            state.userToken = payload.access_token;
        },
        logoutUser: (state) => {
            state.userInfo = {};
            state.userToken = null;
        },
    },
>>>>>>> main
});

export default userSlice.reducer;
export const { setUser, logoutUser } = userSlice.actions;
