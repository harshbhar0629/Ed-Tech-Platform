/** @format */

import React from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links.js";
import { useLocation } from "react-router-dom";
import { apiConnector } from "../../services/apiConnector.js";
import { categories } from "../../services/apis.js";

const Navbar = () => {
	const location = useLocation();
	const matchRoute = (route) => {
		matchPath(location.pathname, { path: route });
	};
	const [subLink, setSubLinks] = useState([]);
	const [loading, setLoading] = useState(false);
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const { totalItems } = useSelector((state) => state.cart);

	useEffect(() => {
		async () => {
			try {
				const res = await apiConnector("GET", categories.CATEGORIES_API);
				console.log(res);
				setSubLinks(res.data.data);
			} catch (error) {
				console.log("Could not fetch Categories.", error.message);
			}
			setLoading(false);
		}
	}, []);

	return (
		<div
			className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700  transition-all duration-200 m-[2px]`}>
			<div className="flex w-[85%] max-w-maxContent items-center justify-between">
				{/* image */}
				<Link to="/">
					<img
						src={logo}
						alt="Logo"
						width={160}
						height={32}
						loading="lazy"
					/>
				</Link>

				{/* nav-Links */}
				<nav className="hidden md:block">
					<ul className="flex gap-x-6 text-richblack-25">
						{NavbarLinks.map((link, index) => {
							return (
								<li key={index}>
									{link.title === "Catalog" ? (
										<li>
											<div
												className={`group relative flex cursor-pointer items-center gap-1 ${
													matchRoute("/catalog/:catalogName")
														? "text-yellow-25"
														: "text-richblack-25"
												}`}>
												<p>{link.title}</p>
												<BsChevronDown />

												<div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
													<div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
													{loading ? (
														<p className="text-center">Loading...</p>
													) : subLinks?.length ? (
														<>
															{subLinks
																?.filter(
																	(subLink) => subLink?.courses?.length > 0
																)
																?.map((subLink, i) => (
																	<Link
																		to={`/catalog/${subLink.name
																			.split(" ")
																			.join("-")
																			.toLowerCase()}`}
																		className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
																		key={i}>
																		<p>{subLink.name}</p>
																	</Link>
																))}
														</>
													) : (
														<p className="text-center">No Courses Found</p>
													)}
												</div>
											</div>
										</li>
									) : (
										<Link to={link?.path}>
											<p
												className={`${
													matchRoute(link?.path)
														? "text-yellow-25"
														: "text-richblack-25"
												}`}>
												{link.title}
											</p>
										</Link>
									)}
								</li>
							);
						})}
					</ul>
				</nav>

				{/* login signup and dashboard! */}
				<div className="hidden md:flex items-center gap-x-4 ">
					{user && user?.accountType !== "Instructor" && (
						<Link
							to="/dashboard/cart"
							className="relative">
							<AiOutlineShoppingCart className="text-2xl text-richblack-100" />
							{totalItems > 0 && (
								<span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
									{totalItems}
								</span>
							)}
						</Link>
					)}

					{/* login button logic */}
					{token === null && (
						<Link to="/login">
							<button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
								Log in
							</button>
						</Link>
					)}

					{/* signup button logic */}
					{token === null && (
						<Link to="/signup">
							<button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
								Sign up
							</button>
						</Link>
					)}

					{token !== null && <ProfileDropdown />}
				</div>

				<button className="mr-4 md:hidden">
					<AiOutlineMenu
						fontSize={24}
						fill="#AFB2BF"
					/>
				</button>
			</div>
		</div>
	);
};

export default Navbar;
