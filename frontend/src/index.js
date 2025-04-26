/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const store = configureStore({
	reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
				<Analytics />
				<Toaster />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
