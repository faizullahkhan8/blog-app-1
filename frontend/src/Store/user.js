import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    username: "",
    email: "",
    isAuth: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            const { _id, username, email, isAuth } = action.payload;

            state._id = _id;
            state.username = username;
            state.email = email;
            state.isAuth = isAuth;
        },
        resetUser(state) {
            state._id = "";
            state.username = "";
            state.email = "";
            state.isAuth = false;
        },
    },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
