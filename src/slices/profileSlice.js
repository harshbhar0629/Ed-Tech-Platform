/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: localStorage.getItem("token")
		? JSON.parse(localStorage.getItem("token"))
		: undefined,
};

const profileSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		setToken(state, value) {
			state.token = value.payload;
		},
	},
});

export const { setToken } = profileSlice.actions;
export default profileSlice.reducer;
