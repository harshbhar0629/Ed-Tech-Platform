/** @format */

import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./components/core/Auth/OpenRoute"
import ForgotPassword from "./pages/ForgotPassword";

function App() {

	return (
		<div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={<Home />}></Route>
				<Route
					path="/login"
					element={
						<OpenRoute>
							<Login />
						</OpenRoute>
					}></Route>
				<Route
					path="/signup"
					element={
						<OpenRoute>
							<Signup />
						</OpenRoute>
					}></Route>
				<Route
					path="forgot-password"
					element={
						<OpenRoute>
							<ForgotPassword />
						</OpenRoute>
					}></Route>
			</Routes>
		</div>
	);
}
export default App;
