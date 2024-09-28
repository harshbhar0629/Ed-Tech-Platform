/** @format */

import "./App.css";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact.js";
import Dashboard from "./pages/Dashboard.js";
import PrivateRoute from "./components/core/Auth/PrivateRoute.jsx";
import Error from "./pages/Error.jsx";
import Settings from "./components/core/Dashboard/Settings";
import MyCourses from "./components/core/Dashboard/MyCourses.jsx";
import MyProfile from "./components/core/Dashboard/MyProfile.js";
import EditCourse from "./components/core/Dashboard/EditCourse.jsx";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses.jsx";
import Cart from "./components/core/Dashboard/Cart.jsx";
import AddCourse from "./components/core/Dashboard/AddCourse.jsx";
import Instructor from "./components/core/Dashboard/Instructor.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ACCOUNT_TYPE } from "./utils/constant.js";

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.profile);

	useEffect(() => {
		// if (localStorage.getItem("token")) {
		// 	const token = JSON.parse(localStorage.getItem("token"));
		// 	dispatch(getUserDetails(token, navigate));
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
					path="/forgot-password"
					element={
						<OpenRoute>
							<ForgotPassword />
						</OpenRoute>
					}></Route>
				<Route
					path="/update-password/:id"
					element={
						<OpenRoute>
							<UpdatePassword />
						</OpenRoute>
					}></Route>
				<Route
					path="/verify-email"
					element={
						<OpenRoute>
							<VerifyEmail />
						</OpenRoute>
					}></Route>
				<Route
					path="/about"
					element={<About />}></Route>
				<Route
					path="/contact"
					element={<Contact />}></Route>

				{/* Private Route - for Only Logged in User */}
				<Route
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}>
					{/* Route for all users */}
					<Route
						path="dashboard/my-profile"
						element={<MyProfile />}
					/>
					<Route
						path="dashboard/Settings"
						element={<Settings />}
					/>

					{/* Route only for Instructors */}
					{user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
						<>
							<Route
								path="dashboard/instructor"
								element={<Instructor />}
							/>
							<Route
								path="dashboard/my-courses"
								element={<MyCourses />}
							/>
							<Route
								path="dashboard/add-course"
								element={<AddCourse />}
							/>
							<Route
								path="dashboard/edit-course/:courseId"
								element={<EditCourse />}
							/>
						</>
					)}

					{/* Route only for Students */}
					{user?.accountType === ACCOUNT_TYPE.STUDENT && (
						<>
							<Route
								path="dashboard/enrolled-courses"
								element={<EnrolledCourses />}
							/>
							<Route
								path="/dashboard/cart"
								element={<Cart />}
							/>
						</>
					)}
					<Route
						path="dashboard/settings"
						element={<Settings />}
					/>
				</Route>
				<Route
					path="*"
					element={<Error />}></Route>
			</Routes>
		</div>
	);
}
export default App;
