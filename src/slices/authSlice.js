/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null
};

const authSlice = createSlice({
	name: "profile",
	initialState: initialState,
	reducers: {
		setUser(state, value) {
			state.user = value.payload;
		},
	},
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
