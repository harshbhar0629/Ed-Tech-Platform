/** @format */

import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./components/core/Auth/LoginForm";
import Signup from "./components/core/Auth/SignupForm";

function App() {
	return (
		<div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={<Home />}></Route>
				<Route
					path="login"
					element={<Login />}></Route>
				<Route
					path="signup"
					element={<Signup />}></Route>
			</Routes>
		</div>
	);
}
export default App;
